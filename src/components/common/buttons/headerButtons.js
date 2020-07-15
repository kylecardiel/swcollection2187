import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { Button } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

export const HeaderButton = ({ buttonLabel, onClick, route }) => {
    const classes = useStyles();
    return (
        <Link
            underline='none'
            component={RouterLink}
            to={route}
        >
            <Button
                variant='contained'
                className={classes.button}
                onClick={onClick}
                target='_blank'
            >
                {buttonLabel}
            </Button>
        </Link>
    );
};

const useStyles = makeStyles(theme => ({
    button: {
        marginRight: theme.spacing(1),
        marginLeft: theme.spacing(1),
        backgroundColor: red[900],
        borderRadius: '0',
        color: 'white',
        '&:hover': {
            backgroundColor: 'white',
            color: red[900],
        },
    }
}));
