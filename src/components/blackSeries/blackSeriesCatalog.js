import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
import { CatalogApi, UserApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import {
    ALL_ASSORTMENT, ALL_SOURCE_NAMES, ASSORTMENT, CHARACTER_NAMES,
    GROUP_NAMES,
    VERSIONS
} from 'shared/constants/domainConstantSelectors';
import { Color } from 'shared/styles/color';
import { modalStyles } from 'shared/styles/modalStyles';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';
import { TableStats } from 'components/blackSeries/tableStats';

const { ACTION_FIGURES } = FB_DB_CONSTANTS;

export const BlackSeriesCatalog = props => {
    const user = useContext(UserConsumer);
    const classes = useStyles();
    const { catalogList, setCatalogData, userList, setUserData, catalog } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = figure => {
        setViewActionFigureDetail(figure);
        setViewSimilarActionFigures(catalogList.filter(el => el.name === figure.name && el.id !== figure.id));
        setVewFilters(false);
        setIsModalOpen(true);
    }
    const closeModal = () => setIsModalOpen(false);
    const modalSize = { height: '90%', width: '95%' };

    const [viewActionFigureDetail, setViewActionFigureDetail] = useState(false);
    const [viewSimilarActionFigures, setViewSimilarActionFigures] = useState([]);

    const [viewFilters, setVewFilters] = useState(false);
    const handleChange = () => setVewFilters(!viewFilters);

    const [filterBySourceMaterial, setFilterBySourceMaterial] = useState();
    const handleSourceMaterialChange = e => setFilterBySourceMaterial(e.target.value);

    const [filterByCharacter, setFilterByCharacter] = useState();
    const handleCharacterChange = e => setFilterByCharacter(e.target.value);

    const [filterByGroup, setFilterByGroup] = useState();
    const handleGroupChange = e => setFilterByGroup(e.target.value);

    const [filterByVersion, setFilterByVersion] = useState();
    const handleVersionChange = e => setFilterByVersion(e.target.value);

    const [filterByAssortment, setFilterByAssortment] = useState();
    const handleAssortmentChange = e => setFilterByAssortment(e.target.value);

    const [showAssortmentHeaders, setShowAssortmentHeaders] = useState(true);
    const handleAssortmentHeaderChange = () => setShowAssortmentHeaders(!showAssortmentHeaders);

    const [newBoxImage, setNewBoxImage] = useState(false);
    const handleImageChange = () => setNewBoxImage(!newBoxImage);

    const handleClearFilters = () => {
        setFilterBySourceMaterial(null);
        setFilterByCharacter(null);
        setFilterByGroup(null);
        setFilterByVersion(null);
        setFilterByAssortment(null);
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
        }
    }, [initialState, setCatalogData, setUserData, user.id, user.loggedIn]);

    const inputLabel = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    useEffect(() => {
        if (viewFilters) {
            setLabelWidth(inputLabel.current.offsetWidth);
        }
    }, [viewFilters]);

    const massageList = () => {
        let mergedList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : [];
        if (!catalog) {
            mergedList = mergedList.filter(el => el.owned === true);
        }
        if (filterBySourceMaterial) {
            mergedList = mergedList.filter(el => el.sourceMaterial === filterBySourceMaterial);
        }
        if (filterByCharacter) {
            mergedList = mergedList.filter(el => el.name === filterByCharacter);
        }
        if (filterByGroup) {
            mergedList = mergedList.filter(el => el.groups.includes(filterByGroup));
        }
        if (filterByVersion) {
            mergedList = mergedList.filter(el => el.version === filterByVersion);
        }
        if (filterByAssortment) {
            mergedList = mergedList.filter(el => el.assortment === filterByAssortment);
        }
        return mergedList;
    };

    const displayList = massageList();

    const generateAssortmentSection = (text, backgroundColor) => {
        const records = SortingUtils.sortDataByStringIntAsc(displayList.filter(el => el.assortment === text), "seriesNumber")
        if (records.length > 0) {
            return <>
                {showAssortmentHeaders && <AssortmentHeader text={text} backgroundColor={backgroundColor} />}
                <ActionFigure catalog={catalog} records={records} newBoxImage={newBoxImage} onClickCard={openModal} />
            </>
        }
        return null;
    };

    const generateStats = () => {
        let stats = {
            count: displayList.length,
            source: [],
        };

        ALL_SOURCE_NAMES.forEach(source => {
            stats['source'].push({
                name: source,
                count: displayList.filter(figure => figure.sourceMaterial === source).length
            })
        });

        return stats
    };

    const stats = generateStats();

    const orangeAssort = generateAssortmentSection(ASSORTMENT.BS_ORANGE, 'orange');
    const blueAssort = generateAssortmentSection(ASSORTMENT.BS_BLUE, 'blue');
    const redAssort = generateAssortmentSection(ASSORTMENT.BS_RED, 'red');
    const deluxAssort = generateAssortmentSection(ASSORTMENT.BS_DELUX, 'red');
    const annivAssort = generateAssortmentSection(ASSORTMENT.BS_40TH, 'grey');
    const archiveAssort = generateAssortmentSection(ASSORTMENT.BS_ARCHIVE, 'grey');
    const vehicleAssort = generateAssortmentSection(ASSORTMENT.BS_VEHICLE, 'yellow');
    const centerdAssort = generateAssortmentSection(ASSORTMENT.BS_CENTERPIECE, 'green');

    const assortments = <>
        {orangeAssort}
        {blueAssort}
        {redAssort}
        {deluxAssort}
        {annivAssort}
        {archiveAssort}
        {vehicleAssort}
        {centerdAssort}
    </>

    const allFigures = <ActionFigure
        catalog
        records={SortingUtils.sortDataByStringIntAsc(displayList, 'name')}
        newBoxImage={newBoxImage}
        onClickCard={openModal}
    />

    const menuItemsList = list => {
        return list.map(item =>
            <MenuItem key={item} value={item}>{item}</MenuItem>
        )
    };

    const generateFilter = (menuList, onChange, label, value) => {
        return <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel ref={inputLabel} id={`${label}-id`}>{label}</InputLabel>
            <Select
                labelId={`${label}-id`}
                id={label}
                onChange={onChange}
                labelWidth={labelWidth}
                defaultValue={''}
                label={label}
            >
                <MenuItem key={'none'} value={null}><em>{'none'}</em></MenuItem>
                {menuItemsList(menuList)}
            </Select>
        </FormControl>
    };

    const filterDisplayButtonText = viewFilters ? 'Hide Filters' : 'Show Filters';
    const filterDisplayButtonIcon = viewFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />;
    const headerDisplayButtonText = showAssortmentHeaders ? ' Hide Assortment Headers' : 'Show Assortment Headers';
    const imageDisplayButtonText = newBoxImage ? 'Out of Box Image' : 'In Box Image';

    const sourceMaterialFilterComp = generateFilter(ALL_SOURCE_NAMES, handleSourceMaterialChange, 'Source Material', filterBySourceMaterial);
    const characterFilterComp = generateFilter(CHARACTER_NAMES, handleCharacterChange, 'Characters', filterByCharacter);
    const groupFilterComp = generateFilter(GROUP_NAMES, handleGroupChange, 'Groups', filterByGroup);
    const versionFilterComp = generateFilter(VERSIONS, handleVersionChange, 'Versions', filterByVersion);
    const assortmentFilterComp = generateFilter(ALL_ASSORTMENT, handleAssortmentChange, 'Assortment', filterByAssortment);


    return (
        <React.Fragment>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles(modalSize)}
            >
                <ActionFigureDetails
                    catalog
                    figure={viewActionFigureDetail}
                    similarFigures={viewSimilarActionFigures}
                />
            </Modal>
            <Container component='main' maxWidth='lg'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <ActionButton
                                buttonLabel={filterDisplayButtonText}
                                icon={filterDisplayButtonIcon}
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
                                        buttonLabel={headerDisplayButtonText}
                                        onClick={handleAssortmentHeaderChange}
                                        color={Color.primary('green')}
                                    />
                                </Grid>
                                <Grid item xs={3} className={classes.formControl}>
                                    <ActionButton
                                        buttonLabel={imageDisplayButtonText}
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
                                    <AssortmentHeader text={'Stats'} backgroundColor={'yellow'} />
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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 225,
    },
    tableStats: {
        marginTop: theme.spacing(4),
    },
}));