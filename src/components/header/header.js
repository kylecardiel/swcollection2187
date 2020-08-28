import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ToolBar from '@material-ui/core/Toolbar';
import { logout } from 'backend/FirebaseAuth';
import { UserConsumer } from 'components/auth/authContext';
import { HeaderButton } from 'components/common/buttons/headerButtons';
import { HeaderText } from 'components/common/text/headerText';
import React, { useContext } from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { HEADER_BUTTONS } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';

const { LOGIN, SIGN_UP, LOGOUT, } = HEADER_BUTTONS;

export const Header = ({ title }) => {
    const classes = useStyles();
    const user = useContext(UserConsumer);
    const { loggedIn } = user;

    const loginButton = <HeaderButton buttonLabel={LOGIN} route={ROUTE_CONSTANTS.LOGIN} />;
    const signUpButton = <HeaderButton buttonLabel={SIGN_UP} route={ROUTE_CONSTANTS.SIGNUP} />;
    const logoutButton = <HeaderButton buttonLabel={LOGOUT} onClick={logout} route={ROUTE_CONSTANTS.HOME} />;

    return (
        <AppBar position='static' className={classes.navBar} >
            <ToolBar>
                <Container component='main' maxWidth='xl'>
                    <Grid
                        container
                        direction='row'
                        justify='space-between'
                        alignItems='center'
                        spacing={1}
                    >
                        <Grid container item xs={10} md={8} spacing={1}>
                            <HeaderText text={title} textColor={'white'} />
                        </Grid>
                        <Grid container item xs={3} spacing={1} className={classes.normalButton}>
                            {loggedIn ? logoutButton : <>{loginButton}{signUpButton}</> }
                        </Grid>
                    </Grid>
                </Container>
            </ToolBar>
        </AppBar>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
    },
    navBar: {
        background: Color.blackGradient(),
        color: Color.white(),
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    normalButton: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'center',
        },
    },
    collapseButton: {
        boxShadow: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    collapseButtonColor: {
        color: Color.white(),
    },
    list: {
        width: 250,
        height: '100%',
        background: Color.blackGradient(),
    },
    fullList: {
        width: 'auto',
    },
}));
