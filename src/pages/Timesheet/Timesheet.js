import React, { Component } from "react";
import "./Timesheet.css";
import TimeRendered from "../../components/Table";
import TimeEntry from "../../components/TimeEntry";




class Timesheet extends Component {

    state = {
        timesheet: [],
        tickets: [],
    };

    // when the components mounts, load all timesheet and ticket info and save them to this.state.timesheet and this.state.tickets
    componentDidMount() {
        this.getTimesheet();
        this.getTickets();
    }

    // loads all timesheet info and saves them to this.state.timesheet
    getTimesheet = _ => {
        fetch('http://localhost:4000/timesheet')
            .then(response => response.json())
            .then(({ data }) => {
                console.log(data)
            })
            .then(response => this.setState({ timesheet: response.data }))
            .catch(err => console.log(err))
    }

    // loads all tickets and saves them to this.state.tickets
    getTickets = _ => {
        fetch('http://localhost:4000/tickets')
            .then(response => response.json())
            .then(({ data }) => {
                console.log('The ticket information from Timesheet.js: ', data)
            })
            .then(response => this.setState({ tickets: response.data }))
            .catch(err => console.log('There is an error setting the state of tickets', err))
    }

    render() {
        // const { timesheet, tickets } = this.state;

        return (
            <div className="Timesheet">
                <div className="Navbar">
                    <button className="ChangeWeek">Change Week</button>
                    <button className="Logout">Logout</button>
                </div>
                <div className="Header">
                    <h1 className="Timesheet-title">Week of x/x/2018</h1>
                </div>
                <TimeRendered 
                timesheet={this.state.timesheet}
                tickets={this.state.tickets}
                />
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