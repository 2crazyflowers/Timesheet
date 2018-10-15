import React, { Component } from "react";
import "./Timesheet.css";
import TimeRendered from "./TimeRendered";
import TimeEntry from "./TimeEntry";
import TimeEntryAPI from "../../utils/TimeEntryAPi";
import TicketsAPI from "../../utils/TicketsAPI";

class Timesheet extends Component {
    state = {
        timeentries: [],
        tickets: [],
        date: '',
        hour: '',
        ticket: '',
        comment: '',
        billable: false,
        error: '',
    };

    //all of the functions are rendered on this main page

    // when the components mounts, load all time entries and ticket info and save them to this.state.timeentries and this.state.tickets
    componentDidMount() {
        this.loadTimeentries();
        this.loadTickets();
    }

    // loads all time entries and saves them to this.state.timeentries
    loadTimeentries = () => {
        TimeEntryAPI.getTimeEntries()
            .then(res => this.setState({ timeentries: res.data }))
            .then(console.log('the time entries found: ', this.state.timeentries))
            .catch(err => console.log('getting time entries did not work: ', err));
    }
    // loads all tickets and saves them to this.state.tickets
    loadTickets = () => {
        TicketsAPI.getTickets()
        .then(res => this.setState({ tickets: res.data }))
        .catch(err => console.log('getting tickets did not work: ', err));
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
        // console.log('before the change the box value was: ', this.state.billable);
        // change billable: 'checked' to true
        // and billable: 'unchecked' to false
        if (this.state.billable === true) {
            this.setState({ billable: false});
            console.log('the checkbox has been set to false');
        }
        else {
            this.setState({ billable: true});
            console.log('the checkbox has been set to true');
        }
        // console.log('the box is: ',this.state.billable);
    }

    handleTimeEntrySubmit = (event) => {
        event.preventDefault();
        console.log("Adding new time entry");
        console.log("this.state.date: ", this.state.date);
        console.log("this.state.hour: ", this.state.hour);
        console.log("this.state.ticket: ", this.state.ticket);
        console.log("this.state.comment: ", this.state.comment);
        console.log("this.state.billable: ", this.state.billable);
        TimeEntryAPI.saveTimeEntry({
            date: this.state.date,
            hour: this.state.hour,
            ticket: this.state.ticket,
            comment: this.state.comment,
            billable: this.state.billable,
        })
            .then(res => this.getTimesheet())
            .catch(err => console.log('there is an error in saving the new time entry', err));
    }

    // Deletes a time entry from the database with a given id, then reloads timeentries from the database
    deleteTimeEntry = id => {
        TimeEntryAPI.deleteTimeEntry(id)
            .then(res => this.loadTimeentries())
            .catch(err => console.log('there is an error reloading the timeentries after a deleting an entry: ', err));
    };
    
    // editing time entry
    //TimeEntryAPI


    render() {
        // const { classes } = this.props;

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
                timeentries={this.state.timeentries}
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