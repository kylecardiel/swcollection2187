import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import ToolBar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { logout } from 'backend/FirebaseAuth';
import { UserConsumer } from 'components/auth/authContext';
import { HeaderButton } from 'components/common/buttons/headerButtons';
import { HeaderText } from 'components/common/text/headerText';
import { DrawerContainer } from 'components/header/drawer';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { HEADER_BUTTONS } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';

const { LOGIN, SIGN_UP } = HEADER_BUTTONS;

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

    return (
        <div className={classes.container}>
            <AppBar position='static' className={classes.navBar} >
                <ToolBar>
                    <Container component='main' maxWidth='xl'>
                        <Grid
                            container
                            direction='row'
                            justifyContent='space-between'
                            alignItems='center'
                            spacing={1}
                        >
                            <Grid container item xs={10} md={8} spacing={3} justifyContent='flex-start' alignItems='center'>
                                <Link underline='none' component={RouterLink} to={ROUTE_CONSTANTS.HOME}>
                                    <img src={IMAGE_PATHS.DEATH_STAR_LOGO} alt='logo' width='40px'/>
                                </Link>
                                <HeaderText text={title} textColor={'white'} />
                            </Grid>
                            {!loggedIn && 
                                <>
                                    <Grid container item xs={3} spacing={1} className={classes.normalButton}>
                                        <>{loginButton}{signUpButton}</>
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
                                </>
                            }
                            {loggedIn && 
                                <Grid container item xs={2} spacing={1} direction='row' justifyContent='flex-end' alignItems='center' className={classes.alwaysWhenLoggedIn}>
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
                            }
                        </Grid>
                    </Container>
                </ToolBar>
            </AppBar>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    container: {
        width: '100vw',
    },
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
    alwaysWhenLoggedIn: {
        boxShadow: 'none',
    },
    collapseButtonColor: {
        color: 'white',
    },
    list: {
        [theme.breakpoints.down('md')]: {
            width: 250,
        },
        [theme.breakpoints.up('md')]: {
            width: 400,
        },
        height: '100%',
        background: Color.nearWhite(),
    },
}));

Header.propTypes = {
    title: PropTypes.string.isRequired,
    logoutUser: PropTypes.func,
};
