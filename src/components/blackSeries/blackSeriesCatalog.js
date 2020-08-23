import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { fade, makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { UserConsumer } from 'components/auth/authContext';
import { AssortmentHeader } from 'components/blackSeries/assortmentHeader';
import { TableStats } from 'components/blackSeries/tableStats';
import { ActionButton } from 'components/common/buttons/actionButton';
import { CustomCheckbox } from 'components/common/buttons/customCheckbox';
import { convertArrayObjectToArrayOfObjectProperty } from 'components/common/form/formatFormData';
import { FormFilter } from 'components/common/form/formFilter';
import { generateStatsBasedOnSource } from 'components/common/stats/stats';
import { ActionFigure } from 'components/display/actionfigure';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CatalogApi, UserApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { Color } from 'shared/styles/color';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';
import { HelperDataConsumer } from 'context/helperDataContext';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';

const { ACTION_FIGURES } = FB_DB_CONSTANTS;

export const BlackSeriesCatalog = props => {
    const { id, loggedIn } = useContext(UserConsumer);
    const classes = useStyles();
    const { catalogList, setCatalogData, userList, setUserData } = props;

    // const [helperData, setHelperData] = useState({});
    const helperData = useContext(HelperDataConsumer);

    const [viewFilters, setVewFilters] = useState(false);
    const handleChange = () => setVewFilters(!viewFilters);

    const [filterBySourceMaterial, setFilterBySourceMaterial] = useState('');
    const handleSourceMaterialChange = e => {
        setFilterBySourceMaterial(e.target.value);
        setCollapsibleAssortments([]);
    };

    const [filterByCharacter, setFilterByCharacter] = useState('');
    const handleCharacterChange = e => {
        setFilterByCharacter(e.target.value);
        setCollapsibleAssortments([]);;
    };

    const [filterByInputName, setFilterByInputName] = useState('');
    const handleInputNameChange = e => {
        if (e.target) {
            const { value } = e.target;
            setTimeout(setFilterByInputName(value), 500);
            value ? setShowAssortmentHeaders(false) : setShowAssortmentHeaders(true);
        }
    };

    const [filterByGroup, setFilterByGroup] = useState('');
    const handleGroupChange = e => {
        setFilterByGroup(e.target.value);
        setCollapsibleAssortments([]);
    };

    const [filterByVersion, setFilterByVersion] = useState('');
    const handleVersionChange = e => {
        setFilterByVersion(e.target.value);
        setCollapsibleAssortments([]);
    };

    const [filterByAssortment, setFilterByAssortment] = useState('');
    const handleAssortmentChange = e => {
        setFilterByAssortment(e.target.value);
        setCollapsibleAssortments([]);
    };

    const [showAssortmentHeaders, setShowAssortmentHeaders] = useState(true);
    const handleAssortmentHeaderChange = () => setShowAssortmentHeaders(!showAssortmentHeaders);

    const [newBoxImage, setNewBoxImage] = useState(false);
    const handleImageChange = () => setNewBoxImage(!newBoxImage);

    const [viewAllFigures, setViewAllFigures] = useState(true);
    const [viewOnlyOwnedFigures, setViewOnlyOwnedFigures] = useState(false);
    const [viewOnlyUnownedFigures, setViewOnlyUnownedFigures] = useState(false);

    const handleViewAllFiguresCheckBoxChange = () => {
        if (!viewAllFigures) {
            setViewOnlyOwnedFigures(false);
            setViewOnlyUnownedFigures(false);
        } else {
            setViewOnlyOwnedFigures(true);
        }
        setViewAllFigures(!viewAllFigures)
    };

    const handleOwnedFiguresCheckBoxChange = () => {
        setViewOnlyOwnedFigures(!viewOnlyOwnedFigures);
        setViewAllFigures(!viewAllFigures)
    };

    const handleUnownedFiguresCheckBoxChange = () => {
        setViewOnlyUnownedFigures(!viewOnlyUnownedFigures);
        setViewAllFigures(!viewAllFigures)
    };

    const [collapsibleAssortments, setCollapsibleAssortments] = useState([]);
    const handleCollapsibleChange = assortment => {
        const updated = collapsibleAssortments.includes(assortment)
            ? collapsibleAssortments.filter(el => el !== assortment)
            : [...[assortment], ...collapsibleAssortments];
        setCollapsibleAssortments(updated);
    };

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);

    const handleClearFilters = () => {
        setFilterBySourceMaterial(null);
        setFilterByCharacter(null);
        setFilterByGroup(null);
        setFilterByVersion(null);
        setFilterByAssortment(null);
        setShowAssortmentHeaders(true);
        setNewBoxImage(false);
        setCollapsibleAssortments(helperData.assortment.values.filter(el => el !== 'Orange - 2013/2014'));
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

        setCollapsibleAssortments(helperData.assortment.values.map(({ name }) => name !== 'Orange - 2013/2014' ? name : ''));
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
        return mergedList;
    };

    const displayList = massageList();

    const generateAssortmentSection = assortment => {
        const { color, name, sortingAttribute, textColor } = assortment;
        const records = SortingUtils.sortDataByStringIntAsc(displayList.filter(el => el.assortment === name), sortingAttribute);
        if (records.length > 0) {
            const view = showAssortmentHeaders ? !collapsibleAssortments.includes(name) : true
            const collapseonChangeButton = () => handleCollapsibleChange(name);
            return <>
                {showAssortmentHeaders &&
                    <AssortmentHeader
                        id={name}
                        key={name}
                        text={name}
                        textColor={textColor}
                        backgroundColor={color}
                        collapseonChangeButton={collapseonChangeButton}
                        view={view}
                    />}
                <ActionFigure
                    records={records}
                    newBoxImage={newBoxImage}
                    catalogList={catalogList}
                    showAssortmentHeaders={showAssortmentHeaders}
                    view={view}
                    sourceMaterials={helperData.sourceMaterial}
                    assortments={helperData.assortment}
                />
            </>
        }
        return null;
    };

    const assortments = () => {
        if (helperData && helperData.assortment) {
            return <>
                {helperData.assortment.values.map(assortment => generateAssortmentSection(assortment))}
            </>;
        }
    }

    const allFigures = () => {
        return <ActionFigure
            records={SortingUtils.sortDataByStringIntAsc(displayList, 'name')}
            newBoxImage={newBoxImage}
            catalogList={catalogList}
            showAssortmentHeaders={showAssortmentHeaders}
            view={true}
            sourceMaterials={helperData.sourceMaterial}
            assortments={helperData.assortment}
        />;
    }

    const viewableCatalog = showAssortmentHeaders ? assortments() : allFigures();

    let sourceMaterialFilterComp, characterFilterComp, groupFilterComp, versionFilterComp, assortmentFilterComp;
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
        };
    };
    buildFilters();

    const generateCheckBoxForm = (state, handleChange, labelText) => {
        return <FormControlLabel
            control={<CustomCheckbox
                checked={state}
                onChange={handleChange}
                labelStyle={{ color: 'green' }}
                iconStyle={{ fill: 'green' }}
            />}
            label={labelText}
            labelPlacement='start'
        />;
    };

    const allViewCheckBox = generateCheckBoxForm(viewAllFigures, handleViewAllFiguresCheckBoxChange, 'View All');
    const ownedCheckBox = generateCheckBoxForm(viewOnlyOwnedFigures, handleOwnedFiguresCheckBoxChange, 'Owned Figures');
    const unownedCheckBox = generateCheckBoxForm(viewOnlyUnownedFigures, handleUnownedFiguresCheckBoxChange, 'Not Owned Figures');

    const stats = generateStatsBasedOnSource(displayList, helperData.sourceMaterial, 'sourceMaterial');
    const styleViewFilters = viewFilters ? {} : { display: 'none' };


    return (
        <React.Fragment>
            <Container component='main' maxWidth='lg'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={8} className={classes.alwaysDisplayed}>
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
                            <div className={classes.grow} />
                        </Grid>
                        <Grid item xs={12} md={2} className={classes.alwaysDisplayed}></Grid>
                        <Grid item xs={12} md={1} className={classes.viewFilters}>
                            <ActionButton
                                icon={<FilterListIcon />}
                                onClick={handleChange}
                                color={Color.black()}
                            />
                        </Grid>
                        <Grid item xs={12} md={3} style={styleViewFilters}>{sourceMaterialFilterComp}</Grid>
                        <Grid item xs={12} md={3} style={styleViewFilters}>{characterFilterComp}</Grid>
                        <Grid item xs={12} md={3} style={styleViewFilters}>{groupFilterComp}</Grid>
                        <Grid item xs={12} md={3} style={styleViewFilters}>{versionFilterComp}</Grid>
                        <Grid item xs={12} md={3} style={styleViewFilters}>{assortmentFilterComp}</Grid>
                        <Grid item xs={12} md={3} className={classes.formControl} style={styleViewFilters}>
                            <ActionButton
                                buttonLabel={showAssortmentHeaders ? ' Hide Assort. Headers' : 'Show Assort. Headers'}
                                onClick={handleAssortmentHeaderChange}
                                color={Color.green()}
                            />
                            {allViewCheckBox}
                        </Grid>
                        <Grid item xs={12} md={3} className={classes.formControl} style={styleViewFilters}>
                            <ActionButton
                                buttonLabel={newBoxImage ? 'Out of Box Image' : 'In Box Image'}
                                icon={<SwapHorizIcon />}
                                onClick={handleImageChange}
                                color={Color.green()}
                            />
                            {ownedCheckBox}
                        </Grid>
                        <Grid item xs={2} className={classes.formControl} style={styleViewFilters}>
                            <ActionButton
                                buttonLabel={'Clear Filters'}
                                icon={<ClearIcon />}
                                onClick={handleClearFilters}
                                color={Color.red()}
                            />
                            {unownedCheckBox}
                        </Grid>
                        {viewableCatalog}
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
            </Container>
        </React.Fragment >
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(1),
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
        marginLeft: theme.spacing(1),
    },
    viewFilters: {
        marginTop: theme.spacing(1),
        display: 'flex',
        justifyContent: 'flex-end',
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
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: Color.white(),
            borderColor: Color.black(),
        },
        marginTop: theme.spacing(1),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
        border: '2px solid',
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
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
}));