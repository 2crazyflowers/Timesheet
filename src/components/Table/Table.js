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
    commands: {
        fontSize: '10px',
        padding: '0',
        borderRadius: '1px',
        border: '1px solid black',
        margin: '2px',
        marginLeft: '4px',
    }
});

let id = 0;
function createData(date, hours, ticket, comment, billable) {
    id += 1;
    return { id, date, hours, ticket, comment, billable };
}

const rows = [
    createData(20160401, 1.5, 'Acme: 1032', 'Deploy building v20160401', true),
    createData(20160401, 1, 'Acme: 1022', 'Debugging API format issue', true),
    createData(20160401, 2, 'ADMIN', 'Fixing laptop :(', false),
    createData(20160401, 2, 'AceCo: 1092','slicing up design for micro site', true),
];

class TimeRendered extends React.Component {
// function TimeRendered(props) {

    handleTicketMenuOption = event => {
        this.setState({ [event.target.name]: event.target.value });
        event.preventDefault();
        //not grabbing this information from timesheet.js
        console.log('The ticket information from Table.js is: ', event.target.value);
        this.props.handleTicketMenuOption(event);
    }
    
    state = {
        value: '',
    }
    render() {
        const { classes, tickets, timesheet } = this.props;
        console.log('The ticket information is being send into our table: ', tickets);
        console.log('The timesheet information is being send into our table: ', timesheet);
    
        return (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableheader}numeric>Date</TableCell>
                        <TableCell  className={classes.tableheader}numeric>Hours</TableCell>
                        <TableCell className={classes.tableheader}>Ticket</TableCell>
                        <TableCell className={classes.tableheader}>Comments</TableCell>
                        <TableCell className={classes.tableheader}>Billable</TableCell>
                        <TableCell className={classes.tableheader}>Commands</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => {
                    return (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row" numeric className={classes.tabledata}>
                                {row.date}
                            </TableCell>
                            <TableCell numeric className={classes.tabledata}>{row.hours}</TableCell>
                            <TableCell numeric className={classes.tabledata}>        <TextField 
                                id='ticket'
                                select
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className={classes.textField} 
                                value={this.state.value}
                                onChange={this.handleTicketMenuOption} 
                                SelectProps={{ name: 'value'}} 
                                margin="normal">
                                    {tickets.map(ticket => {
                                    return <MenuItem value={ticket.ticket_code}>:  {ticket.client}</MenuItem>;
                                    })}
                                </TextField>
                            </TableCell>
                            <TableCell numeric className={classes.tabledata}>{row.comment}</TableCell>
                            <TableCell className={classes.tabledata}>
                                <Checkbox
                                    checked={row.billable}
                                    // onChange={this.handleChange('checkedB')}
                                    value="checked"
                                    // onChange={onSelectAllClick}
                                />
                            </TableCell>
                            <TableCell className={classes.tabledata}>
                                <Button variant="contained" className={classes.commands}>
                                    Edit
                                </Button>
                                <Button variant="contained" className={classes.commands}>
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
            </Table>
        );
    }
}

// TimeRendered.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(TimeRendered);