import React, { Component } from "react";
import "./Timesheet.css";



class Timesheet extends Component {

    state = {
        user: "",
        pass: "", 
        date: "",
        hours: "",
        ticket: "",
        comment: "",
        billable: ""

    };

    render() {
        return (
            <div className="Timesheet">
                <div className="Navbar">
                    <button className="ChangeWeek">Change Week</button>
                    <button className="Logout">Logout</button>
                </div>
                <div className="Header">
                    <h1 className="Timesheet-title">Week of x/x/2018</h1>
                </div>
                <div>
                    <table className="Table">
                        <tr>
                            <th>Date</th>
                            <th>Hours</th> 
                            <th>Ticket</th>
                            <th>Comments</th>
                            <th>Billable</th>
                            <th>Commands</th>
                        </tr>
                        <tr>
                            <td>4/1/2016</td>
                            <td>1.5</td> 
                            <td>Acme: 1032</td>
                            <td>Deploying build v20160401</td>
                            <td>checkmark</td>
                            <td>Edit Delete</td>
                        </tr>
                        <tr>
                            <td>4/1/2016</td>
                            <td>1</td> 
                            <td>Acme: 1032</td>
                            <td>Deploying build v20160401</td>
                            <td>checkmark</td>
                            <td>Edit Delete</td>
                        </tr>
                        <tr>
                            <td>4/1/2016</td>
                            <td>2</td> 
                            <td>Acme: 1032</td>
                            <td>Deploying build v20160401</td>
                            <td>checkmark</td>
                            <td>Edit Delete</td>
                        </tr>
                        <tr>
                            <td>4/1/2016</td>
                            <td>2</td> 
                            <td>Acme: 1032</td>
                            <td>Deploying build v20160401</td>
                            <td>checkmark</td>
                            <td>Edit Delete</td>
                        </tr>
                        <tr>
                            <td>4/1/2016</td>
                            <td>3</td> 
                            <td>Acme: 1032</td>
                            <td>Deploying build v20160401</td>
                            <td>checkmark</td>
                            <td>Edit Delete</td>
                        </tr>
                    </table>
                    <h3>Add Entry</h3>
                    <table className="Table">
                        <tr>
                            <th>Date</th>
                            <th>Hours</th> 
                            <th>Ticket</th>
                            <th>Comments</th>
                            <th>Billable</th>
                            <th>Commands</th>
                        </tr>
                        <tr>
                            <td>4/1/2016</td>
                            <td>1.5</td> 
                            <td>Acme: 1032</td>
                            <td>Deploying build v20160401</td>
                            <td>checkmark</td>
                            <td>Add</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default Timesheet;