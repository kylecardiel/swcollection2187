import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ClearIcon from '@material-ui/icons/Clear';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { UserConsumer } from 'components/auth/authContext';
import { AssortmentHeader } from 'components/blackSeries/assortmentHeader';
import { ActionButton } from 'components/common/buttons/actionButton';
import { ActionFigure } from 'components/display/actionfigure';
import { ActionFigureDetails } from 'components/display/actionFigureDetail';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from 'react-modal';
import { CatalogApi, UserApi, HelperDataApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { Color } from 'shared/styles/color';
import { modalStyles } from 'shared/styles/modalStyles';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';
import { TableStats } from 'components/blackSeries/tableStats';
import { TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { formatFormData } from 'components/common/form/formatFormData';
import { generateStatsBasedOnSource } from 'components/common/stats/stats';
import { FormFilter } from 'components/common/form/formFilter';
import { assortmentAttributes } from 'components/blackSeries/assortmentColor';

const { ACTION_FIGURES } = FB_DB_CONSTANTS;

export const BlackSeriesCatalog = props => {
    const user = useContext(UserConsumer);
    const classes = useStyles();
    const { catalogList, setCatalogData, userList, setUserData, catalog } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = figure => {
        setViewActionFigureDetail(figure);
        setViewSimilarActionFigures(SortingUtils.sortDataByStringIntAsc(catalogList.filter(el => el.name === figure.name && el.id !== figure.id), 'year'));
        setViewMultiPackActionFigures(catalogList.filter(el => el.multipack === figure.multipack && el.id !== figure.id))
        setVewFilters(false);
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    const modalSize = { height: '90%', width: '95%' };

    const [helperData, setHelperData] = useState({});

    const [viewActionFigureDetail, setViewActionFigureDetail] = useState(false);
    const [viewSimilarActionFigures, setViewSimilarActionFigures] = useState([]);
    const [viewMultiPackActionFigures, setViewMultiPackActionFigures] = useState([]);

    const [viewFilters, setVewFilters] = useState(false);
    const handleChange = () => setVewFilters(!viewFilters);

    const [filterBySourceMaterial, setFilterBySourceMaterial] = useState('');
    const handleSourceMaterialChange = e => setFilterBySourceMaterial(e.target.value);

    const [filterByCharacter, setFilterByCharacter] = useState('');
    const handleCharacterChange = e => setFilterByCharacter(e.target.value);

    const [filterByInputName, setFilterByInputName] = useState('');
    const handleInputNameChange = e => setFilterByInputName(e.target.value);

    const [filterByGroup, setFilterByGroup] = useState('');
    const handleGroupChange = e => setFilterByGroup(e.target.value);

    const [filterByVersion, setFilterByVersion] = useState('');
    const handleVersionChange = e => setFilterByVersion(e.target.value);

    const [filterByAssortment, setFilterByAssortment] = useState('');
    const handleAssortmentChange = e => setFilterByAssortment(e.target.value);

    const [showAssortmentHeaders, setShowAssortmentHeaders] = useState(catalog);
    const handleAssortmentHeaderChange = () => setShowAssortmentHeaders(!showAssortmentHeaders);

    const [newBoxImage, setNewBoxImage] = useState(false);
    const handleImageChange = () => setNewBoxImage(!newBoxImage);

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
    };

    const [initialState] = useState(props);
    useEffect(() => {
        const catalogRef = CatalogApi.read(`${ACTION_FIGURES.ALL}`);
        catalogRef.on('value', snapshot => {
            if (snapshot.val()) {
                let records = snapshot.val()["BlackSeries6"];
                setCatalogData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records, "id"));
            }
        });

        if (user.loggedIn) {
            const userRef = UserApi.read(user.id, `${ACTION_FIGURES.ALL}`);
            userRef.on('value', snapshot => {
                if (snapshot.val()) {
                    let records = snapshot.val()["BlackSeries6"];
                    setUserData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records, "ownedId"));
                }
            });
        };

        const helperDataRef = HelperDataApi.read(FB_DB_CONSTANTS.HELPER_DATA);
        helperDataRef.on('value', snapshot => {
            const snapshotRef = snapshot.val();
            if (snapshotRef) {
                setHelperData(formatFormData(snapshotRef));
            }
        });

        if (viewFilters) {
            setLabelWidth(inputLabel.current.offsetWidth);
        }

    }, [initialState, setCatalogData, setUserData, user.id, user.loggedIn, viewFilters]);

    const massageList = () => {
        let mergedList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : [];
        if (!catalog) mergedList = mergedList.filter(el => el.owned === true);
        if (filterBySourceMaterial) mergedList = mergedList.filter(el => el.sourceMaterial === filterBySourceMaterial);
        if (filterByCharacter) mergedList = mergedList.filter(el => el.name === filterByCharacter);
        if (filterByInputName) mergedList = mergedList.filter(el => el.name.toLowerCase().includes(filterByInputName.toLowerCase()));
        if (filterByGroup) mergedList = mergedList.filter(el => el.groups.includes(filterByGroup)); 
        if (filterByVersion) mergedList = mergedList.filter(el => el.version === filterByVersion);
        if (filterByAssortment) mergedList = mergedList.filter(el => el.assortment === filterByAssortment);
        return mergedList;
    };

    const displayList = massageList();

    const generateAssortmentSection = assortment => {
        const assortAttributes = assortmentAttributes(assortment);
        const records = SortingUtils.sortDataByStringIntAsc(displayList.filter(el => el.assortment === assortment), assortAttributes.sortingAttribute)
        if (records.length > 0) {
            const backgroundColor = assortAttributes.color;
            return <>
                {showAssortmentHeaders && <AssortmentHeader key={assortment} text={assortment} backgroundColor={backgroundColor} />}
                <ActionFigure catalog={catalog} records={records} newBoxImage={newBoxImage} onClickCard={openModal} />
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
        catalog={catalog}
        records={SortingUtils.sortDataByStringIntAsc(displayList, 'name')}
        newBoxImage={newBoxImage}
        onClickCard={openModal}
    />;

    let sourceMaterialFilterComp, characterFilterComp, groupFilterComp, versionFilterComp, assortmentFilterComp;
    const buildFilters = () => {
        if (Object.keys(helperData).length !== 0) {
            const { assortment, characters, sourceMaterial, groups, version } = helperData;
            sourceMaterialFilterComp = <FormFilter
                menuList={sourceMaterial.values}
                onChange={handleSourceMaterialChange}
                label={'Source Material'}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterBySourceMaterial}
            />
            characterFilterComp = <FormFilter
                menuList={characters.values}
                onChange={handleCharacterChange}
                label={'Characters'}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterByCharacter}
            />
            groupFilterComp = <FormFilter
                menuList={groups.values}
                onChange={handleGroupChange}
                label={'Groups'}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterByGroup}
            />
            versionFilterComp = <FormFilter
                menuList={version.values}
                onChange={handleVersionChange}
                label={'Versions'}
                inputLabel={inputLabel}
                labelWidth={labelWidth}
                value={filterByVersion}
            />
            assortmentFilterComp = <FormFilter
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

    const stats = generateStatsBasedOnSource(displayList, helperData.sourceMaterial, 'sourceMaterial');

    return (
        <React.Fragment>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles(modalSize)}
            >
                <ActionFigureDetails
                    catalog={catalog}
                    figure={viewActionFigureDetail}
                    similarFigures={viewSimilarActionFigures}
                    multipackFigures={viewMultiPackActionFigures}
                />
            </Modal>
            <Container component='main' maxWidth='lg'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} className={classes.alwaysDisplayed}>
                            <Typography color="textSecondary">
                                {`Search: `}
                            </Typography>
                        </Grid>
                        {!isModalOpen &&
                            <Grid item xs={3} className={classes.alwaysDisplayed}>
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
                        }
                        <Grid item xs={8} className={classes.viewFilters}>
                            <ActionButton
                                buttonLabel={viewFilters ? 'Hide Filters' : 'Show Filters'}
                                icon={viewFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                onClick={handleChange}
                                color={Color.primary('black')}
                            />
                        </Grid>
                        {viewFilters &&
                            <React.Fragment>
                                <Grid item xs={3}>{sourceMaterialFilterComp}</Grid>
                                <Grid item xs={3}>{characterFilterComp}</Grid>
                                <Grid item xs={3}>{groupFilterComp}</Grid>
                                <Grid item xs={3}>{versionFilterComp}</Grid>
                                <Grid item xs={3}>{assortmentFilterComp}</Grid>
                                <Grid item xs={3} className={classes.formControl}>
                                    <ActionButton
                                        buttonLabel={showAssortmentHeaders ? ' Hide Assort. Headers' : 'Show Assort. Headers'}
                                        onClick={handleAssortmentHeaderChange}
                                        color={Color.primary('green')}
                                    />
                                </Grid>
                                <Grid item xs={3} className={classes.formControl}>
                                    <ActionButton
                                        buttonLabel={newBoxImage ? 'Out of Box Image' : 'In Box Image'}
                                        icon={<SwapHorizIcon />}
                                        onClick={handleImageChange}
                                        color={Color.primary('green')}
                                    />
                                </Grid>
                                <Grid item xs={2} className={classes.formControl}>
                                    <ActionButton
                                        buttonLabel={'Clear Filters'}
                                        icon={<ClearIcon />}
                                        onClick={handleClearFilters}
                                        color={Color.primary('red')}
                                    />
                                </Grid>
                            </React.Fragment>
                        }
                        {showAssortmentHeaders
                            ? assortments
                            : allFigures
                        }
                        {displayList.length > 0 &&
                            <>
                                <Grid item xs={3} className={classes.tableStats}></Grid>
                                <Grid item xs={6} className={classes.tableStats}>
                                    <AssortmentHeader text={'Stats'} backgroundColor={Color.primary('darkYellow')} />
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