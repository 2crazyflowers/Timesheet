import React, { Component } from "react";
import "./Home.css";


class Home extends Component {

    state = {
        user: "",
        pass: ""
    };

    render() {
        return (
            <div className="Home">
                <div>
                    <h1 className="Home-title">RS/Timesheet</h1>
                </div>
                <div>
                    <form>
                        <label>
                        User
                        <input type="text" name="user"  className="Login"/>
                        </label>
                        <br></br>
                        <label>
                        Pass
                        <input type="text" name="pass"  className="Login"/>
                        </label>
                        <br></br>
                        <input type="submit" value="Login" className="Button"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default Home;