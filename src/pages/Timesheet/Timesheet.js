import React, { Component } from "react";
import "./Timesheet.css";



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

    // renderEntry = ({id, date, hours, ticket, comment, billable}) => {
    // <td key={id}>{date}</td>
    // <td key={id}>{hours}</td>
    // <td key={id}>{ticket}</td>
    // <td key={id}>{comment}</td>
    // <td key={id}>{billable}</td>
    // }

    renderDate = ({id, date}) => <td key={id}>{date}</td>


    render() {
        const { timesheet } = this.state;
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
                            {timesheet.map(this.renderDate)}
                        </tr>
                        {/* <tr>
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
                        </tr> */}
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