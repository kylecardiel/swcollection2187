import React from 'react';
import Grid from '@material-ui/core/Grid';
import { HOME_PAGE } from 'shared/constants/stringConstantsSelectors';
import { HowToCards } from 'components/homePage/howToCards';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';

export const HowItWorks = () => {
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <h2>{HOME_PAGE.HOW_IT_WORKS}</h2>
            </Grid>
            <Grid item xs={12} md={4}>
                <HowToCards
                    cardText={HOME_PAGE.CARDS.STEP_1}
                    imagePath={IMAGE_PATHS.STEP_1}
                    route={ROUTE_CONSTANTS.SIGNUP}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <HowToCards
                    cardText={HOME_PAGE.CARDS.STEP_2}
                    imagePath={IMAGE_PATHS.STEP_2}
                    route={ROUTE_CONSTANTS.BLACK_SERIES}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <HowToCards
                    cardText={HOME_PAGE.CARDS.STEP_3}
                    imagePath={IMAGE_PATHS.STEP_3}
                    route={ROUTE_CONSTANTS.BLACK_SERIES}
                />
            </Grid>
        </React.Fragment>
    );
};