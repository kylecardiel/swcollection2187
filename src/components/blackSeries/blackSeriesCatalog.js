import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { UserConsumer } from 'components/auth/authContext';
import { ActionFigure } from 'components/display/actionfigure';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { CatalogApi, UserApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';
import { AssortmentHeader } from 'components/blackSeries/assortmentHeader';
import { ASSORTMENT } from 'shared/constants/domainConstantSelectors';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
    ALL_SOURCE_NAMES,
    // ALL_ASSORTMENT,
    CHARACTER_NAMES,
    GROUP_NAMES,
    VERSIONS,
} from 'shared/constants/domainConstantSelectors';
import { ActionButton } from 'components/common/buttons/actionButton';
import { Color } from 'shared/styles/color';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';


const { ACTION_FIGURES } = FB_DB_CONSTANTS;
const { HOME } = ROUTE_CONSTANTS;

export const BlackSeriesCatalog = props => {
    const user = useContext(UserConsumer);
    const classes = useStyles();
    const { catalogList, setCatalogData, userList, setUserData } = props;


    const [viewFilters, setVewFilters] = useState(false);
    const handleChange = () => {
        setVewFilters(!viewFilters);
    };

    const [filterBySourceMaterial, setFilterBySourceMaterial] = useState();
    const handleSourceMaterialChange = e => {
        setFilterBySourceMaterial(e.target.value);
    };

    const [filterByCharacter, setFilterByCharacter] = useState();
    const handleCharacterChange = e => {
        setFilterByCharacter(e.target.value);
    };

    const [filterByGroup, setFilterByGroup] = useState();
    const handleGroupChange = e => {
        setFilterByGroup(e.target.value);
    };

    const [filterByVersion, setFilterByVersion] = useState();
    const handleVersionChange = e => {
        setFilterByVersion(e.target.value);
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
        if(viewFilters){
            setLabelWidth(inputLabel.current.offsetWidth);
        }
    }, [viewFilters]);

    const massageList = () => {
        let mergedList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : [];
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
        return mergedList;
    };

    const displayList = massageList();

    const generateAssortmentSection = (text, backgroundColor) => {
        const records = SortingUtils.sortDataByStringIntAsc(displayList.filter(el => el.assortment === text), "seriesNumber");
        if (records.length > 0) {
            return <>
                <AssortmentHeader text={text} backgroundColor={backgroundColor} />
                <ActionFigure catalog records={records} />
            </>
        }
        return null;
    };

    const orangeAssort = generateAssortmentSection(ASSORTMENT.BS_ORANGE, 'orange');
    const blueAssort = generateAssortmentSection(ASSORTMENT.BS_BLUE, 'blue');
    const redAssort = generateAssortmentSection(ASSORTMENT.BS_RED, 'red');
    const deluxAssort = generateAssortmentSection(ASSORTMENT.BS_DELUX, 'red');
    const annivAssort = generateAssortmentSection(ASSORTMENT.BS_40TH, 'grey');
    const archiveAssort = generateAssortmentSection(ASSORTMENT.BS_ARCHIVE, 'grey');
    const vehicleAssort = generateAssortmentSection(ASSORTMENT.BS_VEHICLE, 'yellow');
    const centerdAssort = generateAssortmentSection(ASSORTMENT.BS_CENTERPIECE, 'green');

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    const menuItemsList = list => {
        return list.map(item =>
            <MenuItem key={item} value={item}>{item}</MenuItem>
        )
    };

    const generateFilter = (menuList, onChange, label) => {
        return <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel ref={inputLabel} id={`${label}-id`}>{label}</InputLabel>
            <Select
                labelId={`${label}-id`}
                id={label}
                onChange={onChange}
                labelWidth={labelWidth}
                label={label}
            >
                <MenuItem value=''><em>None</em></MenuItem>
                {menuItemsList(menuList)}
            </Select>
        </FormControl>
    };

    const filterDisplayButtonText = viewFilters ? 'Hide Filters' : 'Show Filters'; 
    const filterDisplayButtonIcon = viewFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />; 

    const sourceMaterialFilterComp = generateFilter(ALL_SOURCE_NAMES, handleSourceMaterialChange, 'Source Material');
    const characterFilterComp = generateFilter(CHARACTER_NAMES, handleCharacterChange, 'Characters');
    const groupFilterComp = generateFilter(GROUP_NAMES, handleGroupChange, 'Groups');
    const versionFilterComp = generateFilter(VERSIONS, handleVersionChange, 'Versions');

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.BLACK_SERIES_CATALOG.TITLE} />
            <Container component='main' maxWidth='lg'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                    <Grid item xs={12}>
                            <ActionButton
                                buttonLabel={filterDisplayButtonText}
                                icon={filterDisplayButtonIcon}
                                onClick={handleChange}
                                color={Color.primary('green')}
                            />
                        </Grid>
                        {viewFilters &&
                            <React.Fragment>
                                <Grid item xs={3}>{sourceMaterialFilterComp}</Grid>
                                <Grid item xs={3}>{characterFilterComp}</Grid>
                                <Grid item xs={3}>{groupFilterComp}</Grid>
                                <Grid item xs={2}>{versionFilterComp}</Grid>
                                <Grid item xs={12} className={classes.grid}></Grid>
                            </React.Fragment>
                        }
                        {orangeAssort}
                        {blueAssort}
                        {redAssort}
                        {deluxAssort}
                        {annivAssort}
                        {archiveAssort}
                        {vehicleAssort}
                        {centerdAssort}
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
}));