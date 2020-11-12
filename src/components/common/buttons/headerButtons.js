import { Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { red } from '@material-ui/core/colors';
import { Link as RouterLink } from 'react-router-dom';

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
        borderRadius: '5',
        color: 'white',
        '&:hover': {
            backgroundColor: 'white',
            color: red[900],
        },
    },
}));

HeaderButton.propTypes = {
    buttonLabel: PropTypes.string,
    onClick: PropTypes.func.isRequired,
    route: PropTypes.string,
};
