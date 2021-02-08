import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { VideoGameCard } from 'components/catalog/videoGames/videoGameCard';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { isProduction } from 'shared/util/environment';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';
import { CatalogData } from 'shared/fixtures/catalogData';

const { HOME } = ROUTE_CONSTANTS;

export const VideoGameCatalog = props => {
    const classes = useStyles();
    const { helperData, setVideoGameData } = props;

    // const [initialState] = useState(props);
    // useEffect(() => {
        
    //     if(isProduction) {
    //         console.log('Implement prod reads...');
    //     } else {
    //         // console.log(CatalogData.VideoGames)
    //         setVideoGameData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(CatalogData.VideoGames, 'id'));
    //     }

    // }, [initialState, setVideoGameData, helperData]);

    const videoGameList =  [
        {
            id: 'id123',
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
            year: '2019',
        },
        {
            id: 'id123',
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
            year: '2019',
        },
        {
            id: 'id123',
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
            year: '2019',
        },
        {
            id: 'id123',
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
            year: '2019',
        },
        {
            id: 'id123',
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
            year: '2019',
        },
        {
            id: 'id123',
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
            year: '2019',
        },
        {
            id: 'id123',
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
            year: '2019',
        },
    ];

    const GAP_SIZE = 10;
    const CARD_HEIGHT = 500;
    const CARD_WIDTH = 300;

    const Item = ({ data, index, style }) => {
        const { cardHeight, cardWidth, columnCount, gapSize, itemCount } = data;
        const startIndex = index * columnCount;
        const stopIndex = Math.min(itemCount - 1, startIndex + columnCount - 1);

        const cards = [];
        for (let i = startIndex; i <= stopIndex; i++) {
            cards.push(
                <div
                    key={`${videoGameList[i]}-${i}`}
                    className={classes.sampleCard}
                    style={{
                        flex: `0 0 ${cardWidth}px`,
                        height: cardHeight,
                        margin: `0 ${gapSize / 2}px`,
                    }}
                >
                    <Grid item xs={12} key={videoGameList[i].id} >
                        <VideoGameCard  videoGame={videoGameList[i]} />
                    </Grid>
                </div >,
            );
        }

        return (
            <div className={classes.sampleItem} style={style}>
                {cards}
            </div>
        );
    };

    function ListWrapper({ height, itemCount, width }) {
        const columnCount = Math.floor((width - GAP_SIZE) / (CARD_WIDTH + GAP_SIZE));
        const rowCount = Math.ceil(itemCount / columnCount);

        const itemData = useMemo(
            () => ({
                columnCount,
                itemCount,
                cardWidth: CARD_WIDTH,
                cardHeight: CARD_HEIGHT,
                gapSize: GAP_SIZE,
            }),
            [columnCount, itemCount],
        );

        return (
            <List
                className={classes.sampleList}
                height={height}
                itemCount={rowCount}
                itemSize={CARD_HEIGHT + GAP_SIZE}
                width={width}
                itemData={itemData}
            >
                {Item}
            </List>
        );
    }

    return (
        <AutoSizer disableHeight >
            {({ width }) => (
                <ListWrapper
                    height={window.innerHeight*.8}
                    itemCount={videoGameList.length}
                    width={width}
                />
            )}
        </AutoSizer>
    );
};

const useStyles = makeStyles(theme => ({
    sampleCard: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sampleItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        maxWidth: 325,
        maxHeight: 325,
        borderRadius: 0,
        boxShadow: '0 0 5px',
    },

}));

VideoGameCatalog.propTypes = {
    videoGameList: PropTypes.array.isRequired,
    helperData: PropTypes.object.isRequired,
    setVideoGameData: PropTypes.func.isRequired,
};

