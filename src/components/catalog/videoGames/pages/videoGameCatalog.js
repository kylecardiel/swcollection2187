/* eslint-disable react/prop-types */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { UserConsumer } from 'components/auth/authContext';
import { VideoGameCard } from 'components/catalog/videoGames/cards/videoGameCard';
import { MyCollectionButton } from 'components/common/buttons/myCollectionButton';
import { SearchBar } from 'components/common/searchBar';
import { Viewport } from 'components/common/viewport/viewport';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { CatalogApi } from 'shared/api/catalogApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { CatalogData } from 'shared/fixtures/catalogData';
import { isProduction } from 'shared/util/environment';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';

const { VIDEO_GAMES } = FB_DB_CONSTANTS;

export const VideoGameCatalog = props => {
    const classes = useStyles();
    const { helperData, screenSize, setVideoGameData, userList, videoGameList } = props;

    const { id } = useContext(UserConsumer);
    const [filterByInputName, setFilterByInputName] = useState();
    const handleInputNameChange = e => {
        if (e.target) {
            const { value } = e.target;
            setTimeout(setFilterByInputName(value), 500);
        }
    };

    const [filterByMyCollection, setFilterByMyCollection] = useState(false);
    const handleMyCollectionChange = () => setFilterByMyCollection(!filterByMyCollection);

    const [initialState] = useState(props);
    useEffect(() => {
        
        if(!isProduction) {
            const catalogRef = CatalogApi.read(VIDEO_GAMES);
            catalogRef.once('value').then((snapshot) => {
                if (snapshot.val()) {
                    let records = snapshot.val();
                    setVideoGameData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records, 'id'));
                }
            });

        } else {
            setVideoGameData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(CatalogData.VideoGames, 'id'));
        }

    }, [initialState, setVideoGameData, helperData, id]);

    const massageList = () => {
        let mergedList = videoGameList && userList ? RecordUtils.mergeTwoArraysByAttribute(videoGameList, 'id', userList, 'catalogId') : videoGameList;
        if (filterByInputName) mergedList = mergedList.filter(el => el.name.toLowerCase().includes(filterByInputName.toLowerCase()));
        if (filterByMyCollection) mergedList = mergedList.filter(el => el.owned === true);
        return SortingUtils.sortDataByAttributeDesc(mergedList, 'year');
    };

    const displayList = massageList();

    const GAP_SIZE = 10;
    const CARD_HEIGHT = 460;
    const CARD_WIDTH = 300;

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
                        <Grid
                            item
                            container
                            direction='row'
                            justify='space-around'
                            spacing={1}
                            xs={12}
                            md={6}
                            className={classes.viewFilters}
                        >
                            <MyCollectionButton
                                isMobileDevice={screenSize.isMobileDevice}
                                filterByMyCollection={!filterByMyCollection}
                                handleMyCollectionChange={handleMyCollectionChange}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
            <Viewport 
                CardComponent={VideoGameCard} 
                displayList={displayList} 
                CARD_HEIGHT={CARD_HEIGHT} 
                CARD_WIDTH={CARD_WIDTH} 
                GAP_SIZE={GAP_SIZE}
            />
        </>
    );
};

const useStyles = makeStyles(theme => ({
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
        marginTop: theme.spacing(1.25),
        marginBottom: theme.spacing(1),
    },
}));

VideoGameCatalog.propTypes = {
    videoGameList: PropTypes.array.isRequired,
    helperData: PropTypes.object.isRequired,
    setVideoGameData: PropTypes.func.isRequired,
};
