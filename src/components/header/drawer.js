import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { HEADER_BUTTONS } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';

const { HOME, LOGIN, SIGN_UP, LOGOUT, PROFILE, VIDEO_GAMES, BS } = HEADER_BUTTONS;

export const DrawerContainer = ({ loggedIn, logout }) => {
    const classes = useStyles();

    const arrowIcon = <ArrowForwardIosIcon fontSize='small' className={classes.icons}/>;
    
    const buildLink = (route, text) => {
        return <Link to={route} className={classes.links}>
            {text}
            {arrowIcon}
        </Link>;
    };

    const notLoggedInLinks = <Grid container spacing={1} >
        <Grid item xs={12} className={classes.flex} direction='column' justify='space-between'>
            {buildLink(ROUTE_CONSTANTS.LOGIN, LOGIN)}
            {buildLink(ROUTE_CONSTANTS.SIGNUP, SIGN_UP)}
        </Grid>
    </Grid>;   

    const loggedInLinks = <Grid container spacing={1} >
        <Grid item xs={12} className={classes.flex} direction='column' justify='space-between'>
            {buildLink(ROUTE_CONSTANTS.HOME, HOME)}
            {buildLink(ROUTE_CONSTANTS.USER_PROFILE, PROFILE)}
            {buildLink(ROUTE_CONSTANTS.BLACK_SERIES, BS)}
            {buildLink(ROUTE_CONSTANTS.VIDEO_GAMES, VIDEO_GAMES)}
            <Link className={`${classes.links} ${classes.linksBottom}`} onClick={logout}>
                {LOGOUT}
                {arrowIcon}
            </Link>
        </Grid>
    </Grid>;

    return (
        <Container component='main' maxWidth='xl' className={classes.footer}>
            { loggedIn ? loggedInLinks : notLoggedInLinks }
        </Container>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        color: Color.white(),
    },
    sections: {
        textAlign: 'center',
        fontSize: '18px',
        margin: theme.spacing(3),
    },

    footer: {
        marginTop: theme.spacing(3),
        borderTop: '0px',
        paddingBottom: theme.spacing(5),
    },
    flex: {
        color: Color.black(),
    },
    icons: {
        display: 'inline',
    },
    links: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textDecoration: 'none',
        color: Color.black(),
        fontWeight: 'bold',
        '&:hover': {
            textDecoration: 'underline',
            color: 'blue',
        },
        borderTop: '1px solid #696969',
        padding: theme.spacing(2),
    },
    linksBottom: {
        borderBottom: '1px solid #696969',
    },
}));

DrawerContainer.propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
};
