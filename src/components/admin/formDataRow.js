import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Color } from 'shared/styles/color';
import { ActionButton } from 'components/common/buttons/actionButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import { HelperDataApi } from 'shared/api/orchestrator';

export const FormDataTableRow = props => {

    const { data, dataType } = props;
    const { id, values } = data;

    const classes = useStyles();

    const onDelete = deleteValue => {
        let newObject = {};
        newObject[id] = values.filter(element => element !== deleteValue);
        HelperDataApi.delete(newObject, dataType);
    };

    const rows = values.map(val => {
        return <TableRow key={val} >
            <TableCell >{val}</TableCell>
            <TableCell className={classes.buttonColumn}>
                <ActionButton icon={<DeleteForeverIcon />} color={Color.primary('red')} onClick={() => onDelete(val)} />
            </TableCell>
        </TableRow>
    });

    return (
        <>{rows}</>
    );
};

const useStyles = makeStyles(theme => ({
    buttonColumn: {
        width: 40,
        alignItems: 'center',
    },
}));