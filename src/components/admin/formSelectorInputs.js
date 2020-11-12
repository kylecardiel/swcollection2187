
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import Select from '@material-ui/core/Select';

export const FormSelectorInput = ({ label, labelWidth, handleOnChange, menuItems, inputLabel }) => {
    const classes = useStyles();
    const dynamicMenuItems = () => {
        if (menuItems[0]){
            if (typeof menuItems[0] === 'string'){
                return menuItems.map(el => <MenuItem key={el} value={el}>{el}</MenuItem>);
            } else {
                return menuItems.map(element => <MenuItem key={element.key} value={element.value}>{element.key}</MenuItem>);
            }
        }
    };

    return (
        <FormControl variant='outlined' className={classes.form}>
            <InputLabel ref={inputLabel} id={`${label}-label`}>{label}</InputLabel>
            <Select
                labelId={`${label}-id`}
                id={label}
                onChange={handleOnChange}
                labelWidth={labelWidth}
                defaultValue={''}
                label={label}
            >
                {dynamicMenuItems()}
            </Select>
        </FormControl>
    );
};

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
        minWidth: 120,
    },
}));

FormSelectorInput.propTypes = {
    handleOnChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    labelWidth: PropTypes.number.isRequired,
    menuItems: PropTypes.array.isRequired,
    inputLabel: PropTypes.object.isRequired,
};