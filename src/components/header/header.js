import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ToolBar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
    },
    navBar: {
        background: 'black',
        color: 'white',
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
        color: 'white',
    },
    list: {
        width: 250,
        height: '100%',
        background: 'black',
    },
    fullList: {
        width: 'auto',
    },
}));


export const Header = props => {

    const classes = useStyles();

    const {
        title,
    } = props;

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
                            {title}
                        </Grid>
                    
                    </Grid>
                </Container>
            </ToolBar>
        </AppBar>
    );
};
