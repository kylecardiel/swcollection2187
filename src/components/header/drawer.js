import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import TuneIcon from '@material-ui/icons/Tune';
import { UserConsumer } from 'components/auth/authContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ROLES } from 'shared/constants/roleConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { HEADER_BUTTONS } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';

const { ADMIN, HOME, LOGIN, SIGN_UP, LOGOUT, PROFILE, VIDEO_GAMES, BS } = HEADER_BUTTONS;

export const DrawerContainer = ({ loggedIn, logout }) => {
    const classes = useStyles();
    const { email } = useContext(UserConsumer);
    const authorized = ROLES.EMAIL === email;

    const arrowIcon = <ArrowForwardIosIcon fontSize='small' className={classes.icons}/>;
    
    const buildLink = (route, text, icon) => {
        return <Link to={route} className={classes.links}>
            <Grid container item xs={12} spacing={5} className={classes.individualIcon} direction='row' justifyContent='flex-start'>
                {icon}
                <span className={classes.text}>{text}</span>
            </Grid>
            {arrowIcon}
        </Link>;
    };

    const notLoggedInLinks = <Grid container spacing={1} >
        <Grid container item xs={12} className={classes.flex} direction='column' justifyContent='space-between'>
            {buildLink(ROUTE_CONSTANTS.LOGIN, LOGIN)}
            {buildLink(ROUTE_CONSTANTS.SIGNUP, SIGN_UP)}
        </Grid>
    </Grid>;   

    const loggedInLinks = <Grid container spacing={1} >
        <Grid container item xs={12} className={classes.flex} direction='column' justifyContent='space-between'>
            {buildLink(ROUTE_CONSTANTS.HOME, HOME, <HomeIcon/>)}
            {buildLink(ROUTE_CONSTANTS.USER_PROFILE, PROFILE, <AccountCircleIcon />)}
            {buildLink(ROUTE_CONSTANTS.ACTION_FIGURES.BLACK_SERIES, BS, <EmojiPeopleIcon />)}
            {buildLink(ROUTE_CONSTANTS.VIDEO_GAMES, VIDEO_GAMES, <SportsEsportsIcon />)}
            {authorized && buildLink(ROUTE_CONSTANTS.ADMIN, ADMIN, <TuneIcon />)}
            <Link to={''} className={`${classes.links} ${classes.linksBottom}`}>
                <Grid container item xs={12} spacing={5} className={classes.individualIcon} direction='row' justifyContent='flex-start' onClick={logout}>
                    <ExitToAppIcon />
                    <span className={classes.text}>{LOGOUT}</span>
                </Grid>
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
    text:{
        paddingLeft: theme.spacing(3),
    },
    footer: {
        marginTop: theme.spacing(3),
        borderTop: '0px',
        paddingBottom: theme.spacing(5),
    },
    flex: {
        color: Color.black(),
    },
    individualIcon: {
        paddingLeft: theme.spacing(1),
        alignItems: 'center',
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
