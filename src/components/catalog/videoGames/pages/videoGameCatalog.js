/* eslint-disable react/prop-types */
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import { UserConsumer } from 'components/auth/authContext';
import { VideoGameCard } from 'components/catalog/videoGames/cards/videoGameCard';
import { ActionButton } from 'components/common/buttons/actionButton';
import { MyCollectionButton } from 'components/common/buttons/myCollectionButton';
import { SearchBar } from 'components/common/searchBar';
import { Viewport } from 'components/common/viewport/viewport';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Color } from 'shared/styles/color';
import { fitlerModalSizes, modalStyles } from 'shared/styles/modalStyles';
import { initialVideoGameFilter } from 'store/initialState';
import { VideoGameHelper } from 'components/catalog/videoGames/videoGameHelper';
import { VideoGameFilter } from 'components/catalog/videoGames/videoGameFilter';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { PAGES } from 'shared/constants/stringConstantsSelectors';

const { HOME } = ROUTE_CONSTANTS;

export const VideoGameCatalog = props => {
    const classes = useStyles();
    const { clearUserDisplaySettings, helperData, screenSize, setUserData, setUserDisplaySettings, setVideoGameData, userList, videoGameList } = props;

    const { id, loggedIn } = useContext(UserConsumer);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(!isModalOpen);

    const [fitlerCriteria, setFitlerCriteria] = useState(initialVideoGameFilter);
    const handleFilterChange = filter => e => {
        const value = e.target.value;
        fitlerCriteria[filter] = value;

        if (filter === 'search') {
            setTimeout(setFitlerCriteria(fitlerCriteria), 500);
        } else {
            setFitlerCriteria(fitlerCriteria);
        }

        setUserDisplaySettings(fitlerCriteria);
    };

    const [filterByMyCollection, setFilterByMyCollection] = useState(false);
    const handleMyCollectionChange = () => {
        setFilterByMyCollection(!filterByMyCollection);
    };

    const handleClearFilters = () => {
        setFitlerCriteria({
            videoGameConsole: null,
            videoGameFormat: null,
            videoGameSeries: null,
            videoGameType: null,
            year: null,
            sorting: null,
        });
        clearUserDisplaySettings();
    };

    const [initialState] = useState(props);
    useEffect(() => {
        const isVideoGameListLoaded = videoGameList.length !== 0;
        VideoGameHelper.getCatalog(isVideoGameListLoaded, loggedIn, id, setVideoGameData, setUserData);
    }, [initialState, setVideoGameData, helperData, id, loggedIn, setUserData, videoGameList]);

    const displayList = () => VideoGameHelper.filterCatalog(videoGameList, userList, fitlerCriteria, filterByMyCollection);

    const GAP_SIZE = 10;
    const CARD_HEIGHT = 460;
    const CARD_WIDTH = 300;

    return (
        <>
            <CommonBreadCrumbs 
                links={[{ route: HOME,title: PAGES.HOME_PAGE.TITLE }]}
                currentTitle={PAGES.VIDEO_GAME_CATALOG.TITLE}
            />
            <Container component='main' maxWidth='xl'>
                <div className={classes.root}>
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        style={modalStyles(fitlerModalSizes(screenSize))}
                    >
                        <VideoGameFilter
                            closeModal={closeModal}
                            fitlerCriteria={fitlerCriteria}
                            filteribleYears={[...new Set(videoGameList.map(v => v.year).sort())]}
                            handleClearFilters={handleClearFilters}
                            handleFilterChange={handleFilterChange}
                            helperData={helperData}
                            isMobileDevice={screenSize.isMobileDevice}
                        />
                    </Modal>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6} className={classes.alwaysDisplayed}>
                            <SearchBar 
                                filterByInputText={fitlerCriteria['search']}
                                handleInputTextChange={handleFilterChange('search')}
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
                            <MyCollectionButton
                                isTablet={screenSize.isTablet}
                                filterByMyCollection={!filterByMyCollection}
                                handleMyCollectionChange={handleMyCollectionChange}
                            />
                            <ActionButton
                                icon={<FilterListIcon />}
                                onClick={openModal}
                                color={Color.black()}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
            <Viewport 
                CardComponent={VideoGameCard} 
                displayList={displayList()} 
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
