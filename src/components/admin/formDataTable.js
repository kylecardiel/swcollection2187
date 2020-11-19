import { Paper, Table, TableBody } from '@material-ui/core';
import { FormDataTableRow } from 'components/admin/formDataRow';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { TableHeaders } from 'components/common/table/tableHeaders';

export const FormDataTable = ({ header, data, dataType, disable }) => {
    const classes = useStyles();
    const columnDef = headerValue => [{ headerName: headerValue, span: 2 }];
    return (
        <Paper className={classes.paperTable}>
            <Table>
                <TableHeaders columnDefinitions={columnDef(header)} />
                <TableBody>
                    <FormDataTableRow data={data} dataType={dataType} disable={disable}/>
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

FormDataTable.propTypes = {
    header: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
    dataType: PropTypes.string.isRequired,
    disable: PropTypes.bool,
};