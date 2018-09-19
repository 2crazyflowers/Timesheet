import React, { Component } from "react";
import "./Timesheet.css";



class Timesheet extends Component {

    state = {
        user: "",
        pass: ""
    };

    render() {
        return (
            <div className="Timesheet">
                <div className="Navbar">
                    <button className="ChangeWeek">Change Week</button>
                    <button className="Logout">Logout</button>
                </div>
                <div className="Header">
                    <h1 className="Timesheet-title">Timesheet</h1>
                </div>
                <div>
                    <p>Table here.</p>
                    <p>This is a new area for the timesheet information.</p>
                </div>
            </div>
        );
    }
}

export default Timesheet;