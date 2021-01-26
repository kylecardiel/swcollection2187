import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { Button } from '@material-ui/core';
import { Color } from 'shared/styles/color';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import { DrawerContainer } from 'components/header/drawer';
import Grid from '@material-ui/core/Grid';
import { HEADER_BUTTONS } from 'shared/constants/stringConstantsSelectors';
import { HeaderButton } from 'components/common/buttons/headerButtons';
import { HeaderText } from 'components/common/text/headerText';
import { logout } from 'backend/FirebaseAuth';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import ToolBar from '@material-ui/core/Toolbar';
import { UserConsumer } from 'components/auth/authContext';

const { LOGIN, SIGN_UP, LOGOUT } = HEADER_BUTTONS;

export const Header = ({ title }) => {
    const classes = useStyles();
    const user = useContext(UserConsumer);
    const { loggedIn } = user;

    const [state, setState] = useState({ right: false });

    const toggleDrawer = (anchor, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = anchor => (
        <div
            className={classes.list}
            role='presentation'
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <DrawerContainer loggedIn={loggedIn} logout={logout}/>
        </div>
    );


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
                            {loggedIn 
                                ? logoutButton 
                                : <>{loginButton}{signUpButton}</> 
                            }
                        </Grid>
                        <Grid container item xs={2} spacing={1} className={classes.collapseButton}>
                            <Button onClick={toggleDrawer('right', true)}>
                                <MenuIcon className={classes.collapseButtonColor} />
                            </Button>
                            <Drawer
                                anchor={'right'}
                                open={state['right']}
                                onClose={toggleDrawer('right', false)}
                                className={classes.drawer}
                            >
                                {list('right')}
                            </Drawer>
                        </Grid>
                    </Grid>
                </Container>
            </ToolBar>
        </AppBar>
    );
};

const useStyles = makeStyles(theme => ({
    navBar: {
        background: Color.blackGradient(),
        color: Color.white(),
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
        color: 'white',
    },
    list: {
        width: 250,
        height: '100%',
        background: Color.primary('eliteBlackGradient'),
    },
}));

Header.propTypes = {
    title: PropTypes.string.isRequired,
    logoutUser: PropTypes.func,
};
