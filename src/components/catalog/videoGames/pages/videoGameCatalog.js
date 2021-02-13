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
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { CatalogApi } from 'shared/api/catalogApi';
import { UserApi } from 'shared/api/userApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { NEW_VIDEO_GAME_FORM, GENERAL_FILTER_MODAL } from 'shared/constants/stringConstantsSelectors';
import { CatalogData } from 'shared/fixtures/catalogData';
import { usersData } from 'shared/fixtures/userData';
import { Color } from 'shared/styles/color';
import { modalStyles, fitlerModalSizes } from 'shared/styles/modalStyles';
import { isProduction } from 'shared/util/environment';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';
import camelCase from 'lodash/camelCase';

const { VIDEO_GAMES } = FB_DB_CONSTANTS;

export const VideoGameCatalog = props => {
    const classes = useStyles();
    const { helperData, screenSize, setUserData, setVideoGameData, userList, videoGameList } = props;

    const { id, loggedIn } = useContext(UserConsumer);
    
    const inputLabel = useRef(null);
    const [labelWidth] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(!isModalOpen);

    const [filterByInputName, setFilterByInputName] = useState();
    const handleInputNameChange = e => {
        if (e.target) {
            const { value } = e.target;
            setTimeout(setFilterByInputName(value), 500);
        }
    };

    const [filterByMyCollection, setFilterByMyCollection] = useState(false);
    const handleMyCollectionChange = () => setFilterByMyCollection(!filterByMyCollection);

    const [filterByVideoGameConsole, setFilterByVideoGameConsole] = useState();
    const handleVideoGameConsoleChange = e => {
        const value = e.target.value;
        setFilterByVideoGameConsole(value);
    };

    const [filterByVideoGameFormat, setFilterByVideoGameFormat] = useState();
    const handleVideoGameFormatChange = e => {
        const value = e.target.value;
        setFilterByVideoGameFormat(value);
    };

    const [filterByVideoGameSeries, setFilterByVideoGameSeries] = useState();
    const handleVideoGameSeriesChange = e => {
        const value = e.target.value;
        setFilterByVideoGameSeries(value);
    };

    const [filterByVideoGameType, setFilterByVideoGameType] = useState();
    const handleVideoGameTypeChange = e => {
        const value = e.target.value;
        setFilterByVideoGameType(value);
    };

    const [filterByYear, setFilterByYear] = useState();
    const handleYearChange = e => {
        const value = e.target.value;
        setFilterByYear(value);
    };

    const [sortingAttribute, setSortingAttribute] = useState();
    const handleSortingChange = e => {
        let value = null;
        if (e.target.value) value = camelCase(e.target.value);
        setSortingAttribute(value);
    };

    const handleClearFilters = () => {
        setFilterByVideoGameConsole(null);
        setFilterByVideoGameFormat(null);
        setFilterByVideoGameSeries(null);
        setFilterByVideoGameType(null);
        setFilterByYear(null);
        setSortingAttribute();
    };


    const [initialState] = useState(props);
    useEffect(() => {
        
        if(isProduction) {
            const catalogRef = CatalogApi.read(VIDEO_GAMES);
            catalogRef.once('value').then((snapshot) => {
                if (snapshot.val()) {
                    let records = snapshot.val();
                    setVideoGameData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records, 'id'));
                }
            });

            if (loggedIn) {
                const userRef = UserApi.read(id, VIDEO_GAMES);
                userRef.once('value').then((snapshot) => {
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

    }, [initialState, setVideoGameData, helperData, id, loggedIn, setUserData]);

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
        isMobileDevice={screenSize.isMobileDevice}
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
    const formattedSortingAttribute = sortingAttribute ? sortingAttribute.charAt(0).toUpperCase() + sortingAttribute.slice(1) : sortingAttribute;

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
                            justify='space-around'
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
    videoGameList: PropTypes.array.isRequired,
    helperData: PropTypes.object.isRequired,
    setVideoGameData: PropTypes.func.isRequired,
    setUserData: PropTypes.func.isRequired,
};
