import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
});

let id = 0;
function createData(date, hours, ticket, comments, billable) {
    id += 1;
    return { id, date, hours, ticket, comments, billable };
}

const rows = [
    createData(20160401, 1.5, 'Acme: 1032', 'Deploy building v20160401', true),
    createData(20160401, 1, 'Acme: 1022', 'Debugging API format issue', true),
    createData(20160401, 2, 'ADMIN', 'Fixing laptop :(', false),
    createData(20160401, 2, 'licing up design for micro site', true),
];


function SimpleTable(props) {
    const { classes } = props;

    return (
    <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell numeric>Date</TableCell>
                    <TableCell numeric>Hours</TableCell>
                    <TableCell>Ticket</TableCell>
                    <TableCell>Comments</TableCell>
                    <TableCell>Billable</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rows.map(row => {
                return (
                    <TableRow key={row.id}>
                        <TableCell component="th" scope="row" numeric>
                            {row.date}
                        </TableCell>
                        <TableCell numeric>{row.hours}</TableCell>
                        <TableCell numeric>{row.ticket}</TableCell>
                        <TableCell numeric>{row.comment}</TableCell>
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={row.billable}
                                // onChange={this.handleChange('checkedB')}
                                value="checked"
                                color="primary"
                                // onChange={onSelectAllClick}
                            />
                        </TableCell>
                    </TableRow>
                );
            })}
        </TableBody>
        </Table>
    </Paper>
    );
}

SimpleTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);