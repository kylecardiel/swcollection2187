import React from 'react';
import { Color } from 'shared/styles/color';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import Container from '@material-ui/core/Container';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { makeStyles } from '@material-ui/core/styles';
import { PAGES, ABOUT_ME_PAGE } from 'shared/constants/stringConstantsSelectors';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';

const { HOME } = ROUTE_CONSTANTS;

export const AboutMe = () => {
    const classes = useStyles();

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    const section = component => {
        return <div className={classes.container}>
            <section className={classes.center}>
                {component}
            </section>
        </div>; 
    };

    const headerSection = header => {
        return section(<h3>{header}</h3>);
    };

    const bodySection = text => {
        return section(<p>{text}</p>);
    };

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.ABOUT.HEADER} />
            <Container component='main' maxWidth='xl'>
                <div className={classes.root}>
                    <div className={classes.body}>
                        {headerSection(ABOUT_ME_PAGE.HEADER_INTRO)}
                        {bodySection(ABOUT_ME_PAGE.INTRO)}
                        {headerSection(ABOUT_ME_PAGE.HEADER_WHY)}
                        {bodySection(ABOUT_ME_PAGE.WHY)}
                        {headerSection(ABOUT_ME_PAGE.HEADER_START)}
                        {bodySection(ABOUT_ME_PAGE.STARTING)}
                        {headerSection(ABOUT_ME_PAGE.HEADER_SNES)}
                        <div className={classes.container}>
                            <section className={classes.center}>
                                <img src={IMAGE_PATHS.SNES} alt='SNES'></img>
                            </section>
                        </div>
                        {false && 
                            <>
                                {headerSection(ABOUT_ME_PAGE.HEADER_TBS_COLLECTION)}
                                <div className={classes.container}>
                                    <img src={IMAGE_PATHS.TBS_COLLECTION} alt='SNES' className={classes.image}></img>
                                </div>
                                {bodySection(ABOUT_ME_PAGE.TBS_COLLECTION)}
                            </>
                        }
                    </div>
                </div>
            </Container>
        </React.Fragment>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        width: '40%',
        [theme.breakpoints.down('sm')]: {
            width: '95%',
        },
        [theme.breakpoints.up('md')]: {
            width: '50%',
        },
    },
    body: {
        width: '100%',
        height: '180vh',
        background: '#000',
        overflow: 'hidden',
        color: Color.yellow(),
        fontFamily: 'Pathway Gothic One, sans-serif',
    },
    image: {
        width: '100%',
        height: '450',
        [theme.breakpoints.down('sm')]: {
            height: '250',
        },
        [theme.breakpoints.up('md')]: {
            height: '450',
        },
    },
}));
