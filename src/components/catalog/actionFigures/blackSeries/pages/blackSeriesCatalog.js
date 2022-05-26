import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import ClearIcon from '@material-ui/icons/Clear';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import FilterListIcon from '@material-ui/icons/FilterList';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import SaveIcon from '@material-ui/icons/Save';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';
import { UserConsumer } from 'components/auth/authContext';
import { BlackSeriesItemCard } from 'components/catalog/actionFigures/blackSeries/cards/viewportCard/blackSeriesItemCard';
import { TableStats } from 'components/catalog/actionFigures/blackSeries/tableStats';
import { ActionButton } from 'components/common/buttons/actionButton';
import { CustomCheckbox } from 'components/common/buttons/customCheckbox';
import { convertArrayObjectToArrayOfObjectProperty } from 'components/common/form/formatFormData';
import { FormFilter } from 'components/common/form/formFilter';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import { SearchBar } from 'components/common/searchBar';
import { generateStatsBasedOnSource } from 'components/common/stats/stats';
import { Viewport } from 'components/common/viewport/viewport';
import camelCase from 'lodash/camelCase';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { CatalogApi } from 'shared/api/catalogApi';
import { UserApi } from 'shared/api/userApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { BS_CATALOG, BS_DISPLAY_MODAL, NEW_COLLECTION_FORM_LABELS } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { fitlerModalSizes, modalStyles } from 'shared/styles/modalStyles';
import { isProduction } from 'shared/util/environment';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';
import { reverseCamelCase } from 'shared/util/stringUtil';
import catalogDataFile from 'shared/fixtures/catalogData.json';
import userDataFile from 'shared/fixtures/userData.json';

const { CatalogData } = catalogDataFile;
const { usersData } = userDataFile;

const { ACTION_FIGURES } = FB_DB_CONSTANTS;

