import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';

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


function TimeEntry(props) {
    const { classes } = props;

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
                            type="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                        />    
                    </TableCell>
                    <TableCell numeric 
                    className={classes.tabledata}></TableCell>
                    <TableCell numeric className={classes.tabledata}></TableCell>
                    <TableCell numeric className={classes.tabledata}></TableCell>
                    <TableCell className={classes.tabledata}>
                        <Checkbox
                            //checked={row.billable}
                            // onChange={this.handleChange('checkedB')}
                            value="checked"
                            // onChange={onSelectAllClick}
                        />
                    </TableCell>
                    <TableCell className={classes.tabledata}>
                        <Button variant="contained" className={classes.commands}>
                            Add
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

TimeEntry.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TimeEntry);