/* eslint-disable react/prop-types */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import { UserConsumer } from 'components/auth/authContext';
import { CatalogFilter } from 'components/catalog/common/filters/catalogFilter';
import { VideoGameCard } from 'components/catalog/videoGames/cards/videoGameCard';
import { ActionButton } from 'components/common/buttons/actionButton';
import { MyCollectionButton } from 'components/common/buttons/myCollectionButton';
import { FormFilter } from 'components/common/form/formFilter';
import { SearchBar } from 'components/common/searchBar';
import { Viewport } from 'components/common/viewport/viewport';
import camelCase from 'lodash/camelCase';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { CatalogApi } from 'shared/api/catalogApi';
import { UserApi } from 'shared/api/userApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { GENERAL_FILTER_MODAL, NEW_VIDEO_GAME_FORM } from 'shared/constants/stringConstantsSelectors';
import catalogDataFile from 'shared/fixtures/catalogData.json';
import userDataFile from 'shared/fixtures/userData.json';
import { Color } from 'shared/styles/color';
import { fitlerModalSizes, modalStyles } from 'shared/styles/modalStyles';
import { isProduction } from 'shared/util/environment';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';
import { capatilizeString } from 'shared/util/stringUtil';
import userDataFile from 'shared/fixtures/userData.json';
import { onValue } from 'firebase/database';

const { CatalogData } = catalogDataFile;
const { usersData } = userDataFile;

const { VIDEO_GAMES } = FB_DB_CONSTANTS;

