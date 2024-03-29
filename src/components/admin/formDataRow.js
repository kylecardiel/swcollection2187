import { ActionButton } from 'components/common/buttons/actionButton';
import { Color } from 'shared/styles/color';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { HelperDataApi } from 'shared/api/helperDataApi';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export const FormDataTableRow = ({ data, dataType, disable }) => {
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
                {!disable && <ActionButton icon={<DeleteForeverIcon />} color={Color.red()} onClick={() => onDelete(val)} /> }
            </TableCell>
        </TableRow>;
    });

    return (
        <>{rows}</>
    );
};

const useStyles = makeStyles(() => ({
    buttonColumn: {
        width: 40,
        alignItems: 'center',
    },
}));

FormDataTableRow.propTypes = {
    data: PropTypes.object.isRequired,
    dataType: PropTypes.string.isRequired,
    disable: PropTypes.bool,
};