import { TextField } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { UserConsumer } from 'components/auth/authContext';
import { assortmentAttributes } from 'components/blackSeries/assortmentColor';
import { AssortmentHeader } from 'components/blackSeries/assortmentHeader';
import { TableStats } from 'components/blackSeries/tableStats';
import { ActionButton } from 'components/common/buttons/actionButton';
import { CustomCheckbox } from 'components/common/buttons/customCheckbox';
import { formatFormData } from 'components/common/form/formatFormData';
import { FormFilter } from 'components/common/form/formFilter';
import { generateStatsBasedOnSource } from 'components/common/stats/stats';
import { ActionFigure } from 'components/display/actionfigure';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CatalogApi, HelperDataApi, UserApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { Color } from 'shared/styles/color';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';

const { ACTION_FIGURES } = FB_DB_CONSTANTS;

export const BlackSeriesCatalog = props => {
    const { id, loggedIn } = useContext(UserConsumer);
    const classes = useStyles();
    const { catalogList, setCatalogData, userList, setUserData } = props;

    const [helperData, setHelperData] = useState({});

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
        const { value } = e.target;
        setFilterByInputName(value);
        value ? setShowAssortmentHeaders(false) : setShowAssortmentHeaders(true);
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
        if(!viewAllFigures){
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

        const helperDataRef = HelperDataApi.read(FB_DB_CONSTANTS.HELPER_DATA);
        helperDataRef.on('value', snapshot => {
            const snapshotRef = snapshot.val();
            if (snapshotRef) {
                const data = formatFormData(snapshotRef);
                setHelperData(data);
                setCollapsibleAssortments(data.assortment.values.filter(el => el !== 'Orange - 2013/2014'));
            }
        });

        if (viewFilters) {
            setLabelWidth(inputLabel.current.offsetWidth);
        };

    }, [initialState, setCatalogData, setUserData, id, loggedIn, viewFilters]);

    const massageList = () => {
        let mergedList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : catalogList;
        if(!viewAllFigures) {
            if(viewOnlyOwnedFigures) mergedList = mergedList.filter(el => el.owned === true);
            if(viewOnlyUnownedFigures) mergedList = mergedList.filter(el => el.owned !== true);
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
        const assortAttributes = assortmentAttributes(assortment);
        const records = SortingUtils.sortDataByStringIntAsc(displayList.filter(el => el.assortment === assortment), assortAttributes.sortingAttribute);
        if (records.length > 0) {
            const view = showAssortmentHeaders ? !collapsibleAssortments.includes(assortment) : true
            return <>
                {showAssortmentHeaders && 
                    <AssortmentHeader 
                        id={assortment} 
                        key={assortment} 
                        text={assortment} 
                        backgroundColor={assortAttributes.color} 
                        collapseonChangeButton={() => handleCollapsibleChange(assortment)}
                        view={view}
                    />}
                <ActionFigure 
                    records={records} 
                    newBoxImage={newBoxImage} 
                    catalogList={catalogList} 
                    showAssortmentHeaders={showAssortmentHeaders} 
                    view={view}
                />
            </>
        }
        return null;
    };

    const assortments = <>
        {helperData
            && helperData.assortment
            && helperData.assortment.values.map(assortment => generateAssortmentSection(assortment))
        }
    </>;

    const allFigures = <ActionFigure
        records={SortingUtils.sortDataByStringIntAsc(displayList, 'name')}
        newBoxImage={newBoxImage}
        catalogList={catalogList}
        showAssortmentHeaders={showAssortmentHeaders}
        view={true}
    />;

    let sourceMaterialFilterComp, characterFilterComp, groupFilterComp, versionFilterComp, assortmentFilterComp;
    const buildFilters = () => {
        if (Object.keys(helperData).length !== 0) {
            const { assortment, characters, sourceMaterial, groups, version } = helperData;
            sourceMaterialFilterComp = <FormFilter
                key={'Source Material'}
                menuList={sourceMaterial.values}
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
                menuList={assortment.values}
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

    return (
        <React.Fragment>
            <Container component='main' maxWidth='lg'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} className={classes.alwaysDisplayed}>
                            <Typography color='textSecondary'>
                                {`Search: `}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={3} className={classes.alwaysDisplayed}>
                            <Grid item xs={12} md={2} className={classes.inputBoxInColumn}>
                                <TextField
                                    variant='outlined'
                                    className={classes.form}
                                    onChange={handleInputNameChange}
                                    fullWidth
                                    id={'Character Name'}
                                    name={'Character Name'}
                                    label={'Character Name'}
                                />
                            </Grid>
                        </Grid>
                        <Grid item xs={12} md={8} className={classes.viewFilters}>
                            <ActionButton
                                buttonLabel={viewFilters ? 'Hide Filters' : 'Show Filters'}
                                icon={viewFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                onClick={handleChange}
                                color={Color.black()}
                            />
                        </Grid>
                        {viewFilters &&
                            <React.Fragment>
                                <Grid item xs={12} md={3}>{sourceMaterialFilterComp}</Grid>
                                <Grid item xs={12} md={3}>{characterFilterComp}</Grid>
                                <Grid item xs={12} md={3}>{groupFilterComp}</Grid>
                                <Grid item xs={12} md={3}>{versionFilterComp}</Grid>
                                <Grid item xs={12} md={3}>{assortmentFilterComp}</Grid>
                                <Grid item xs={12} md={3} className={classes.formControl}>
                                    <ActionButton
                                        buttonLabel={showAssortmentHeaders ? ' Hide Assort. Headers' : 'Show Assort. Headers'}
                                        onClick={handleAssortmentHeaderChange}
                                        color={Color.green()}
                                    />
                                    {allViewCheckBox}
                                </Grid>
                                <Grid item xs={12} md={3} className={classes.formControl}>
                                    <ActionButton
                                        buttonLabel={newBoxImage ? 'Out of Box Image' : 'In Box Image'}
                                        icon={<SwapHorizIcon />}
                                        onClick={handleImageChange}
                                        color={Color.green()}
                                    />
                                    {ownedCheckBox}
                                </Grid>
                                <Grid item xs={2} className={classes.formControl}>
                                    <ActionButton
                                        buttonLabel={'Clear Filters'}
                                        icon={<ClearIcon />}
                                        onClick={handleClearFilters}
                                        color={Color.red()}
                                    />
                                    {unownedCheckBox}
                                </Grid>
                            </React.Fragment>
                        }
                        {showAssortmentHeaders
                            ? assortments
                            : allFigures
                        }
                        {displayList.length > 0 &&
                            <>
                                <Grid item xs={12} md={3} className={classes.tableStats}></Grid>
                                <Grid item xs={12} md={6} className={classes.tableStats}>
                                    <AssortmentHeader text={'Stats'} backgroundColor={Color.darkYellow()} />
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
    },
}));