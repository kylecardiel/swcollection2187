import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { UserConsumer } from 'components/auth/authContext';
import { MediaCard } from 'components/common/cards/mediaCard';
import { Footer } from 'components/footer/footer';
import { HowItWorks } from 'components/homePage/howItWorks';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { HOME_PAGE } from 'shared/constants/stringConstantsSelectors';

const { HOME_PAGE: { CATALOG_CARDS } } = IMAGE_PATHS;

export const Homepage = () => {
    const classes = useStyles();
    const { loggedIn } = useContext(UserConsumer);

    const notLoggedInCards = !loggedIn && <HowItWorks />;

    const blackSeriesCard = <Grid item xs={12} md={6}>
        <MediaCard
            cardText={HOME_PAGE.CARDS.BLACK_SERIES}
            route={ROUTE_CONSTANTS.ACTION_FIGURES.BLACK_SERIES}
            imagePath={CATALOG_CARDS.BLACK_SERIES_LOGO}
        />
    </Grid>;

    const videoGameCard = <Grid item xs={12} md={6}>
        <MediaCard
            cardText={HOME_PAGE.CARDS.VIDEO_GAMES}
            route={ROUTE_CONSTANTS.VIDEO_GAMES}
            imagePath={CATALOG_CARDS.VIDEO_GAMES_LOGO}
        />
    </Grid>;

    const loggedInCards = loggedIn && <>
        <Grid item xs={12}>
            <h2>{HOME_PAGE.GET_STARTED}</h2>
        </Grid>
        {blackSeriesCard}
        {videoGameCard}
    </>;

    const introParagraph = HOME_PAGE.INTRO_PARAGRAPH_GENERIC;

    return (
        <>
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
                        {notLoggedInCards}
                        {loggedInCards}
                    </Grid>
                </div>
                <Footer />
            </Container>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    container:{
        marginTop: theme.spacing(.5),
    },
}));

Homepage.propTypes = {
    videoGamesCollection: PropTypes.bool,
};
