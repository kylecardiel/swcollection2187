import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export const TableHeaders = ({ columnDefinitions }) => {
    const classes = useStyles(); 

    const headerColumn = columnDefinitions.map((record, i) => (
        <TableCell key={i} colSpan={record.span} className={classes.columns}>{record.headerName}</TableCell>
    ));

    return (
        <TableHead>
            <TableRow className={classes.row}>
                {headerColumn}
            </TableRow>
        </TableHead>
    );
};

const useStyles = makeStyles(() => ({
    row: {
        backgroundColor: grey[900],
    },
    columns: {
        color: grey[100],
        textAlign: 'center',
    },
}));

TableHeaders.propTypes = {
    columnDefinitions: PropTypes.array.isRequired,
};
