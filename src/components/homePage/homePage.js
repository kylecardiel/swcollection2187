import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Footer } from 'components/footer/footer';
import { HOME_PAGE } from 'shared/constants/stringConstantsSelectors';
import { HowItWorks } from 'components/homePage/howItWorks';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { makeStyles } from '@material-ui/core/styles';
import { MediaCard } from 'components/common/cards/mediaCard';
import { ROLES } from 'shared/constants/roleConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { UserConsumer } from 'components/auth/authContext';
import PropTypes from 'prop-types';
import { isProduction } from 'shared/util/environment';
import packageJson from '../../../package.json';

const { HOME_PAGE: { CATALOG_CARDS } } = IMAGE_PATHS;

export const Homepage = () => {
    const classes = useStyles();
    const { email, loggedIn } = useContext(UserConsumer);

    const videoGameCard = <Grid item xs={12} md={6}>
        <MediaCard
            cardText={HOME_PAGE.CARDS.VIDEO_GAMES}
            route={ROUTE_CONSTANTS.VIDEO_GAMES}
            imagePath={CATALOG_CARDS.VIDEO_GAMES_LOGO}
        />
    </Grid>;

    const introParagraph = HOME_PAGE.INTRO_PARAGRAPH_GENERIC;
    const authorized = ROLES.EMAIL === email;

    const versionText = `Development ENV & on Version: ${packageJson.version}`;

    return (
        <Container component='main' maxWidth='xl'>
            <div className={classes.root}>
                <Grid container spacing={1} className={classes.container}>
                    <Grid item xs={12} className={classes.title}>
                        <h1>{HOME_PAGE.TAG_LINE}</h1>
                        <section>
                            <h3>{HOME_PAGE.WELCOME}</h3>
                            <p>{introParagraph}</p>
                        </section>
                    </Grid>
                    { !loggedIn && <HowItWorks /> }
                    { loggedIn && 
                        <>
                            <Grid item xs={12}>
                                <h2>{HOME_PAGE.GET_STARTED}</h2>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <MediaCard
                                    cardText={HOME_PAGE.CARDS.BLACK_SERIES}
                                    route={ROUTE_CONSTANTS.BLACK_SERIES}
                                    imagePath={CATALOG_CARDS.BLACK_SERIES_LOGO}
                                />
                            </Grid>
                            {videoGameCard}
                        </>
                    }
                    {authorized &&
                        <Grid item xs={12} >
                            <MediaCard
                                cardText={HOME_PAGE.CARDS.ADMIN}
                                route={ROUTE_CONSTANTS.ADMIN}
                            />
                        </Grid>
                    }
                    <Footer />
                    {!isProduction && 
                        <Grid item xs={12} container direction='row' justify='flex-start' alignItems='center' spacing={1} className={classes.version}>
                            {versionText}
                        </Grid>
                    }
                </Grid>
            </div>
        </Container>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    container:{
        marginTop: theme.spacing(.5),
    },
    version:{
        marginTop: theme.spacing(5),
    },
}));

Homepage.propTypes = {
    videoGamesCollection: PropTypes.bool,
};
