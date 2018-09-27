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
    checkbox: {
        outline: 'none',
    },
    button: {
        fontSize: '10px',
        padding: '2px',
        margin: '2px',
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


function SimpleTable(props) {
    const { classes } = props;

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
                        <TableCell numeric className={classes.tabledata}>{row.ticket}</TableCell>
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
                            <Button variant="contained" className={classes.button}>
                                Edit
                            </Button>
                            <Button variant="contained" className={classes.button}>
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

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);