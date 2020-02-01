import React, {
    Component
} from "react";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import SignRe from "./SignRe.js";
import ChangePass from "./ChangePass.js";
import EmailConfirm from "./EmailConfirm.js";
import Layout from "./Layout.js";

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        var userdata = {};
        var page = "signin";
        //TODO add tocken check
        if (sessionStorage.usertoken != undefined) {
            userdata = {
                id: sessionStorage.userid,
                token: sessionStorage.usertoken,
                email: sessionStorage.useremail,
                role: sessionStorage.userrole,
                avatar: sessionStorage.useravatar
            };
            page = "layout";
        } else if (localStorage.usertoken != undefined) {
            userdata = {
                id: localStorage.userid,
                token: localStorage.usertoken,
                email: localStorage.useremail,
                role: localStorage.userrole,
                avatar: sessionStorage.useravatar
            };
            page = "layout";
        }

        var url_string = window.location.href;
        var url = new URL(url_string);
        var repasstoken = url.searchParams.get("repasstoken");
        var token = url.searchParams.get("token");
        if (repasstoken != null) {
            page = "changepass";
        }

        if (token != null) {
            page = "emailconfirm";
        }

        this.state = {
            page: page,
            content: "elements",
            userdata: userdata,
            rememberuser: false,
            sysmsg: null
        };
    }

    render() {
        return (
            <div>
                {
                this.state.page == "signup" && <SignUp el={this} />
                || this.state.page == "signin" && <SignIn el={this} />
                || this.state.page == "signre" && <SignRe el={this} />
                || this.state.page == "changepass" && <ChangePass el={this} />
                || this.state.page == "emailconfirm" && <EmailConfirm el={this} />
                || this.state.page == "layout" && <Layout el={this} />
                }
            </div>
        );
    }
}

export default App;
