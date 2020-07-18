import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { MediaCard } from 'components/common/card';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { HOME_PAGE_CARDS } from 'shared/constants/stringConstantsSelectors';
import { UserConsumer } from 'components/auth/authContext';

export const Homepage = () => {
    const classes = useStyles();
    const { loggedIn } = useContext(UserConsumer);
    return (
        <Container component='main' maxWidth='lg'>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <MediaCard
                            cardText={HOME_PAGE_CARDS.BLACK_SERIES}
                            route={ROUTE_CONSTANTS.BLACK_SERIES}
                            imagePath={IMAGE_PATHS.BLACK_SERIES_LOGO}
                        />
                    </Grid>
                    {loggedIn && <Grid item xs={3}>
                        <MediaCard
                            cardText={HOME_PAGE_CARDS.ADMIN}
                            route={ROUTE_CONSTANTS.ADMIN}
                        />
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
        margin: theme.spacing(3),
    },
}));