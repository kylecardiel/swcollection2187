import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { UserConsumer } from 'components/auth/authContext';
// import { TableStats } from 'components/blackSeries/tableStats';
import { ActionButton } from 'components/common/buttons/actionButton';
import { CustomCheckbox } from 'components/common/buttons/customCheckbox';
import { convertArrayObjectToArrayOfObjectProperty } from 'components/common/form/formatFormData';
import { FormFilter } from 'components/common/form/formFilter';
// import { generateStatsBasedOnSource } from 'components/common/stats/stats';
import { ActionFigure } from 'components/display/actionfigure';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CatalogApi, UserApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { Color } from 'shared/styles/color';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import { camelCase } from 'lodash'

const { ACTION_FIGURES } = FB_DB_CONSTANTS;

export const BlackSeriesCatalog = props => {
    const { id, loggedIn } = useContext(UserConsumer);
    const classes = useStyles();
    const { catalogList, setCatalogData, userList, setUserData, screenSize } = props;

    const helperData = props.helperData;

    const [viewFilters, setVewFilters] = useState(false);
    const handleChange = () => setVewFilters(!viewFilters);

    const [filterBySourceMaterial, setFilterBySourceMaterial] = useState('');
    const handleSourceMaterialChange = e => setFilterBySourceMaterial(e.target.value);

    const [filterByCharacter, setFilterByCharacter] = useState('');
    const handleCharacterChange = e => setFilterByCharacter(e.target.value);;

    const [filterByInputName, setFilterByInputName] = useState('');
    const handleInputNameChange = e => {
        if (e.target) {
            const { value } = e.target;
            setTimeout(setFilterByInputName(value), 500);
        }
    };

    const [filterByGroup, setFilterByGroup] = useState('');
    const handleGroupChange = e => setFilterByGroup(e.target.value);

    const [filterByVersion, setFilterByVersion] = useState('');
    const handleVersionChange = e => setFilterByVersion(e.target.value);

    const [filterByAssortment, setFilterByAssortment] = useState('');
    const handleAssortmentChange = e => setFilterByAssortment(e.target.value);

    const [filterByYear, setFilterByYear] = useState();
    const handleYearChange = e => setFilterByYear(e.target.value);

    const [newBoxImage, setNewBoxImage] = useState(false);
    const handleImageChange = () => setNewBoxImage(!newBoxImage);

    const [sortingAttribute, setSortingAttribute] = useState();
    const handleSortingChange = e => {
        let value = null;
        if (e.target.value) value = camelCase(e.target.value);
        setSortingAttribute(value);
    }

    const [viewAllFigures, setViewAllFigures] = useState(true);
    const [viewOnlyOwnedFigures, setViewOnlyOwnedFigures] = useState(false);
    const [viewOnlyUnownedFigures, setViewOnlyUnownedFigures] = useState(false);

    const handleViewAllFiguresCheckBoxChange = () => {
        if(!viewAllFigures) {
            setViewOnlyOwnedFigures(false);
            setViewOnlyUnownedFigures(false);
        }
        setViewAllFigures(!viewAllFigures);
    };

    const handleOwnedFiguresCheckBoxChange = () => {
        if(!viewOnlyOwnedFigures) {
            setViewAllFigures(false);
            setViewOnlyUnownedFigures(false);
        }
        setViewOnlyOwnedFigures(!viewOnlyOwnedFigures);
    };

    const handleUnownedFiguresCheckBoxChange = () => {
        if(!viewOnlyUnownedFigures) {
            setViewAllFigures(false);
            setViewOnlyOwnedFigures(false);
        }
        setViewOnlyUnownedFigures(!viewOnlyUnownedFigures);
    };

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);

    const handleClearFilters = () => {
        setFilterBySourceMaterial(null);
        setFilterByCharacter(null);
        setFilterByGroup(null);
        setFilterByVersion(null);
        setFilterByAssortment(null);
        setNewBoxImage(false);
        setSortingAttribute();
    };

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
        };

        if (viewFilters) setLabelWidth(inputLabel.current.offsetWidth);

    }, [initialState, setCatalogData, setUserData, id, loggedIn, viewFilters, helperData]);

    const massageList = () => {
        let mergedList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : catalogList;
        if (!viewAllFigures) {
            if (viewOnlyOwnedFigures) mergedList = mergedList.filter(el => el.owned === true);
            if (viewOnlyUnownedFigures) mergedList = mergedList.filter(el => el.owned !== true);
        };

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
            return SortingUtils.sortDataByAttributeAsc(mergedList, 'name');
        }
    };

    const displayList = massageList();

    const allFigures = () => {
        return <ActionFigure
            records={displayList}
            newBoxImage={newBoxImage}
            catalogList={catalogList}
            view={true}
            sourceMaterials={helperData.sourceMaterial}
            assortments={helperData.assortment}
            screenSize={screenSize}
        />;
    }

    const viewableCatalog = allFigures();

    const filteribleYears = [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021];

    let sourceMaterialFilterComp, characterFilterComp, groupFilterComp, versionFilterComp, assortmentFilterComp, sortingAttibuteFilter, yearFilter;
    const buildFilters = () => {
        if (Object.keys(helperData).length !== 0) {
            const { assortment, characters, sourceMaterial, groups, version } = helperData;
            const formattedSourceMaterial = convertArrayObjectToArrayOfObjectProperty(sourceMaterial, 'name');
            const formattedAssortment = convertArrayObjectToArrayOfObjectProperty(assortment, 'name');
            sourceMaterialFilterComp = <FormFilter
                key={'Source Material'}
                menuList={formattedSourceMaterial}
                onChange={handleSourceMaterialChange}
                label={'Source Material'}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterBySourceMaterial}
            />
            characterFilterComp = <FormFilter
                key={'Characters'}
                menuList={characters.values}
                onChange={handleCharacterChange}
                label={'Characters'}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterByCharacter}
            />
            groupFilterComp = <FormFilter
                key={'Groups'}
                menuList={groups.values}
                onChange={handleGroupChange}
                label={'Groups'}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterByGroup}
            />
            versionFilterComp = <FormFilter
                key={'Versions'}
                menuList={version.values}
                onChange={handleVersionChange}
                label={'Versions'}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterByVersion}
            />
            assortmentFilterComp = <FormFilter
                key={'Assortment'}
                menuList={formattedAssortment}
                onChange={handleAssortmentChange}
                label={'Assortment'}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterByAssortment}
            />
            sortingAttibuteFilter = <FormFilter
                key={'Sorting'}
                menuList={['Name', 'Series Number', 'Source Material', 'Year']}
                onChange={handleSortingChange}
                label={'Sorting'}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={sortingAttribute}
            />
            yearFilter = <FormFilter
            key={'Year'}
            menuList={filteribleYears}
            onChange={handleYearChange}
            label={'Year'}
            inputLabel={inputLabel}
            labelWidth={labelWidth}
            value={filterByYear}
        />
        };
    };
    buildFilters();

    const generateCheckBoxForm = (state, handleChange, labelText) => {
        return <FormControlLabel
            control={<CustomCheckbox
                checked={state}
                onChange={handleChange}
            />}
            label={labelText}
            labelPlacement='start'
        />;
    };

    const allViewCheckBox = generateCheckBoxForm(viewAllFigures, handleViewAllFiguresCheckBoxChange, 'View All');
    const ownedCheckBox = generateCheckBoxForm(viewOnlyOwnedFigures, handleOwnedFiguresCheckBoxChange, 'Owned Figures');
    const unownedCheckBox = generateCheckBoxForm(viewOnlyUnownedFigures, handleUnownedFiguresCheckBoxChange, 'Not Owned Figures');

    // const stats = generateStatsBasedOnSource(displayList, helperData.sourceMaterial, 'sourceMaterial');
    const styleViewFilters = viewFilters ? {} : { display: 'none' };

    return (
        <React.Fragment>
            <Container component='main' maxWidth='xl'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6} className={classes.alwaysDisplayed}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    onChange={handleInputNameChange}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} md={1}></Grid>
                        <Grid item xs={6} md={2}>{sortingAttibuteFilter}</Grid>
                        <Grid item xs={3} md={1}></Grid>
                        <Grid item xs={3} md={1} className={classes.viewFilters}>
                            <ActionButton
                                icon={<FilterListIcon />}
                                onClick={handleChange}
                                color={Color.black()}
                            />
                        </Grid>
                        <Grid item xs={12} md={2} style={styleViewFilters}>{sourceMaterialFilterComp}</Grid>
                        <Grid item xs={12} md={2} style={styleViewFilters}>{characterFilterComp}</Grid>
                        <Grid item xs={12} md={2} style={styleViewFilters}>{groupFilterComp}</Grid>
                        <Grid item xs={12} md={2} style={styleViewFilters}>{assortmentFilterComp}</Grid>
                        <Grid item xs={12} md={2} style={styleViewFilters}>{versionFilterComp}</Grid>
                        <Grid item xs={12} md={2} style={styleViewFilters}>{yearFilter}</Grid>
                        <Grid item xs={12} md={1} className={classes.formControl} style={styleViewFilters}>
                            {allViewCheckBox}
                        </Grid>
                        <Grid item xs={12} md={1} className={classes.formControl} style={styleViewFilters}>
                            {ownedCheckBox}
                        </Grid>
                        <Grid item xs={12} md={1} className={classes.formControl} style={styleViewFilters}>
                            {unownedCheckBox}
                        </Grid>
                        <Grid item xs={12} md={2} className={classes.formControl} style={styleViewFilters}>
                            <ActionButton
                                buttonLabel={newBoxImage ? 'Out of Box Image' : 'In Box Image'}
                                icon={<SwapHorizIcon />}
                                onClick={handleImageChange}
                                color={Color.green()}
                            />
                        </Grid>
                        <Grid item xs={12} md={2} className={classes.formControl} style={styleViewFilters}>
                            <ActionButton
                                buttonLabel={'Clear Filters'}
                                icon={<ClearIcon />}
                                onClick={handleClearFilters}
                                color={Color.red()}
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
            {viewableCatalog}
            {/* <Container component='main' maxWidth='xl'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        {displayList.length > 0 &&
                            <>
                                <Grid item xs={12} md={3} className={classes.tableStats}></Grid>
                                <Grid item xs={12} md={6} className={classes.tableStats}>
                                    <AssortmentHeader text={'Stats'} backgroundColor={'darkYellow'} />
                                    <TableStats stats={stats} />
                                </Grid>
                            </>
                        }
                    </Grid>
                </div>
            </Container> */}
        </React.Fragment >
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
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
    tableStats: {
        marginTop: theme.spacing(4),
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
        height: 53,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        height: 53,
    },
}));