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
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Source</TableCell>
                        <TableCell align="right">Count</TableCell>
                        <TableCell align="right">Percentage</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stats.source.map((k,v) =>
                        <TableRow key={k.name}>
                            <TableCell component="th" scope="row">{k.name}</TableCell>
                            <TableCell align="right">{k.count}</TableCell>
                            <TableCell align="right">{`${Math.floor(k.count / stats.count * 100)}%`}</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )

}

const useStyles = makeStyles((theme) => ({
    table: {
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(-.5),
    }
}));