import React, { useContext } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { MediaCard } from 'components/common/card';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { HOME_PAGE_CARDS } from 'shared/constants/stringConstantsSelectors';
import { UserConsumer } from 'components/auth/authContext';
import Typography from '@material-ui/core/Typography';
import { ROLES } from 'shared/constants/roleConstants';

export const Homepage = () => {
    const classes = useStyles();
    const { email } = useContext(UserConsumer);
    return (
        <Container component='main' maxWidth='lg'>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography gutterBottom variant='h5' component='h2'>
                            Hello There!
                        </Typography>
                        <Typography gutterBottom variant='h5' component='h2'>
                            Do you love the Black Series? 
                            Do you collect Black Series Figures? 
                            Do you keep track of your collection?
                            Do you want to keep track of your collection?... Then you're in the right spot
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <MediaCard
                            cardText={HOME_PAGE_CARDS.BLACK_SERIES}
                            route={ROUTE_CONSTANTS.BLACK_SERIES}
                            imagePath={IMAGE_PATHS.BLACK_SERIES_LOGO}
                        />
                    </Grid>
                    {email === ROLES.EMAIL && <Grid item xs={3}>
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