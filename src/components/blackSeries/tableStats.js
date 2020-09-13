import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

export const TableStats = ({ stats }) => {
    const classes = useStyles();
    return (
        <TableContainer component={Paper} className={classes.table}>
            <Table size='small' aria-label='a dense table'>
                <TableHead>
                    <TableRow className={classes.headerRow}>
                        <TableCell className={classes.totalRowCell}>Source</TableCell>
                        <TableCell align='right' className={classes.totalRowCell}>Count</TableCell>
                        <TableCell align='right' className={classes.totalRowCell}>Percentage</TableCell>
                        <TableCell align='right' className={classes.totalRowCell}>Retail Cost</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stats.source.map((k,v) =>
                        <TableRow key={k.name}>
                            <TableCell component='th' scope='row'>{k.name}</TableCell>
                            <TableCell align='right'>{k.count}</TableCell>
                            <TableCell align='right'>{`${Math.floor(k.count / stats.count * 100)}%`}</TableCell>
                            <TableCell align='right'>{`$${k.cost.toFixed(2)}`}</TableCell>
                        </TableRow>
                    )}
                    <TableRow key={'total'} className={classes.headerRow}>
                            <TableCell component='th' scope='row' className={classes.totalRowCell}>{'Total'}</TableCell>
                            <TableCell align='right' className={classes.totalRowCell}>{stats.count}</TableCell>
                            <TableCell align='right' className={classes.totalRowCell}>{'100%'}</TableCell>
                            <TableCell align='right' className={classes.totalRowCell}>{`$${stats.totalCost.toFixed(2)}`}</TableCell>
                        </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )

}

const useStyles = makeStyles(() => ({
    headerRow: {
        backgroundColor: 'black',
    },
    totalRowCell: {
        color: 'white',
    },
    table: {
        borderRadius: 0,
    },
}));