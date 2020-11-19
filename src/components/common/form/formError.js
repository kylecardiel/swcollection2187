import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { red } from '@material-ui/core/colors';
import Typography from '@material-ui/core/Typography';

export const FormError = ({ errorMessage }) => {
    const classes = useStyles();
    return (
        <Typography data-testid='FormErrorId' component='p' className={classes.formError}>
            {errorMessage}
        </Typography>
    );
};

const useStyles = makeStyles(theme => ({
    formError: {
        color: red[700],
        backgroundColor: red[100],
        borderRadius: 5,
        textAlign: 'center',
        borderStyle: 'groove',
        borderWidth: '1px',
        borderColor: red[700],
        fontStyle: 'italic',
    },
}));

FormError.propTypes = {
    errorMessage: PropTypes.string.isRequired,
};
