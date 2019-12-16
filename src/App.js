import React, {
    Component
} from "react";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import SignRe from "./SignRe.js";
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
                role: sessionStorage.userrole
            };
            page = "layout";
        } else if (localStorage.usertoken != undefined) {
            userdata = {
                id: localStorage.userid,
                token: localStorage.usertoken,
                email: localStorage.useremail,
                role: localStorage.userrole
            };
            page = "layout";
        }
        this.state = {
            page: page,
            content: "users",
            userdata: userdata,
            rememberuser: false
        };
    }

    render() {
        return (
            <div>
                {
                this.state.page == "signup" && <SignUp el={this} />
                || this.state.page == "signin" && <SignIn el={this} />
                || this.state.page == "signre" && <SignRe el={this} />
                || this.state.page == "layout" && <Layout el={this} />
                }
            </div>
        );
    }
}

export default App;
