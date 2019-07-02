#Makefile

NAME=/var/www/html/

work:

	vagrant up
	tmux split-window -l 10 'vagrant ssh -- -t "cd ${NAME}/tests/; /bin/bash"'
	tmux split-window -h 'vagrant ssh -- -t "cd ${NAME}; npm start; /bin/bash"'
	###tmux split-window 'vagrant ssh -- -t "cd ${NAME}; xvfb-run selenium-standalone start"'
	tmux select-pane -t 1
	tmux split-window -h 'vagrant ssh -- -t "cd ${NAME}; /bin/bash"'
	tmux split-window
	tmux select-pane -t 0
	nvim

backwork:

	vagrant up
	tmux split-window -l 10 'vagrant ssh -- -t "cd ${NAME}; /bin/bash"'
	tmux split-window -h
	tmux split-window 'vagrant ssh -- -t "cd ${NAME}; /bin/bash"'
	tmux select-pane -t 0
	nvim

