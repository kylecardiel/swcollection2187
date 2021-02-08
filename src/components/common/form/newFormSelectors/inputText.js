import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { InputLabelText } from 'components/common/form/newFormSelectors/inputLabelText';
import PropTypes from 'prop-types';
import React from 'react';

export const InputText = ({ label, isNumber, register }) => {
    const classes = useStyles();
    const text = label.KEY;
    const inputName = label.VALUE;
    return (
        <>
            <InputLabelText text={text} />
            <Grid item xs={12} md={2} className={classes.inputBoxInColumn}>
                <TextField
                    variant='outlined'
                    className={classes.form}
                    fullWidth
                    id={inputName}
                    name={inputName}
                    label={inputName}
                    inputRef={register()}
                    type={isNumber ? 'number' : 'string'}
                />
            </Grid>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%',
        marginTop: theme.spacing(0),
        minWidth: 120,
    },
    inputBoxInColumn: {
        marginBottom: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
}));

InputText.propTypes = {
    isNumber: PropTypes.bool,
    register: PropTypes.func.isRequired,
    label: PropTypes.object.isRequired, 
};
