import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Color } from 'shared/styles/color';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { FOOTER } from 'shared/constants/stringConstantsSelectors';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';

export const Footer = () => {
    const classes = useStyles();
    return (
        <Container component='main' maxWidth='xl' className={classes.footer}>
            <Grid container spacing={1} >
                <Grid item xs={12} md={4} className={classes.flex}>
                    <Link to={ROUTE_CONSTANTS.ABOUT_ME} className={classes.links}>{FOOTER.ABOUT_ME}</Link>
                    <ArrowForwardIosIcon fontSize='small' className={classes.icons}/>
                </Grid>
                <Grid item xs={12} md={4} className={classes.flex}>
                    <Link to={ROUTE_CONSTANTS.TOS} className={classes.links}>{FOOTER.TOS}</Link>
                    <ArrowForwardIosIcon fontSize='small' className={classes.icons}/>
                </Grid>
                <Grid item xs={12} md={4} className={classes.flex}>
                    <Link to={ROUTE_CONSTANTS.CONTACT_ME} className={classes.links}>{FOOTER.CONTACT}</Link>
                    <ArrowForwardIosIcon fontSize='small' className={classes.icons}/>
                </Grid>
            </Grid>
        </Container>
    );
};

const useStyles = makeStyles(theme => ({
    footer: {
        marginTop: theme.spacing(12),
        [theme.breakpoints.down('sm')]: {
            borderTop: '0px',
        },
        [theme.breakpoints.up('md')]: {
            borderTop: '1px solid #696969',
        },
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        color: Color.black(),
        [theme.breakpoints.down('sm')]: {
            borderTop: '1px solid #696969',
            justifyContent: 'space-between',
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            borderTop: '0px',
            justifyContent: 'space-around',
        },
    },
    icons: {
        [theme.breakpoints.down('sm')]: {
            display: 'inline',
        },
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    links: {
        textDecoration: 'none',
        color: Color.black(),
        fontWeight: 'bold',
        '&:hover': {
            textDecoration: 'underline',
            color: 'blue',
        },
    },
}));