import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';

export const InputLabelText = ({ text }) => {
    const classes = useStyles();

    return (
        <Grid item xs={12} md={2} className={classes.inputBoxInColumn}>
            <Typography variant='subtitle1' className={classes.text}>
                {text}
            </Typography>
        </Grid>);
};

const useStyles = makeStyles(theme => ({
    inputBoxInColumn: {
        marginBottom: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
    },
}));

InputLabelText.propTypes = {
    text: PropTypes.string.isRequired, 
};
