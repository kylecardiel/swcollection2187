import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TableHeaders } from 'components/common/table/tableHeaders';
import { Paper, Table, TableBody } from '@material-ui/core';
import { FormDataTableRow } from 'components/admin/formDataRow';

export const FormDataTable = ({ header, data, dataType}) => {
    const classes = useStyles();
    const columnDef = headerValue => [{ headerName: headerValue, span: 2, }];
    console.log(columnDef(header))
    return (
        <Paper className={classes.paperTable}>
            <Table>
                <TableHeaders columnDefinitions={columnDef(header)} />
                <TableBody>
                    <FormDataTableRow data={data} dataType={dataType} />
                </TableBody>
            </Table>
        </Paper>
    );
};

const useStyles = makeStyles(theme => ({
    paperTable: {
        marginTop: theme.spacing(2),
    },
}));