export const VideoGameCatalog = props => {
    const classes = useStyles();
    const { clearUserDisplaySettings, filterState, helperData, screenSize, setUserData, setUserDisplaySettings, setVideoGameData, userList, videoGameList } = props;

    const { id, loggedIn } = useContext(UserConsumer);
    
    const inputLabel = useRef(null);
    const [labelWidth] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(!isModalOpen);

    const [filterByInputName, setFilterByInputName] = useState(filterState.filterByInputName);
    const handleInputNameChange = e => {
        if (e.target) {
            const { value } = e.target;
            setTimeout(setFilterByInputName(value), 500);
            setTimeout(setUserDisplaySettings('filterByInputName', value), 500);
        }
    };

    const [filterByMyCollection, setFilterByMyCollection] = useState(false);
    const handleMyCollectionChange = () => {
        setFilterByMyCollection(!filterByMyCollection);
        setUserDisplaySettings('filterByMyCollection', !filterByMyCollection);
    };

    const [filterByVideoGameConsole, setFilterByVideoGameConsole] = useState(filterState.filterByVideoGameConsole);
    const handleVideoGameConsoleChange = e => {
        const value = e.target.value;
        setFilterByVideoGameConsole(value);
        setUserDisplaySettings('filterByVideoGameConsole', value);
    };

    const [filterByVideoGameFormat, setFilterByVideoGameFormat] = useState(filterState.filterByVideoGameFormat);
    const handleVideoGameFormatChange = e => {
        const value = e.target.value;
        setFilterByVideoGameFormat(value);
        setUserDisplaySettings('filterByVideoGameFormat', value);
    };

    const [filterByVideoGameSeries, setFilterByVideoGameSeries] = useState(filterState.filterByVideoGameSeries);
    const handleVideoGameSeriesChange = e => {
        const value = e.target.value;
        setFilterByVideoGameSeries(value);
        setUserDisplaySettings('filterByVideoGameSeries', value);
    };

    const [filterByVideoGameType, setFilterByVideoGameType] = useState(filterState.filterByVideoGameType);
    const handleVideoGameTypeChange = e => {
        const value = e.target.value;
        setFilterByVideoGameType(value);
        setUserDisplaySettings('filterByVideoGameType', value);
    };

    const [filterByYear, setFilterByYear] = useState(filterState.setFilterByYear);
    const handleYearChange = e => {
        const value = e.target.value;
        setFilterByYear(value);
        setUserDisplaySettings('setFilterByYear', value);
    };

    const [sortingAttribute, setSortingAttribute] = useState(filterState.sortingAttribute);
    const handleSortingChange = e => {
        let value = null;
        if (e.target.value) value = camelCase(e.target.value);
        setSortingAttribute(value);
        setUserDisplaySettings('sortingAttribute', value);
    };

    const handleClearFilters = () => {
        setFilterByVideoGameConsole(null);
        setFilterByVideoGameFormat(null);
        setFilterByVideoGameSeries(null);
        setFilterByVideoGameType(null);
        setFilterByYear(null);
        setSortingAttribute();
        clearUserDisplaySettings();
    };

    const [initialState] = useState(props);
    useEffect(() => {
        
        if(isProduction) {
            if(videoGameList.length === 0){
                const catalogRef = CatalogApi.read(VIDEO_GAMES);
                onValue(catalogRef, snapshot => {
                    const snapshotValue = snapshot.val();
                    if (snapshotValue) {
                        setVideoGameData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(snapshotValue, 'id'));
                    }
                });
            }

            if (loggedIn) {
                const userRef = UserApi.read(id, VIDEO_GAMES);
                onValue(userRef, snapshot => {
                    const snapshotValue = snapshot.val();
                    if (snapshotValue) {
                        setUserData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(snapshotValue, 'ownedId'));
                    }
                });
            }


        } else {
            if(videoGameList.length === 0){
                setVideoGameData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(CatalogData.VideoGames, 'id'));
            }
            setUserData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(usersData.VideoGames, 'ownedId'));
        }

    }, [initialState, setVideoGameData, helperData, id, loggedIn, setUserData, videoGameList.length]);

    const massageList = () => {
        let mergedList = videoGameList && userList ? RecordUtils.mergeTwoArraysByAttribute(videoGameList, 'id', userList, 'catalogId') : videoGameList;
        if (filterByInputName) mergedList = mergedList.filter(el => {
            return el.name.toLowerCase().includes(filterByInputName.toLowerCase())
                || (el.videoGameSeries && el.videoGameSeries.toLowerCase().includes(filterByInputName.toLowerCase()));
        });
        if (filterByMyCollection) mergedList = mergedList.filter(el => el.owned === true);
        if (filterByVideoGameConsole) mergedList = mergedList.filter(el => el.videoGameConsole.includes(filterByVideoGameConsole));
        if (filterByVideoGameFormat) mergedList = mergedList.filter(el => el.videoGameFormat === filterByVideoGameFormat);
        if (filterByVideoGameSeries) mergedList = mergedList.filter(el => el.videoGameSeries === filterByVideoGameSeries);
        if (filterByVideoGameType) mergedList = mergedList.filter(el => el.videoGameType === filterByVideoGameType);
        if (filterByYear) mergedList = mergedList.filter(el => parseInt(el.year) === filterByYear);
        
        if (sortingAttribute) {
            return SortingUtils.sortDataByAttributeAsc(mergedList, sortingAttribute);
        } else {
            return SortingUtils.sortDataByAttributeDesc(mergedList, 'year');
        }
    };

    const displayList = massageList();

    const GAP_SIZE = 10;
    const CARD_HEIGHT = 460;
    const CARD_WIDTH = 300;

    const myCollectionButton =  <MyCollectionButton
        isTablet={screenSize.isTablet}
        filterByMyCollection={!filterByMyCollection}
        handleMyCollectionChange={handleMyCollectionChange}
    />;

    const filterButton = <ActionButton
        icon={<FilterListIcon />}
        onClick={openModal}
        color={Color.black()}
    />;

    const buildFilter = (key, menuList, onChange, value) => {
        return <Grid item md={4} xs={12} >
            <FormFilter
                key={key}
                menuList={menuList}
                onChange={onChange}
                label={key}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={value}
            />
        </Grid>;
    };

    const filteribleYears = videoGameList.map(v => parseInt(v.year)).sort();
    let videoGameConsoleFilterComp,
        videoGameFormatFilterComp, 
        videoGameSeriesFilterComp,
        videoGameTypeFilterComp,
        yearFilter;
    let sortingAttibuteFilter;
    const formattedSortingAttribute = sortingAttribute ? capatilizeString(sortingAttribute) : sortingAttribute;

    const buildFilters = () => {
        if (Object.keys(helperData).length !== 0) {
            const { videoGameConsole, videoGameFormat, videoGameSeries, videoGameType } = helperData;
            videoGameConsoleFilterComp = buildFilter(NEW_VIDEO_GAME_FORM.LABELS.CONSOLE.KEY, videoGameConsole.values, handleVideoGameConsoleChange, filterByVideoGameConsole);
            videoGameFormatFilterComp = buildFilter(NEW_VIDEO_GAME_FORM.LABELS.VIDEO_GAME_FORMAT.KEY, videoGameFormat.values, handleVideoGameFormatChange, filterByVideoGameFormat);
            videoGameSeriesFilterComp = buildFilter(NEW_VIDEO_GAME_FORM.LABELS.VIDEO_GAME_SERIES.KEY, videoGameSeries.values, handleVideoGameSeriesChange, filterByVideoGameSeries);
            videoGameTypeFilterComp = buildFilter(NEW_VIDEO_GAME_FORM.LABELS.VIDEO_GAME_TYPE.KEY, videoGameType.values, handleVideoGameTypeChange, filterByVideoGameType);
            yearFilter = buildFilter(NEW_VIDEO_GAME_FORM.LABELS.YEAR.KEY, filteribleYears, handleYearChange, filterByYear);

            sortingAttibuteFilter = buildFilter(GENERAL_FILTER_MODAL.LABELS.SORTING, 
                [
                    NEW_VIDEO_GAME_FORM.LABELS.NAME.KEY, 
                    NEW_VIDEO_GAME_FORM.LABELS.VIDEO_GAME_SERIES.KEY, 
                    NEW_VIDEO_GAME_FORM.LABELS.YEAR.KEY,
                ], handleSortingChange, formattedSortingAttribute);
        }
    };
    buildFilters();

    return (
        <>
            <Container component='main' maxWidth='xl'>
                <div className={classes.root}>
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        style={modalStyles(fitlerModalSizes(screenSize))}
                    >
                        <CatalogFilter
                            closeModal={closeModal}
                            fitlerComponentSet={
                                <>
                                    {videoGameConsoleFilterComp}
                                    {videoGameFormatFilterComp}
                                    {videoGameSeriesFilterComp}
                                    {videoGameTypeFilterComp}
                                    {yearFilter}
                                </>
                            }
                            handleClearFilters={handleClearFilters}
                            isMobileDevice={screenSize.isMobileDevice}
                            sortComponent={sortingAttibuteFilter}
                        />
                    </Modal>
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
                            justifyContent='space-around'
                            spacing={1}
                            xs={12}
                            md={6}
                            className={classes.viewFilters}
                        >
                            {myCollectionButton}
                            {filterButton}
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
    root: {
        flexGrow: 1,
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
        marginTop: theme.spacing(1.25),
        marginBottom: theme.spacing(1),
    },
    fitlerContainer: {
        padding: theme.spacing(2),
    },
    modelHeaderContainer: {
        marginLeft: theme.spacing(3),
        fontWeight: 'bold',
    },
    container: {
        marginTop: theme.spacing(2),
    },
}));

VideoGameCatalog.propTypes = {
    clearUserDisplaySettings: PropTypes.func.isRequired,
    helperData: PropTypes.object.isRequired,
    setUserData: PropTypes.func.isRequired,
    setUserDisplaySettings: PropTypes.func.isRequired,
    setVideoGameData: PropTypes.func.isRequired,
    videoGameList: PropTypes.array.isRequired,
};
