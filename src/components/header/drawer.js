import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { HEADER_BUTTONS } from 'shared/constants/stringConstantsSelectors';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    container: {
        color: 'white',
    },
    sections: {
        textAlign: 'right',
        fontSize: '18px',
        margin: theme.spacing(3),
    },
}));

const { LOGIN, SIGN_UP, PROFILE, LOGOUT } = HEADER_BUTTONS;

export const DrawerContainer = props => {
    const classes = useStyles();

    const { userLoggedIn, logoutUser } = props;

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
        </Grid>
    };

    const loginLink = createNavigationLink(LOGIN, ROUTE_CONSTANTS.LOGIN);
    const signUpLink = createNavigationLink(SIGN_UP, ROUTE_CONSTANTS.SIGNUP);
    const profileLink = createNavigationLink(PROFILE, ROUTE_CONSTANTS.USER_PROFILES);

    return (
        <Grid container spacing={1} className={classes.container}>
            {!userLoggedIn && loginLink}
            {!userLoggedIn && signUpLink}
            {userLoggedIn && profileLink}
            {userLoggedIn &&
                <Grid item xs={12} className={classes.sections}>
                    <div className={classes.color} onClick={logoutUser}>
                        {LOGOUT}
                    </div>
                </Grid>
            }
        </Grid>

    );
}
