#!/usr/bin/env bash

# Use single quotes instead of double quotes to make it work with special-character passwords
NAME='gorest'
PASSWORD='rootpass'

# update / upgrade
sudo apt-get update
sudo apt-get -y upgrade

sudo apt-get install -y nginx
sudo apt-get install -y curl
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password password $PASSWORD"
sudo debconf-set-selections <<< "mysql-server mysql-server/root_password_again password $PASSWORD"
sudo apt-get install -y  mysql-server

echo "    server {" >> /etc/nginx/sites-available/default
echo "        listen 80;" >> /etc/nginx/sites-available/default
echo "        listen [::]:80;" >> /etc/nginx/sites-available/default
echo "        server_name ${NAME}.ga;" >> /etc/nginx/sites-available/default
echo "        root /var/www/html/dist;" >> /etc/nginx/sites-available/default
echo "        index index.html;" >> /etc/nginx/sites-available/default
echo "        sendfile  off;" >> /etc/nginx/sites-available/default
echo "        location / {" >> /etc/nginx/sites-available/default
echo "            try_files \$uri \$uri/ =404;" >> /etc/nginx/sites-available/default
echo "            access_log        off;" >> /etc/nginx/sites-available/default
echo "            expires           0;" >> /etc/nginx/sites-available/default
echo "            add_header        Cache-Control private;" >> /etc/nginx/sites-available/default
echo "        }" >> /etc/nginx/sites-available/default
echo "        location /api/ {" >> /etc/nginx/sites-available/default
echo "            proxy_redirect          off;" >> /etc/nginx/sites-available/default
echo "            proxy_pass_header       Server;" >> /etc/nginx/sites-available/default
echo "            proxy_set_header        X-Real-IP $remote_addr;" >> /etc/nginx/sites-available/default
echo "            proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;" >> /etc/nginx/sites-available/default
echo "            proxy_set_header        X-Scheme $scheme;" >> /etc/nginx/sites-available/default
echo "            proxy_set_header        Host $http_host;" >> /etc/nginx/sites-available/default
echo "            proxy_set_header        X-NginX-Proxy true;" >> /etc/nginx/sites-available/default
echo "            proxy_connect_timeout   5;" >> /etc/nginx/sites-available/default
echo "            proxy_read_timeout      240;" >> /etc/nginx/sites-available/default
echo "            proxy_intercept_errors  on;" >> /etc/nginx/sites-available/default
echo "            proxy_pass              http://127.0.0.1:1888;" >> /etc/nginx/sites-available/default
echo "        }" >> /etc/nginx/sites-available/default
echo "    }" >> /etc/nginx/sites-available/default

sudo /etc/init.d/nginx restart

echo "127.0.0.1    ${NAME}.ga" >> /etc/hosts
