import { makeStyles } from '@material-ui/core/styles';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import React from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { PAGES } from 'shared/constants/stringConstantsSelectors';

import { VideoGameCard } from 'components/catalog/videoGames/videoGameCard';

const { HOME } = ROUTE_CONSTANTS;

export const VideoGameCatalog = () => {
    const classes = useStyles();

   const videoGame =  {
        collectionType: 'Video Games',
        createdBy: 'kyle.cardiel@gmail.com',
        createdDate: 'Feb 07, 2021 13:15:37',
        lastModifiedBy: 'kyle.cardiel@gmail.com',
        lastModifiedDate: 'Feb 07, 2021 13:15:37',
        videoGameName: 'Jedi Fallen Order',
        videoGameConsole: [ 'PlayStation 4', 'Xbox One', 'Microsoft Windows'],
        videoGameFormat: 'Disc',
        videoGameSeries: '',
        videoGameType: 'Action Adventure',
        year: '2019'
      };

    return (
        <React.Fragment>
            <VideoGameCard 
                videoGame={videoGame}
            />
        </React.Fragment>
    );
};

const useStyles = makeStyles(theme => ({
}));
