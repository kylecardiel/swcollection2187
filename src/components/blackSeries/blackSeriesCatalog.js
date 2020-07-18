import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { UserConsumer } from 'components/auth/authContext';
import { ActionFigure } from 'components/display/actionfigure';
import React, { useContext, useEffect, useState } from 'react';
import { CatalogApi, UserApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';
import { AssortmentHeader } from 'components/blackSeries/assortmentHeader';
import { ASSORTMENT } from 'shared/constants/domainConstantSelectors';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { PAGES } from 'shared/constants/stringConstantsSelectors';

const { ACTION_FIGURES } = FB_DB_CONSTANTS;
const { HOME } = ROUTE_CONSTANTS;

export const BlackSeriesCatalog = props => {
    const user = useContext(UserConsumer);
    const classes = useStyles();
    const { catalogList, setCatalogData, userList, setUserData } = props;

    const [initialState] = useState(props);
    useEffect(() => {
        const catalogRef = CatalogApi.read(`${ACTION_FIGURES.ALL}`);
        catalogRef.on('value', snapshot => {
            if (snapshot.val()) {
                let records = snapshot.val()["BlackSeries6"];
                setCatalogData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records, "id"));
            }
        });

        if(user.loggedIn){
            const userRef = UserApi.read(user.id, `${ACTION_FIGURES.ALL}`);
            userRef.on('value', snapshot => {
                if (snapshot.val()) {
                    let records = snapshot.val()["BlackSeries6"];
                    setUserData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records, "ownedId"));
                }
            });
        }
    }, [initialState, setCatalogData, setUserData, user.id, user.loggedIn]);

    const merged = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : [];

    const generateAssortmentSection = (text, backgroundColor) => {
        const records = SortingUtils.sortDataByStringIntAsc(merged.filter(el => el.assortment === text), "seriesNumber");
        return <>
            <AssortmentHeader text={text} backgroundColor={backgroundColor} />
            <ActionFigure catalog records={records} />
        </>
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

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.BLACK_SERIES_CATALOG.TITLE} />
            <Container component='main' maxWidth='lg'>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} className={classes.grid}>
                            {orangeAssort}
                            {blueAssort}
                            {redAssort}
                            {deluxAssort}
                            {annivAssort}
                            {archiveAssort}
                            {vehicleAssort}
                            {centerdAssort}
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </React.Fragment>
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
}));