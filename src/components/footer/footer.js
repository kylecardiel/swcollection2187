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
            <hr/>
            <Grid container spacing={1}>
                <Grid item xs={12} className={classes.flex}>
                    <Link to={ROUTE_CONSTANTS.ABOUT_ME} className={classes.links}>{FOOTER.ABOUT_ME}</Link>
                    <Link to={ROUTE_CONSTANTS.TOS} className={classes.links}>{FOOTER.TOS}</Link>
                    <Link to={ROUTE_CONSTANTS.CONTACT_ME} className={classes.links}>{FOOTER.CONTACT}</Link>
                </Grid>
            </Grid>
        </Container>
    );
};

const useStyles = makeStyles(theme => ({
    footer: {
        marginTop: theme.spacing(10),
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
        },
    },
    links: {
        textDecoration: 'none',
    },
}));