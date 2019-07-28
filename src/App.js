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
        this.state = {
            page: "layout",
            content: "elements"
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
