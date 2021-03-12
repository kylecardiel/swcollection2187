import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { ABOUT_ME_PAGE, PAGES } from 'shared/constants/stringConstantsSelectors';
import { isProduction } from 'shared/util/environment';
import { Color } from 'shared/styles/color';
import { aboutMe } from 'shared/fixtures/aboutMeData';
import { AboutMeApi } from 'shared/api/aboutMeApi';

const { HOME } = ROUTE_CONSTANTS;

export const AboutMe = ({ aboutMeData, setAboutMeData }) => {
    const classes = useStyles();

    useEffect(() => {
        if(!isProduction) {
            const catalogRef = AboutMeApi.read();
            catalogRef.once('value').then((snapshot) => {
                const snapshotRef = snapshot.val();
                if (snapshotRef) setAboutMeData(snapshotRef['aboutMeId']);
            });
        } else {
            setAboutMeData(aboutMe);
        }

    }, [setAboutMeData]);


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

    const buildParagraphs = aboutMeData ? aboutMeData.map((element, index) => {
        return <div key={index}>
            {headerSection(element.title)}
            {bodySection(element.text)}
        </div>;
    }) : <></>;

    const body = <>
        <>{buildParagraphs}</>
        <>{headerSection(ABOUT_ME_PAGE.HEADER_SNES)}</>
        <div className={classes.container}>
            <section className={classes.center}>
                <img src={IMAGE_PATHS.SNES} alt='SNES'></img>
            </section>
        </div>
    </>;

    return (
        <>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.ABOUT.HEADER} />
            <Container component='main' maxWidth='xl'>
                <div className={classes.root}>
                    <div className={classes.body}>
                        { aboutMeData && body }
                    </div>
                </div>
            </Container>
        </>
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

AboutMe.propTypes = {
    aboutMeData: PropTypes.array,
    setAboutMeData: PropTypes.func.isRequired,
};