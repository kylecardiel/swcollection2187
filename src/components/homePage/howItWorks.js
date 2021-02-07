import React from 'react';
import Grid from '@material-ui/core/Grid';
import { HOME_PAGE } from 'shared/constants/stringConstantsSelectors';
import { HowToCards } from 'components/homePage/howToCards';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { makeStyles } from '@material-ui/core/styles';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';

const { HOME_PAGE: { HOW_TO } } = IMAGE_PATHS;

export const HowItWorks = () => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Grid item xs={12} className={classes.title}>
                <h2>{HOME_PAGE.HOW_IT_WORKS}</h2>
            </Grid>
            <Grid item xs={12} md={4}>
                <HowToCards
                    cardText={HOME_PAGE.CARDS.STEP_1}
                    imagePath={HOW_TO.STEP_1}
                    route={ROUTE_CONSTANTS.SIGNUP}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <HowToCards
                    cardText={HOME_PAGE.CARDS.STEP_2}
                    imagePath={HOW_TO.STEP_2}
                    route={ROUTE_CONSTANTS.BLACK_SERIES}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <HowToCards
                    cardText={HOME_PAGE.CARDS.STEP_3}
                    imagePath={HOW_TO.STEP_3}
                    route={ROUTE_CONSTANTS.BLACK_SERIES}
                />
            </Grid>
        </React.Fragment>
    );
};

const useStyles = makeStyles(theme => ({
    title: {
        backgroundColor: 'white',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        marginBottom: theme.spacing(.5),
        borderRadius: '5px',
    },
}));
