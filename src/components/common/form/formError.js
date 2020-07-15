import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { red } from '@material-ui/core/colors';

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

export const FormError = props => {

    const classes = useStyles();

    return (
        <Typography data-testid='FormErrorId' component='p' className={classes.formError}>
            {props.errorMessage}
        </Typography>
    );
}
