let App = new Struct({
    el: '#app',
    tmpl: 'views/main',
    events: function() {
        Sidebar.render();
        Content.render();
    }
});

let Sidebar = new Struct({
    el: '#mainwrap_sidebar',
    tmpl: `
        <div id="userinfo"></div>
        <div id="mainmenu"></div>
    `,
    events: function() {
        Userinfo.data = {
            username: localStorage.useremail,
            role: localStorage.userrole
        };
        Userinfo.render();
        Mainmenu.render();
    }
});

let Content = new Struct({
    el: '#mainwrap_content',
    data: {
        page: 'elements',
    },
    tmpl: `
        <div id="sysmsgs"></div>
        <div id="content"></div>
    `,
    events: function() {
        //Sysmsgs.render();
        //Mainsearch.render();
        if (this.data.page == 'console') {
            Mainconsole.render();
        } else if (this.data.page == 'users') {
            Users.rerender();
        } else if (this.data.page == 'elements') {
            Elements.render();
        }
    }
});


let Userinfo = new Struct({
    el: '#userinfo',
    tmpl: 'views/userinfo',
});

let Mainmenu = new Struct({
    el: '#mainmenu',
    tmpl: 'views/main_menu',
    events: function() {
        new Navs(this.el.find('.navs'));
        $("#console_menu_btn").bind('click', function() {
            Content.data.page = 'console';
            Content.rerender();
        });
        $("#users_menu_btn").bind('click', function() {
            Content.data.page = 'users';
            Content.rerender();
        });
        $("#contents_menu_btn").bind('click', function() {
            Content.data.page = 'elements';
            Content.rerender();
        });
    }
});

//let Mainsearch = new Struct({
//el: '#search',
//tmpl: 'views/main_search',
//});

let Mainconsole = new Struct({
    el: '#content',
    tmpl: 'views/console',
    events: function() {
        ConsoleStats.render();
    }
});

let Users = new List({
    el: '#content',
    data: '/api/users',
    token: localStorage.usertoken,
    tmpl: 'views/users/list_one',
    searchform: 'views/users/search_form',
    events: function() {
        console.log(this.data);
    }
});

let Elements = new List({
    el: '#content',
    data: '/api/contentelements',
    tmpl: `
        <h1>Elements</h1>
    `,
    searchform: 'views/elements/search_form',
    events: function() {
        let self = this;
        $('#add_element_btn').bind('click', function() {
            self.el.html('<div class="addformwrap">test</div>');

            new Struct({
                el: self.el.find('.addformwrap'),
                tmpl: 'views/elements/form',
                events: function() {
                    new Form({
                        el: self.el.find('form'),
                        event: function() {
                            console.log(this.data);
                        }
                    });
                }
            }).render();
        });
    }
});

let Sysmsgs = new Struct({
    el: '#sysmsgs',
    tmpl: 'views/sysmsgs',
});

let ConsoleStats = new Struct({
    el: '#console_stats',
    tmpl: 'views/console_stats',
    data: [{
            name: "test1",
        },
        {
            name: "test1",
        },
        {
            name: "test1",
        },
        {
            name: "test1",
        },
        {
            name: "test1",
        },
        {
            name: "test1",
        },
    ]
});

let loginformstruct = new Struct({
    el: '#app',
    tmpl: 'views/login_form',
    events: function() {
        let loginform = new Form({
            el: $('#loginform'),
            event: function() {
                localStorage.clear();
                localStorage.setItem('userid', loginform.data.ID);
                localStorage.setItem('useremail', loginform.data.email);
                localStorage.setItem('userrole', loginform.data.role);
                localStorage.setItem('usertoken', loginform.data.token);

                App.render();
            }
        });
    }
});

if (true) {
    App.render();
}
