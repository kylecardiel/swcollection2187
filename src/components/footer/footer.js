import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { DevInfo } from 'components/footer/devInfo';
import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { FOOTER } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { SocialMedia } from 'components/footer/socialMedia';

export const Footer = () => {
    const classes = useStyles();
    const arrowIcon = <ArrowForwardIosIcon fontSize='small' className={classes.icons}/>;

    const buildLinks = (route, text) => {
        return <Link to={route} className={classes.links}>
            {text}
            {arrowIcon}
        </Link>;
    };

    const siteLinks = <>
        {buildLinks(ROUTE_CONSTANTS.ABOUT_ME, FOOTER.ABOUT_ME)}
        {buildLinks(ROUTE_CONSTANTS.HOW_TO, FOOTER.HOW_TO)}
        {buildLinks(ROUTE_CONSTANTS.FUTURE_PLANS, FOOTER.FUTURE_PLANS)}
        {buildLinks(ROUTE_CONSTANTS.TOS, FOOTER.TOS)}
        {buildLinks(ROUTE_CONSTANTS.CONTACT_ME, FOOTER.CONTACT)}
    </>;

    return (
        <div className={classes.footer}>
            <Grid item xs={12} className={classes.flex}>
                {siteLinks}
                <SocialMedia />
            </Grid>
            <DevInfo />
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: Color.white(),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            borderTop: '0px',
            paddingTop: theme.spacing(-1),
            paddingBottom: theme.spacing(5),
            marginTop: theme.spacing(10),
        },
        [theme.breakpoints.up('md')]: {
            borderTop: '1px solid #696969',
            marginTop: '1rem',
            padding: '1rem',
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
        },
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        color: Color.black(),
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
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
        display: 'flex',
        flexDirection: 'row',
        textDecoration: 'none',
        color: Color.black(),
        fontWeight: 'bold',
        [theme.breakpoints.down('sm')]: {
            borderTop: '1px solid #696969',
            justifyContent: 'space-between',
            padding: theme.spacing(2),
        },
        [theme.breakpoints.up('md')]: {
            borderTop: '0px',
        },
    },
}));