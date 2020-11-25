import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Footer } from 'components/footer/footer';
import { HOME_PAGE } from 'shared/constants/stringConstantsSelectors';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { makeStyles } from '@material-ui/core/styles';
import { MediaCard } from 'components/common/card';
import { ROLES } from 'shared/constants/roleConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { UserConsumer } from 'components/auth/authContext';

export const Homepage = () => {
    const classes = useStyles();
    const { email, loggedIn } = useContext(UserConsumer);

    return (
        <Container component='main' maxWidth='xl'>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <h1>{HOME_PAGE.TAG_LINE}</h1>
                    </Grid>
                    <Grid item xs={12}>
                        <section>
                            <h3>{HOME_PAGE.WELCOME}</h3>
                            <p>{HOME_PAGE.INTRO_PARAGRAPH}</p>
                        </section>
                    </Grid>
                    {!loggedIn && 
                        <>
                            <Grid item xs={12}>
                                <h2>{HOME_PAGE.HOW_IT_WORKS}</h2>
                            </Grid>
                            <Grid item xs={12} className={classes.howContainer}>
                                <MediaCard
                                    cardText={HOME_PAGE.CARDS.STEP_1}
                                    imagePath={IMAGE_PATHS.STEP_1}
                                    route={ROUTE_CONSTANTS.SIGNUP}
                                />
                                <MediaCard
                                    cardText={HOME_PAGE.CARDS.STEP_2}
                                    imagePath={IMAGE_PATHS.STEP_2}
                                    route={ROUTE_CONSTANTS.BLACK_SERIES}
                                />
                                <MediaCard
                                    cardText={HOME_PAGE.CARDS.STEP_3}
                                    imagePath={IMAGE_PATHS.STEP_3}
                                    route={ROUTE_CONSTANTS.BLACK_SERIES}
                                />
                            </Grid>
                        </>
                    }
                    <Grid item xs={12}>
                        <h2>{HOME_PAGE.GET_STARTED}</h2>
                    </Grid>
                    <Grid item xs={12}>
                        <MediaCard
                            cardText={HOME_PAGE.CARDS.BLACK_SERIES}
                            route={ROUTE_CONSTANTS.BLACK_SERIES}
                            imagePath={IMAGE_PATHS.BLACK_SERIES_LOGO}
                        />
                    </Grid>
                    {ROLES.EMAIL === email &&
                        <Grid item xs={12} md={3}>
                            <MediaCard
                                cardText={HOME_PAGE.CARDS.ADMIN}
                                route={ROUTE_CONSTANTS.ADMIN}
                            />
                        </Grid>
                    }
                    <Footer />
                </Grid>
            </div>
        </Container>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        // overflow: 'hidden',
    },
    howContainer: {
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
}));