export const BlackSeriesCatalog = props => {
    const { id, loggedIn } = useContext(UserConsumer);
    const classes = useStyles();
    const { helperData, catalogList, setCatalogData, userList, setUserData, screenSize, setUserDisplaySettings, clearUserDisplaySettings, filterState } = props;
    
    const [filterBySourceMaterial, setFilterBySourceMaterial] = useState(filterState.filterBySourceMaterial);
    const handleSourceMaterialChange = e => {
        const value = e.target.value;
        setFilterBySourceMaterial(value);
        setUserDisplaySettings('filterBySourceMaterial', value);
    };

    const [filterByCharacter, setFilterByCharacter] = useState(filterState.filterByCharacter);
    const handleCharacterChange = e => {
        const value = e.target.value;
        setFilterByCharacter(value);
        setUserDisplaySettings('filterByCharacter', value);
    };

    const [filterByInputName, setFilterByInputName] = useState(filterState.filterByInputName);
    const handleInputNameChange = e => {
        if (e.target) {
            const { value } = e.target;
            setTimeout(setFilterByInputName(value), 500);
            setTimeout(setUserDisplaySettings('filterByInputName', value), 500);
        }
    };

    const [filterByGroup, setFilterByGroup] = useState(filterState.filterByGroup);
    const handleGroupChange = e => {
        const value = e.target.value;
        setFilterByGroup(value);
        setUserDisplaySettings('filterByGroup', value);
    };

    const [filterByVersion, setFilterByVersion] = useState(filterState.filterByVersion);
    const handleVersionChange = e => {
        const value = e.target.value;
        setFilterByVersion(value);
        setUserDisplaySettings('filterByVersion', value);
    };

    const [filterByAssortment, setFilterByAssortment] = useState(filterState.filterByAssortment);
    const handleAssortmentChange = e => {
        const value = e.target.value;
        setFilterByAssortment(value);
        setUserDisplaySettings('filterByAssortment', value);
    };

    const [filterByYear, setFilterByYear] = useState(filterState.filterByYear);
    const handleYearChange = e => {
        const value = e.target.value;
        setFilterByYear(value);
        setUserDisplaySettings('filterByYear', value);
    };

    const [filterBySourceType, setFilterBySourceType] = useState(filterState.filterBySourceType);
    const handleSourceTypeChange = e => {
        const value = e.target.value;
        setFilterBySourceType(value);
        setUserDisplaySettings('filterBySourceType', value);
    };

    const [filterByPackageType, setFilterByPackageType] = useState(filterState.filterByPackageType);
    const handlePackageTypeChange = e => {
        const value = e.target.value;
        setFilterByPackageType(value);
        setUserDisplaySettings('filterByPackageType', value);
    };

    const [filterBySeries, setFilterBySeries] = useState(filterState.filterBySeries);
    const handleSeriesChange = e => {
        const value = e.target.value;
        setFilterBySeries(value);
        setUserDisplaySettings('filterBySeries', value);
    };

    const defaultNewBoxImage = filterState.figureSizeSmall === undefined ? screenSize.isMobileDevice : filterState.figureSizeSmall;
    const [newBoxImage, setNewBoxImage] = useState(defaultNewBoxImage);
    const handleImageChange = () => {
        setNewBoxImage(!newBoxImage);
        setUserDisplaySettings('newBoxImage', !newBoxImage);
    };

    const defaultFigureSizeSmall = filterState.figureSizeSmall === undefined ? screenSize.isMobileDevice : filterState.figureSizeSmall;
    const [figureSizeSmall, setFigureSizeSmall] = useState(defaultFigureSizeSmall);
    const handlefigureSizeSmallChange = () => {
        setFigureSizeSmall(!figureSizeSmall);
        setUserDisplaySettings('figureSizeSmall', !figureSizeSmall);
    };

    const [sortingAttribute, setSortingAttribute] = useState(filterState.sortingAttribute);
    const handleSortingChange = e => {
        let value = null;
        if (e.target.value) value = camelCase(e.target.value);
        setSortingAttribute(value);
        setUserDisplaySettings('sortingAttribute', value);
    };

    const [viewAllFigures, setViewAllFigures] = useState(filterState.viewAllFigures);
    const [viewOnlyOwnedFigures, setViewOnlyOwnedFigures] = useState(filterState.viewOnlyOwnedFigures);
    const [viewOnlyUnownedFigures, setViewOnlyUnownedFigures] = useState(filterState.viewOnlyUnownedFigures);

    const handleViewAllFiguresCheckBoxChange = () => {
        if (!viewAllFigures) {
            callSetViewOnlyOwnedFigures(false);
            callSetViewOnlyUnownedFigures(false);
        }
        callSetViewAllFigures(!viewAllFigures);
    };

    const handleOwnedFiguresCheckBoxChange = () => {
        if (!viewOnlyOwnedFigures) {
            callSetViewAllFigures(false);
            callSetViewOnlyUnownedFigures(false);
        }
        callSetViewOnlyOwnedFigures(!viewOnlyOwnedFigures);
    };

    const handleUnownedFiguresCheckBoxChange = () => {
        if (!viewOnlyUnownedFigures) {
            callSetViewAllFigures(false);
            callSetViewOnlyOwnedFigures(false);
        }
        callSetViewOnlyUnownedFigures(!viewOnlyUnownedFigures);
    };

    const callSetViewAllFigures = value => {
        setViewAllFigures(value);
        setUserDisplaySettings('viewAllFigures', value);
    };

    const callSetViewOnlyOwnedFigures = value => {
        setViewOnlyOwnedFigures(value);
        setUserDisplaySettings('viewOnlyOwnedFigures', value);
    };

    const callSetViewOnlyUnownedFigures = value => {
        setViewOnlyUnownedFigures(value);
        setUserDisplaySettings('viewOnlyUnownedFigures', value);
    };

    const [viewRecent, setViewRecent] = useState(filterState.viewRecent);
    const handleViewRecentChange = () => {
        setViewRecent(!viewRecent);
        setUserDisplaySettings('viewRecent', !viewRecent);
    };

    const inputLabel = useRef(null);
    const [labelWidth] = useState(0);

    const handleClearFilters = () => {
        setFilterBySourceMaterial(null);
        setFilterByCharacter(null);
        setFilterByGroup(null);
        setFilterByVersion(null);
        setFilterByAssortment(null);
        setNewBoxImage(false);
        setFilterByYear(null);
        setFilterByPackageType(null);
        setFilterBySeries(null);
        setFilterBySourceType(null);

        setViewAllFigures(true);
        setViewOnlyOwnedFigures(false);
        setViewOnlyUnownedFigures(false);
        setSortingAttribute();

        setViewRecent(false);
        
        clearUserDisplaySettings();
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(!isModalOpen);
    
    const modalSize = () => {
        if(screenSize.isLargeDesktopOrLaptop){
            return { height: '75%', width: '50%' };
        } else if (screenSize.isMediumDesktopOrLaptop) {
            return { height: '80%', width: '50%' };
        } else {
            return { height: '60%', width: '95%' };
        }
    };

    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

    const openStatsModal = () => setIsStatsModalOpen(!isStatsModalOpen);
    const closeStatsModal = () => setIsStatsModalOpen(!isStatsModalOpen);

    const [readyToRender, setReadyToRender] = useState(false);
    const [initialState] = useState(props);
    useEffect(() => {
        
        if(isProduction) {
            const catalogRef = CatalogApi.read(`${ACTION_FIGURES.BLACK_SERIES}`);
            catalogRef.once('value').then((snapshot => {
                if (snapshot.val()) {
                    setCatalogData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(snapshot.val(), 'id'));
                    setReadyToRender(true);
                }
            }));
    
            if (loggedIn) {
                const userRef = UserApi.read(id, `${ACTION_FIGURES.BLACK_SERIES}`);
                userRef.once('value').then((snapshot => {
                    if (snapshot.val()) {
                        setUserData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(snapshot.val(), 'ownedId'));
                    }
                }));
            }
        } else {
            setCatalogData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(CatalogData.ActionFigures.BlackSeries6, 'id'));
            setUserData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(usersData.ActionFigures.BlackSeries6, 'ownedId'));
            setReadyToRender(true);
        }

    }, [initialState, setCatalogData, setUserData, id, loggedIn, helperData, catalogList.length]);

    const massageList = () => {
        let mergedList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : catalogList;

        if(viewRecent) {
            mergedList = mergedList.filter(el => el.createdDate ? true : false);
            return SortingUtils.sortDateDescending(mergedList).slice(0, 50);
        }

        if (!viewAllFigures) {
            if (viewOnlyOwnedFigures) mergedList = mergedList.filter(el => el.owned === true);
            if (viewOnlyUnownedFigures) mergedList = mergedList.filter(el => el.owned !== true);
        }

        if (filterBySourceMaterial) mergedList = mergedList.filter(el => el.sourceMaterial === filterBySourceMaterial);
        if (filterByCharacter) mergedList = mergedList.filter(el => el.name === filterByCharacter);
        if (filterByInputName) mergedList = mergedList.filter(el => {
            return el.name.toLowerCase().includes(filterByInputName.toLowerCase())
                || el.additionalNameDetails.toLowerCase().includes(filterByInputName.toLowerCase());
        });
        if (filterByGroup) mergedList = mergedList.filter(el => el.groups.includes(filterByGroup));
        if (filterByVersion) mergedList = mergedList.filter(el => el.version === filterByVersion);
        if (filterByAssortment) mergedList = mergedList.filter(el => el.assortment === filterByAssortment);
        if (filterBySourceType) mergedList = mergedList.filter(el => el.sourceType === filterBySourceType);
        if (filterBySeries) mergedList = mergedList.filter(el => el.series === filterBySeries);
        if (filterByYear) mergedList = mergedList.filter(el => parseInt(el.year) === filterByYear);
        if (filterByPackageType) {
            if (filterByPackageType === 'Standard Box') {
                mergedList = mergedList.filter(el => el.packageType === undefined);
            } else {
                mergedList = mergedList.filter(el => el.packageType === filterByPackageType);
            }
        }
        if (sortingAttribute) {
            if (sortingAttribute === 'seriesNumber') {
                return SortingUtils.sortDataByStringIntAsc(mergedList, sortingAttribute);
            } else {
                return SortingUtils.sortDataByAttributeAsc(mergedList, sortingAttribute);
            }
        } else {
            return SortingUtils.sortDataByAttributeAsc(SortingUtils.sortDataByAttributeDesc(mergedList, 'year'), 'name');
        }
    };

    const displayList = massageList();

    const filteribleYears = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];
    let assortmentFilterComp,
        characterFilterComp, 
        groupFilterComp,
        packageTypeFilterComp,
        seriesFilterComp,
        sourceMaterialFilterComp,
        sourceTypeFilterComp,
        versionFilterComp, 
        yearFilter;

    let sortingAttibuteFilter;

    const buildFilter = (key, menuList, onChange, value) => {
        return <FormFilter
            key={key}
            menuList={menuList}
            onChange={onChange}
            label={key}
            inputLabel={inputLabel}
            labelWidth={labelWidth}
            value={value}
        />;
    };

    const formattedSortingAttribute = sortingAttribute ? reverseCamelCase(sortingAttribute) : sortingAttribute;
    const buildFilters = () => {
        if (Object.keys(helperData).length !== 0) {
            const { assortment, characters, groups, packageType, series, sourceMaterial, sourceType, version } = helperData;
            const formattedSourceMaterial = convertArrayObjectToArrayOfObjectProperty(sourceMaterial, NEW_COLLECTION_FORM_LABELS.NAME.VALUE);
            const formattedAssortment = convertArrayObjectToArrayOfObjectProperty(assortment, NEW_COLLECTION_FORM_LABELS.NAME.VALUE);

            assortmentFilterComp = buildFilter(NEW_COLLECTION_FORM_LABELS.ASSORTMENT.KEY, formattedAssortment, handleAssortmentChange, filterByAssortment);
            characterFilterComp = buildFilter(BS_DISPLAY_MODAL.LABELS.CHARACTERS, characters.values, handleCharacterChange, filterByCharacter);
            groupFilterComp = buildFilter(BS_DISPLAY_MODAL.LABELS.GROUPS, groups.values, handleGroupChange, filterByGroup);
            packageTypeFilterComp = buildFilter(NEW_COLLECTION_FORM_LABELS.PACKAGE_TYPE.KEY, packageType.values, handlePackageTypeChange, filterByPackageType);
            seriesFilterComp = buildFilter(NEW_COLLECTION_FORM_LABELS.SERIES.KEY, series.values, handleSeriesChange, filterBySeries);
            sourceMaterialFilterComp = buildFilter(NEW_COLLECTION_FORM_LABELS.SOURCE_MATERIAL.KEY, formattedSourceMaterial, handleSourceMaterialChange, filterBySourceMaterial);
            sourceTypeFilterComp = buildFilter(NEW_COLLECTION_FORM_LABELS.SOURCE_TYPE.KEY, sourceType.values, handleSourceTypeChange, filterBySourceType);
            versionFilterComp = buildFilter(NEW_COLLECTION_FORM_LABELS.VERSIONS.KEY, version.values, handleVersionChange, filterByVersion);
            yearFilter = buildFilter(NEW_COLLECTION_FORM_LABELS.YEAR.KEY, filteribleYears, handleYearChange, filterByYear);

            sortingAttibuteFilter = buildFilter(BS_DISPLAY_MODAL.LABELS.SORTING, 
                [
                    NEW_COLLECTION_FORM_LABELS.NAME.KEY, 
                    NEW_COLLECTION_FORM_LABELS.SERIES_NUMBER.KEY, 
                    NEW_COLLECTION_FORM_LABELS.SOURCE_MATERIAL.KEY, 
                    NEW_COLLECTION_FORM_LABELS.YEAR.KEY,
                ], handleSortingChange, formattedSortingAttribute);
        }
    };
    buildFilters();

    const generateCheckBoxForm = (state, handleChange, labelText) => {
        return <div className={classes.checkBoxContainer}>
            <FormControlLabel
                control={<CustomCheckbox
                    checked={state}
                    onChange={handleChange}
                />}
                label={labelText}
                labelPlacement='start'
            />
        </div>;
    };

    const allViewCheckBox = generateCheckBoxForm(viewAllFigures, handleViewAllFiguresCheckBoxChange, BS_DISPLAY_MODAL.LABELS.VIEW_ALL);
    const ownedCheckBox = generateCheckBoxForm(viewOnlyOwnedFigures, handleOwnedFiguresCheckBoxChange, BS_DISPLAY_MODAL.LABELS.OWNED);
    const unownedCheckBox = generateCheckBoxForm(viewOnlyUnownedFigures, handleUnownedFiguresCheckBoxChange, BS_DISPLAY_MODAL.LABELS.NOT_OWNED);
    const stats = generateStatsBasedOnSource(displayList, helperData.sourceMaterial, NEW_COLLECTION_FORM_LABELS.SOURCE_MATERIAL.VALUE);

    const filterButton = <ActionButton
        icon={<FilterListIcon />}
        onClick={openModal}
        color={Color.black()}
    />;

    const statsButton = <ActionButton
        icon={<BarChartIcon />}
        onClick={openStatsModal}
        color={Color.blue()}
    />;

    const newlyAddedButton = <ActionButton
        buttonLabel={screenSize.isTablet ? null : !viewRecent ? BS_CATALOG.BUTTON.RECENT : BS_CATALOG.BUTTON.ALL}
        icon={!viewRecent ? <NewReleasesIcon /> : <ViewComfyIcon />}
        onClick={handleViewRecentChange}
        color={Color.green()}
        disabled={viewOnlyOwnedFigures}
    />;

    const myCollectionButton = <ActionButton
        buttonLabel={screenSize.isTablet ? null : !viewOnlyOwnedFigures ? 'My Collection' : BS_CATALOG.BUTTON.ALL}
        icon={!viewOnlyOwnedFigures ? <CollectionsBookmarkIcon /> : <ViewComfyIcon />}
        onClick={handleOwnedFiguresCheckBoxChange}
        color={Color.green()}
        disabled={viewRecent}
    />;

    const GAP_SIZE = figureSizeSmall ? 5 : 20;
    const CARD_HEIGHT = figureSizeSmall ? 200 : 500;
    const CARD_WIDTH = figureSizeSmall ? 75 : 200;

    return (
        <>
            <Container component='main' maxWidth='xl'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Modal
                            isOpen={isStatsModalOpen}
                            onRequestClose={closeStatsModal}
                            style={modalStyles(modalSize())}
                        >
                            <div className={classes.modalClose}>
                                <div 
                                    className={classes.modalCloseBtn}
                                    onClick={closeStatsModal}
                                >
                                    <ClearIcon />
                                </div>
                            </div>
                            <Grid item xs={12} className={classes.tableStats}>
                                <TableStats stats={stats} />
                            </Grid>
                        </Modal>
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            style={modalStyles(fitlerModalSizes(screenSize))}
                        >
                            <div className={classes.fitlerRoot}>
                                <FormHeaderSection text={BS_DISPLAY_MODAL.HEADER} textColor={'white'} />
                                <Grid container spacing={1} className={classes.fitlerContainer}>
                                    <Grid item xs={12}>
                                        <div className={classes.modelHeaderContainer}>
                                            {BS_DISPLAY_MODAL.LABELS.FILTER}
                                        </div>
                                    </Grid>
                                    <Grid item md={4} xs={12}>{sourceMaterialFilterComp}</Grid>
                                    <Grid item md={4} xs={12}>{characterFilterComp}</Grid>
                                    <Grid item md={4} xs={12}>{groupFilterComp}</Grid>
                                    <Grid item md={4} xs={12}>{sourceTypeFilterComp}</Grid>
                                    <Grid item md={4} xs={12}>{seriesFilterComp}</Grid>
                                    <Grid item md={4} xs={12}>{assortmentFilterComp}</Grid>
                                    <Grid item md={4} xs={12}>{yearFilter}</Grid>
                                    <Grid item md={4} xs={12}>{versionFilterComp}</Grid>
                                    <Grid item md={4} xs={12}>{packageTypeFilterComp}</Grid>
                                    
                                    <Grid item md={4} xs={12}>{allViewCheckBox}</Grid>
                                    <Grid item md={4} xs={12}>{ownedCheckBox}</Grid>
                                    <Grid item md={4} xs={12}>{unownedCheckBox}</Grid>
                                    <Grid item md={4} xs={12}>
                                        <div className={classes.modelHeaderContainer}>
                                            {BS_DISPLAY_MODAL.LABELS.SORT}
                                        </div>
                                        {sortingAttibuteFilter}
                                    </Grid>
                                    <Grid item md={8} xs={12}>
                                        <div className={classes.modelHeaderContainer}>
                                            {BS_DISPLAY_MODAL.LABELS.DISPLAY}
                                        </div>
                                        <div className={classes.container}>
                                            <ActionButton
                                                buttonLabel={newBoxImage 
                                                    ? BS_DISPLAY_MODAL.BUTTONS.OUT_OF_BOX 
                                                    : BS_DISPLAY_MODAL.BUTTONS.IN_BOX
                                                }
                                                icon={<SwapHorizIcon />}
                                                onClick={handleImageChange}
                                                color={Color.black()}
                                            />
                                            <ActionButton
                                                buttonLabel={figureSizeSmall 
                                                    ? BS_DISPLAY_MODAL.BUTTONS.LARGE_FIGURE
                                                    : BS_DISPLAY_MODAL.BUTTONS.SMALL_FIGURE
                                                }
                                                icon={<SwapHorizIcon />}
                                                onClick={handlefigureSizeSmallChange}
                                                color={Color.green()}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={classes.container}>
                                            <ActionButton
                                                buttonLabel={BS_DISPLAY_MODAL.BUTTONS.CLOSE}
                                                icon={<SaveIcon />}
                                                onClick={closeModal}
                                                color={Color.blue()}
                                            />
                                            <ActionButton
                                                buttonLabel={BS_DISPLAY_MODAL.BUTTONS.CLEAR}
                                                icon={<ClearIcon />}
                                                onClick={handleClearFilters}
                                                color={Color.red()}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Modal>
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
                            {newlyAddedButton}
                            {statsButton}
                            {filterButton}
                        </Grid>
                    </Grid>
                </div>
            </Container>
            {readyToRender && 
                <Viewport
                    CardComponent={BlackSeriesItemCard} 
                    displayList={displayList} 
                    CARD_HEIGHT={CARD_HEIGHT} 
                    CARD_WIDTH={CARD_WIDTH} 
                    GAP_SIZE={GAP_SIZE}
                    other={{
                        assortments: helperData.assortment,
                        catalogList: catalogList,
                        newBoxImage: newBoxImage,
                        smallFigureView: figureSizeSmall,
                        sourceMaterials: helperData.sourceMaterial,
                        view: true,
                    }}
                />
            }
        </>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    fitlerContainer: {
        padding: theme.spacing(2),
    },
    modalClose: {
        backgroundColor: Color.black(),
        color: Color.white(),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    modalCloseBtn:{
        '&:hover': {
            cursor: 'pointer',
        },
    },
    tableStats: {
        marginTop: '-3%',
    },
    grid: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    newEntryButtonModal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(1),
    },
    alwaysDisplayed: {
        marginTop: theme.spacing(.35),
        marginBottom: theme.spacing(1),
    },
    viewFilters: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 225,
    },
    inputBoxInColumn: {
        marginBottom: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(0),
        minWidth: 225,
        backgroundColor: Color.white(),
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: Color.white(),
        '&:hover': {
            borderColor: Color.black(),
        },
        marginTop: theme.spacing(1),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        border: '1px solid',
        borderColor: Color.grey(),
        cursor: 'pointer',
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        height: 30,
        width: '75%',
        [theme.breakpoints.up('md')]: {
            paddingLeft: '8%',
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '15%',
        },
    },
    statsButton: {
        margin: theme.spacing(5),
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
    modelHeaderContainer: {
        marginLeft: theme.spacing(3),
        fontWeight: 'bold',
    },
    checkBoxContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

BlackSeriesCatalog.propTypes = {
    catalogList: PropTypes.array.isRequired,
    helperData: PropTypes.object.isRequired,
    setCatalogData: PropTypes.func.isRequired,
    screenSize: PropTypes.object.isRequired,
    setUserData: PropTypes.func.isRequired,
    userList: PropTypes.array.isRequired,
    setUserDisplaySettings: PropTypes.func.isRequired,
    clearUserDisplaySettings: PropTypes.func.isRequired,
    filterState: PropTypes.object.isRequired,
};
