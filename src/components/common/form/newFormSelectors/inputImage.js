import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { InputLabelText } from 'components/common/form/newFormSelectors/inputLabelText';
import PropTypes from 'prop-types';
import React from 'react';

export const InputImage = ({ text, handleChange }) => {
    const classes = useStyles();

    return (
        <>
            <InputLabelText text={text} />
            <Grid item xs={12} md={10} className={classes.inputBoxInColumn}>
                <input type='file' onChange={handleChange} />
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

InputImage.propTypes = {
    handleChange: PropTypes.func.isRequired, 
    text: PropTypes.string.isRequired,
};
