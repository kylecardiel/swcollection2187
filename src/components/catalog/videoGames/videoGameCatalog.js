/* eslint-disable react/prop-types */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { VideoGameCard } from 'components/catalog/videoGames/videoGameCard';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';
import { CatalogApi } from 'shared/api/catalogApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { CatalogData } from 'shared/fixtures/catalogData';
import { UserConsumer } from 'components/auth/authContext';
import { UserApi } from 'shared/api/userApi';
import { usersData } from 'shared/fixtures/userData';
import { isProduction } from 'shared/util/environment';
import { RecordUtils } from 'shared/util/recordUtils';
import { SearchBar } from 'components/common/searchBar';
import { SortingUtils } from 'shared/util/sortingUtil';
import { Link, useRouteMatch } from 'react-router-dom';

const { VIDEO_GAMES } = FB_DB_CONSTANTS;

export const VideoGameCatalog = props => {
    const classes = useStyles();
    const { helperData, setVideoGameData, setUserData, userList, videoGameList } = props;

    const { id, loggedIn } = useContext(UserConsumer);
    let { url } = useRouteMatch();
    const [filterByInputName, setFilterByInputName] = useState();
    const handleInputNameChange = e => {
        if (e.target) {
            const { value } = e.target;
            setTimeout(setFilterByInputName(value), 500);
        }
    };

    const [initialState] = useState(props);
    useEffect(() => {
        
        if(isProduction) {
            const catalogRef = CatalogApi.read(VIDEO_GAMES);
            catalogRef.on('value', snapshot => {
                if (snapshot.val()) {
                    let records = snapshot.val();
                    setVideoGameData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records, 'id'));
                }
            });

            if (loggedIn) {
                const userRef = UserApi.read(id, VIDEO_GAMES);
                userRef.on('value', snapshot => {
                    if (snapshot.val()) {
                        let records = snapshot.val();
                        setUserData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records, 'ownedId'));
                    }
                });
            }

        } else {
            setVideoGameData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(CatalogData.VideoGames, 'id'));
            setUserData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(usersData.VideoGames, 'ownedId'));
        }

    }, [initialState, setVideoGameData, helperData, setUserData, loggedIn, id]);

    const massageList = () => {
        let mergedList = videoGameList && userList ? RecordUtils.mergeTwoArraysByAttribute(videoGameList, 'id', userList, 'catalogId') : videoGameList;
        if (filterByInputName) mergedList = mergedList.filter(el => el.name.toLowerCase().includes(filterByInputName.toLowerCase()));
        
        return SortingUtils.sortDataByAttributeDesc(mergedList, 'year');
    };

    const displayList = massageList();

    const GAP_SIZE = 10;
    const CARD_HEIGHT = 460;
    const CARD_WIDTH = 300;

    const Item = ({ data, index, style }) => {
        const { cardHeight, cardWidth, columnCount, gapSize, itemCount } = data;
        const startIndex = index * columnCount;
        const stopIndex = Math.min(itemCount - 1, startIndex + columnCount - 1);

        const cards = [];
        for (let i = startIndex; i <= stopIndex; i++) {
            cards.push(
                <div
                    key={`${displayList[i]}-${i}`}
                    className={classes.sampleCard}
                    style={{
                        flex: `0 0 ${cardWidth}px`,
                        height: cardHeight,
                        margin: `0 ${gapSize / 2}px`,
                    }}
                >
                    <Grid item xs={12} key={displayList[i].id} >
                        <Link
                            to={{
                                pathname: `${url}/${displayList[i].id}`,
                            }}
                            style={{ textDecoration: 'none' }}
                        >
                            <VideoGameCard  videoGame={displayList[i]} />
                        </Link>
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
        <>
            <Container component='main' maxWidth='xl'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6} className={classes.alwaysDisplayed}>
                            <SearchBar 
                                filterByInputText={filterByInputName}
                                handleInputTextChange={handleInputNameChange}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
            <AutoSizer disableHeight >
                {({ width }) => (
                    <ListWrapper
                        height={window.innerHeight*.8}
                        itemCount={displayList.length}
                        width={width}
                    />
                )}
            </AutoSizer>
        </>
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
    alwaysDisplayed: {
        marginTop: theme.spacing(.35),
        marginBottom: theme.spacing(1),
    },
    viewFilters: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

VideoGameCatalog.propTypes = {
    videoGameList: PropTypes.array.isRequired,
    helperData: PropTypes.object.isRequired,
    setVideoGameData: PropTypes.func.isRequired,
};
