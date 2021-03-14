import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { DevInfo } from 'components/footer/devInfo';
import React from 'react';
import { Link } from 'react-router-dom';
import { EXTERNAL_LINKS } from 'shared/constants/externalLinks';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { FOOTER } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';

const { SOCIAL_MEDIA } = IMAGE_PATHS;

export const Footer = () => {
    const classes = useStyles();
    const arrowIcon = <ArrowForwardIosIcon fontSize='small' className={classes.icons}/>;

    const buildLinks = (route, text) => {
        return <Link to={route} className={classes.links}>
            {text}
            {arrowIcon}
        </Link>;
    };

    const buildSocialMediaIcon = (link, image, alt) => {
        return <a href={link}>
            <img src={image} alt={alt} className={classes.socialMediaIcons}/>
        </a>;
    };

    return (
        <Container component='main' maxWidth='xl' className={classes.footer}>
            <Grid item xs={12} className={classes.flex}>
                {buildLinks(ROUTE_CONSTANTS.ABOUT_ME, FOOTER.ABOUT_ME)}
                {buildLinks(ROUTE_CONSTANTS.HOW_TO, FOOTER.HOW_TO)}
                {buildLinks(ROUTE_CONSTANTS.FUTURE_PLANS, FOOTER.FUTURE_PLANS)}
                {buildLinks(ROUTE_CONSTANTS.TOS, FOOTER.TOS)}
                {buildLinks(ROUTE_CONSTANTS.CONTACT_ME, FOOTER.CONTACT)}
                <div className={classes.socialMediaContainer}>
                    {buildSocialMediaIcon(EXTERNAL_LINKS.FACEBOOK, SOCIAL_MEDIA.FACEBOOK, 'facebook')}
                    {buildSocialMediaIcon(EXTERNAL_LINKS.INSTAGRAM, SOCIAL_MEDIA.INSTAGRAM, 'instagram')}
                    {buildSocialMediaIcon(EXTERNAL_LINKS.TWITTER, SOCIAL_MEDIA.TWITTER, 'twitter')}
                </div>
            </Grid>
            <DevInfo />
        </Container>
    );
};

const useStyles = makeStyles(theme => ({
    footer: {
        marginTop: theme.spacing(12),
        backgroundColor: Color.white(),
        paddingBottom: theme.spacing(10),
        [theme.breakpoints.down('sm')]: {
            borderTop: '0px',
            paddingTop: theme.spacing(-1),
            paddingBottom: theme.spacing(5),
        },
        [theme.breakpoints.up('md')]: {
            borderTop: '1px solid #696969',
            paddingTop: theme.spacing(2),
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
        '&:hover': {
            color: 'blue',
        },
        [theme.breakpoints.down('sm')]: {
            borderTop: '1px solid #696969',
            justifyContent: 'space-between',
            padding: theme.spacing(2),
        },
        [theme.breakpoints.up('md')]: {
            borderTop: '0px',
        },
    },
    socialMediaContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        },
    },
    socialMediaIcons: {
        width: 35, 
        height: 35,
        paddingRight: theme.spacing(1),
    },
}));