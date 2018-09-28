import React, { Component } from "react";
import "./Timesheet.css";
import TimeRendered from "../../components/Table";
import TimeEntry from "../../components/TimeEntry";




class Timesheet extends Component {

    state = {
        timesheet: []
    };

    componentDidMount() {
        this.getTimesheet();
    }

    getTimesheet = _ => {
        fetch('http://localhost:4000/timesheet')
            .then(response => response.json())
            // .then(({ data }) => {
            //     console.log(data)
            // })
            .then(response => this.setState({ timesheet: response.data }))
            .catch(err => console.log(err))

    }

    render() {
        //const { timesheet } = this.state;
        return (
            <div className="Timesheet">
                <div className="Navbar">
                    <button className="ChangeWeek">Change Week</button>
                    <button className="Logout">Logout</button>
                </div>
                <div className="Header">
                    <h1 className="Timesheet-title">Week of x/x/2018</h1>
                </div>
                <TimeRendered />
                <div>
                    <br></br>
                    <h3>Add Entry</h3>
                </div>
                <TimeEntry />>
            </div>
        );
    }
}

export default Timesheet;