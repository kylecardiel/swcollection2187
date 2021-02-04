import { Color } from 'shared/styles/color';
import Grid from '@material-ui/core/Grid';
import { HEADER_BUTTONS } from 'shared/constants/stringConstantsSelectors';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';

const { HOME, LOGIN, SIGN_UP, LOGOUT } = HEADER_BUTTONS;

export const DrawerContainer = ({ loggedIn, logout }) => {
    const classes = useStyles();
    const createNavigationLink = (text, route) => {
        return <Grid item xs={12} className={classes.sections}>
            <Link
                underline='none'
                component={RouterLink}
                to={route}
                color='inherit'
            >
                {text}
            </Link>
        </Grid>;
    };

    const loginLink = createNavigationLink(LOGIN, ROUTE_CONSTANTS.LOGIN);
    const signUpLink = createNavigationLink(SIGN_UP, ROUTE_CONSTANTS.SIGNUP);
    const homeLink = createNavigationLink(HOME, ROUTE_CONSTANTS.HOME);

    return (
        <Grid container spacing={1} className={classes.container}>
            {!loggedIn && loginLink}
            {!loggedIn && signUpLink}
            {loggedIn &&
                <>
                    {homeLink}
                    <Grid item xs={12} className={classes.sections}>
                        <div className={classes.color} onClick={logout}>
                            {LOGOUT}
                        </div>
                    </Grid>
                </>
            }
        </Grid>

    );
};

const useStyles = makeStyles(theme => ({
    container: {
        color: Color.white(),
    },
    sections: {
        textAlign: 'right',
        fontSize: '18px',
        margin: theme.spacing(3),
    },
}));

DrawerContainer.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
};
