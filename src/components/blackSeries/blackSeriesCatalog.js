import { BS_CATALOG, BS_DISPLAY_MODAL, NEW_COLLECTION_FORM_LABELS } from 'shared/constants/stringConstantsSelectors';
import { CatalogApi, UserApi } from 'shared/api/orchestrator';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActionButton } from 'components/common/buttons/actionButton';
import { ActionFigure } from 'components/display/actionfigure';
import { camelCase } from 'lodash';
import ClearIcon from '@material-ui/icons/Clear';
import { Color } from 'shared/styles/color';
import Container from '@material-ui/core/Container';
import { convertArrayObjectToArrayOfObjectProperty } from 'components/common/form/formatFormData';
import { CustomCheckbox } from 'components/common/buttons/customCheckbox';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import FilterListIcon from '@material-ui/icons/FilterList';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormFilter } from 'components/common/form/formFilter';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import { generateStatsBasedOnSource } from 'components/common/stats/stats';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import { modalStyles } from 'shared/styles/modalStyles';
import PropTypes from 'prop-types';
import { RecordUtils } from 'shared/util/recordUtils';
import SearchIcon from '@material-ui/icons/Search';
import { SortingUtils } from 'shared/util/sortingUtil';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { TableStats } from 'components/blackSeries/tableStats';
import { UserConsumer } from 'components/auth/authContext';

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

    const [newBoxImage, setNewBoxImage] = useState(filterState.newBoxImage);
    const handleImageChange = () => {
        setNewBoxImage(!newBoxImage);
        setUserDisplaySettings('newBoxImage', !newBoxImage);
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

        setViewAllFigures(true);
        setViewOnlyOwnedFigures(false);
        setViewOnlyUnownedFigures(false);
        setSortingAttribute();
        
        clearUserDisplaySettings();
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(!isModalOpen);
    
    const modalSize = () => {
        if(screenSize.isLargeDesktopOrLaptop){
            return { height: '70%', width: '50%' };
        } else if (screenSize.isMediumDesktopOrLaptop) {
            return { height: '85%', width: '75%' };
        } else {
            return { height: '95%', width: '95%' };
        }
    };

    const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

    const openStatsModal = () => setIsStatsModalOpen(!isStatsModalOpen);
    const closeStatsModal = () => setIsStatsModalOpen(!isStatsModalOpen);
    const statsModalSize = { height: '75%', width: '50%' };

    const [initialState] = useState(props);
    useEffect(() => {
        const catalogRef = CatalogApi.read(`${ACTION_FIGURES.ALL}`);
        catalogRef.on('value', snapshot => {
            if (snapshot.val()) {
                let records = snapshot.val()['BlackSeries6'];
                setCatalogData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records, 'id'));
            }
        });

        if (loggedIn) {
            const userRef = UserApi.read(id, `${ACTION_FIGURES.ALL}`);
            userRef.on('value', snapshot => {
                if (snapshot.val()) {
                    let records = snapshot.val()['BlackSeries6'];
                    setUserData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records, 'ownedId'));
                }
            });
        }

    }, [initialState, setCatalogData, setUserData, id, loggedIn, helperData]);

    const massageList = () => {
        let mergedList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : catalogList;
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
        if (filterByYear) mergedList = mergedList.filter(el => parseInt(el.year) === filterByYear);

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
    let sourceMaterialFilterComp, characterFilterComp, groupFilterComp, versionFilterComp, assortmentFilterComp, sortingAttibuteFilter, yearFilter;
    const buildFilters = () => {
        if (Object.keys(helperData).length !== 0) {
            const { assortment, characters, sourceMaterial, groups, version } = helperData;
            const formattedSourceMaterial = convertArrayObjectToArrayOfObjectProperty(sourceMaterial, NEW_COLLECTION_FORM_LABELS.NAME.VALUE);
            const formattedAssortment = convertArrayObjectToArrayOfObjectProperty(assortment, NEW_COLLECTION_FORM_LABELS.NAME.VALUE);
            sourceMaterialFilterComp = <FormFilter
                key={NEW_COLLECTION_FORM_LABELS.SOURCE_MATERIAL.KEY}
                menuList={formattedSourceMaterial}
                onChange={handleSourceMaterialChange}
                label={NEW_COLLECTION_FORM_LABELS.SOURCE_MATERIAL.KEY}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterBySourceMaterial}
            />;
            characterFilterComp = <FormFilter
                key={BS_DISPLAY_MODAL.LABELS.CHARACTERS}
                menuList={characters.values}
                onChange={handleCharacterChange}
                label={BS_DISPLAY_MODAL.LABELS.CHARACTERS}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterByCharacter}
            />;
            groupFilterComp = <FormFilter
                key={BS_DISPLAY_MODAL.LABELS.GROUPS}
                menuList={groups.values}
                onChange={handleGroupChange}
                label={BS_DISPLAY_MODAL.LABELS.GROUPS}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterByGroup}
            />;
            versionFilterComp = <FormFilter
                key={NEW_COLLECTION_FORM_LABELS.VERSIONS.KEY}
                menuList={version.values}
                onChange={handleVersionChange}
                label={NEW_COLLECTION_FORM_LABELS.VERSIONS.KEY}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterByVersion}
            />;
            assortmentFilterComp = <FormFilter
                key={NEW_COLLECTION_FORM_LABELS.ASSORTMENT.KEY}
                menuList={formattedAssortment}
                onChange={handleAssortmentChange}
                label={NEW_COLLECTION_FORM_LABELS.ASSORTMENT.KEY}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterByAssortment}
            />;
            sortingAttibuteFilter = <FormFilter
                key={BS_DISPLAY_MODAL.LABELS.SORTING}
                menuList={[
                    NEW_COLLECTION_FORM_LABELS.NAME.KEY, 
                    NEW_COLLECTION_FORM_LABELS.SERIES_NUMBER.KEY, 
                    NEW_COLLECTION_FORM_LABELS.SOURCE_MATERIAL.KEY, 
                    NEW_COLLECTION_FORM_LABELS.YEAR.KEY,
                ]}
                onChange={handleSortingChange}
                label={BS_DISPLAY_MODAL.LABELS.SORTING}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={sortingAttribute}
            />;
            yearFilter = <FormFilter
                key={NEW_COLLECTION_FORM_LABELS.YEAR.KEY}
                menuList={filteribleYears}
                onChange={handleYearChange}
                label={NEW_COLLECTION_FORM_LABELS.YEAR.KEY}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterByYear}
            />;
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

    return (
        <React.Fragment>
            <Container component='main' maxWidth='xl'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Modal
                            isOpen={isStatsModalOpen}
                            onRequestClose={closeStatsModal}
                            style={modalStyles(statsModalSize)}
                        >   
                            <button onClick={closeStatsModal} style={{
                                // position: 'absolute',
                                // top: '-10px',
                                // right: '-10px',
                                margin: 0,
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                width: '23px',
                                height: '23px',
                                borderRadius: '23px',
                                backgroundColor: '#00aeef',
                                color: '#ffe300',
                                fontSize: '9px',
                                opacity: 1,
                                zIndex: 10,
                            }}>
                                x
                            </button>
                            <div className={classes.rootTest}>
                                <Grid item xs={12} className={classes.tableStats}>
                                    <TableStats stats={stats} />
                                </Grid>
                            </div>
                        </Modal>
                        <Modal
                            isOpen={isModalOpen}
                            onRequestClose={closeModal}
                            style={modalStyles(modalSize())}
                        >
                            <div className={classes.root}>
                                <FormHeaderSection text={BS_DISPLAY_MODAL.HEADER} textColor={'white'} />
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <div className={classes.modelHeaderContainer}>
                                            <h3>{BS_DISPLAY_MODAL.LABELS.FILTER}</h3>
                                        </div>
                                    </Grid>
                                    <Grid item md={4} xs={12}>{sourceMaterialFilterComp}</Grid>
                                    <Grid item md={4} xs={12}>{characterFilterComp}</Grid>
                                    <Grid item md={4} xs={12}>{groupFilterComp}</Grid>
                                    <Grid item md={4} xs={12}>{assortmentFilterComp}</Grid>
                                    <Grid item md={4} xs={12}>{versionFilterComp}</Grid>
                                    <Grid item md={4} xs={12}>{yearFilter}</Grid>
                                    <Grid item md={4} xs={12}>{allViewCheckBox}</Grid>
                                    <Grid item md={4} xs={12}>{ownedCheckBox}</Grid>
                                    <Grid item md={4} xs={12}>{unownedCheckBox}</Grid>
                                    <Grid item md={4} xs={12}>
                                        <div className={classes.modelHeaderContainer}>
                                            <h3>{BS_DISPLAY_MODAL.LABELS.SORT}</h3>
                                        </div>
                                        {sortingAttibuteFilter}
                                    </Grid>
                                    <Grid item md={6} xs={12}>
                                        <div className={classes.modelHeaderContainer}>
                                            <h3>{BS_DISPLAY_MODAL.LABELS.DISPLAY}</h3>
                                        </div>
                                        <div className={classes.container}>
                                            <ActionButton
                                                buttonLabel={newBoxImage 
                                                    ? BS_DISPLAY_MODAL.BUTTONS.OUT_OF_BOX 
                                                    : BS_DISPLAY_MODAL.BUTTONS.IN_BOX
                                                }
                                                icon={<SwapHorizIcon />}
                                                onClick={handleImageChange}
                                                color={Color.green()}
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
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    defaultValue={filterByInputName}
                                    placeholder={BS_CATALOG.SEARCH}
                                    classes={{ root: classes.inputRoot }}
                                    onChange={handleInputNameChange}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={6} md={4}>{''}</Grid>
                        <Grid item xs={3} md={1} className={classes.viewFilters}>
                            <ActionButton
                                buttonLabel={BS_CATALOG.BUTTON.STATS}
                                onClick={openStatsModal}
                                color={Color.green()}
                            />
                        </Grid>
                        <Grid item xs={3} md={1} className={classes.viewFilters}>
                            <ActionButton
                                icon={<FilterListIcon />}
                                onClick={openModal}
                                color={Color.black()}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
            <ActionFigure
                records={displayList}
                newBoxImage={newBoxImage}
                catalogList={catalogList}
                view={true}
                sourceMaterials={helperData.sourceMaterial}
                assortments={helperData.assortment}
            />
        </React.Fragment >
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    rootTest: {
        flexGrow: 1,
        opacity: 1.0,
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
        marginBottom: theme.spacing(1),
    },
    viewFilters: {
        marginTop: theme.spacing(1),
        display: 'flex',
        justifyContent: 'flex-end',
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
        paddingLeft: '8%',
    },
    statsButton: {
        margin: theme.spacing(5),
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(5),
    },
    modelHeaderContainer: {
        marginLeft: theme.spacing(3),
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
