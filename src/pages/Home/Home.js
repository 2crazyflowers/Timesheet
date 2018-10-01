import React, { Component } from "react";
import Login from "../../components/Login";
import "./Home.css";

class Home extends Component {

    state = {
        username: "",
        password: "",
        credentials: [],
        error: ""
    };


    render() {

        return (
            <div className="Home">
                <div>
                    <h1 className="Home-title">RS/Timesheet</h1>
                </div>
                <div>
                    <Login></Login>
                </div>
            </div>
        );
    }
}

export default Home;