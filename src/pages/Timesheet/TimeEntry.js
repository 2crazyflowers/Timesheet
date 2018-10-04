import React from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Input } from '@material-ui/core';

const styles = theme => ({
    table: {
        width: '80%',
        boxShadow: '10px 10px grey',
    },
    tableheader: {
        fontSize: '16px',
        fontWeight: 'bold',
        padding: '5px',
        textAlign: 'left',
    },
    tabledata: {
        padding: '6px',        
        textAlign: 'left',
    },
    textField: {
        margin: '2px',
        fontSize: '10px',
        width: '135px',
        paddingRight: '2px',
    },
    commands: {
        fontSize: '10px',
        padding: '0',
        borderRadius: '1px',
        border: '1px solid black',
        margin: '2px',
        marginLeft: '4px',
    }
});


class TimeEntry extends React.Component {
    
    handleTickeDropdown = event => {
        this.setState({ [event.target.name]: event.target.value });
        event.preventDefault();
        //not grabbing this information from timesheet.js
        console.log('The ticket information from Table.js is: ', this.state.tickets);
        this.props.handleTicketChange(event);
    }

    state = {
        value: '',
    }

    render() {
        const { classes, tickets } = this.props;

        // tickets are still not being listed properly
        console.log('The ticket information is in TimeEntry.js is: ', tickets);
        
        return (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableheader}
                        numeric>Date</TableCell>
                        <TableCell  className={classes.tableheader}numeric>Hours</TableCell>
                        <TableCell className={classes.tableheader}>Ticket</TableCell>
                        <TableCell className={classes.tableheader}>Comments</TableCell>
                        <TableCell className={classes.tableheader}>Billable</TableCell>
                        <TableCell className={classes.tableheader}>Command</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                        <TableCell component="th" scope="row" numeric className={classes.tabledata}>
                            <TextField
                            id="date"
                            type="date"
                            defaultValue="2017-05-24"
                            value={this.props.handleDate}
                            onChange={this.props.handleDateChange}
                            className={classes.textField}
                            />    
                        </TableCell>
                        <TableCell numeric 
                        className={classes.tabledata}>
                            <Input
                            id="hour"
                            value={this.props.handleHour}
                            onChange={this.props.handleHourChange}
                            />
                        </TableCell>
                        <TableCell 
                        numeric className={classes.tabledata}>
                            <TextField 
                            id='ticket'
                            select
                            InputLabelProps={{
                                shrink: true,
                            }}
                            className={classes.textField} 
                            value={this.state.value}
                            onChange={this.handleTicketDropdown} 
                            SelectProps={{ name: 'value'}} 
                            margin="normal">
                                {tickets.map(ticket => {
                                return <MenuItem value={ticket.ticket_code}>: {ticket.client_name}</MenuItem>;
                                })}
                            </TextField>
                        </TableCell>
                        <TableCell numeric className={classes.tabledata}>
                            <Input
                            id="comment"
                            value={this.props.handleComment}
                            onChange={this.props.handleCommentChange}
                            />
                        </TableCell>
                        <TableCell className={classes.tabledata}>
                            <Checkbox
                            id="billable"
                            value={this.billable}
                            onChange={this.props.handleBillableChange}
                           />
                        </TableCell>
                        <TableCell className={classes.tabledata}>
                            <Button variant="contained" className={classes.commands}
                            onClick={this.props.handleEntrySubmit}>
                                Add
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        );
    }
}

export default withStyles(styles)(TimeEntry);