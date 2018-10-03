import React, { Component } from "react";
import "./Timesheet.css";
import TimeRendered from "./TimeRendered";
import TimeEntry from "./TimeEntry";




class Timesheet extends Component {

    state = {
        timesheet: [],
        tickets: [],
        date: '',
        hour: '',
        ticket: '',
        comment: '',
        billable: '',
        error: '',
    };

    //all of the functions are rendered on this main page

    // when the components mounts, load all timesheet and ticket info and save them to this.state.timesheet and this.state.tickets
    componentDidMount() {
        this.getTimesheet();
        this.getTickets();
    }

    // loads all timesheet info and saves them to this.state.timesheet
    getTimesheet = () => {
        fetch('http://localhost:4000/timesheet')
            .then(response => response.json())
            .then(({ data }) => {
                console.log(data)
            })
            .then(response => this.setState({ timesheet: response.data }))
            .catch(err => console.log(err))
    }

    // loads all tickets and saves them to this.state.tickets
    getTickets = () => {
        fetch('http://localhost:4000/tickets')
            .then(response => response.json())
            .then(({ data }) => {
                console.log('The ticket information from Timesheet.js: ', data)
            })
            .then(response => this.setState({ tickets: response.data }))
            .catch(err => console.log('There is an error setting the state of tickets', err))
    }

    // STILL NEED TO ADD FUNCTIONS FOR:
    // adding/creating time entry
    handleDateChange = (event) => {
        this.setState({ date: event.target.value });
    }

    handleHourChange = (event) => {
        this.setState({ hour: event.target.value });
    }

    handleTicketChange = (event) => {
        this.setState({ ticket: event.target.value });
    }

    handleCommentChange = (event) => {
        this.setState({ comment: event.target.value});
    }

    handleBillableChange = (event) => {
        this.setState({ billable: event.target.value});
    }

    handleEntrySubmit = (event) => {
        event.preventDefault();
        console.log("Adding new time entry");
        console.log("this.state.date: ", this.state.date);
        console.log("this.state.hour: ", this.state.hour);
        console.log("this.state.ticket: ", this.state.ticket);
        console.log("this.state.comment: ", this.state.comment);
        console.log("this.state.billable: ", this.state.billable);
        // TimesheetAPI.saveTimesheet({
        //     date: this.state.date,
        //     hour: this.state.hour,
        //     ticket: this.state.ticket,
        //     comment: this.state.comment,
        //     billable: this.state.billable,
        // })
        //     .then(res => this.getTimesheet())
        //     .catch(err => console.log('there is an error in saving the new time entry', err));
    }


    // editing time rendered

    // deleting time rendered

    render() {
        const { classes } = this.props;

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
                <TimeEntry 
                tickets={this.state.tickets}
                handleEntrySubmit = {this.handleEntrySubmit}
                handleDateChange = {this.handleDateChange}
                handleHourChange = {this.handleHourChange}
                handleTicketChange = {this.handleTicketChange}
                handleCommentChange = {this.handleCommentChange}
                handleBillableChange = {this.handleBillableChange} />
            </div>
        );
    }
}

export default Timesheet;