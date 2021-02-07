import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabelText } from 'components/common/form/newFormSelectors/inputLabelText';
import PropTypes from 'prop-types';
import React from 'react';

export const MultiSelector = ({ currentValue, handleChange, label, menuItems }) => {
    const classes = useStyles();

    return (
        <>
            <InputLabelText text={label.KEY} />
            <Grid item xs={12} md={10} className={classes.inputBoxInColumn}>
                <FormControl >
                    <InputLabel id={`${label.value}-label`}>{label.value}</InputLabel>
                    <Select
                        labelId={`${label.value}-label`}
                        id={label.value}
                        multiple
                        value={currentValue}
                        onChange={handleChange}
                        input={<Input />}
                    >
                        {menuItems.map(e => <MenuItem key={e} value={e}>{e}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    inputBoxInColumn: {
        marginBottom: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

MultiSelector.propTypes = {
    currentValue: PropTypes.string.isRequired, 
    handleChange:  PropTypes.func.isRequired,
    label: PropTypes.object.isRequired,
    menuItems: PropTypes.array.isRequired,
};
