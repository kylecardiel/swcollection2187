import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { UserConsumer } from 'components/auth/authContext';
import { ActionButton } from 'components/common/buttons/actionButton';
import { NewCollectibleForm } from 'components/common/form/newCollectibleForm';
import { ActionFigure } from 'components/display/actionfigure';
import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { CatalogApi, UserApi } from 'shared/api/orchestrator';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { Color } from 'shared/styles/color';
import { modalStyles } from 'shared/styles/modalStyles';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';
import { AssortmentHeader } from 'components/blackSeries/assortmentHeader';
import { ASSORTMENT } from 'shared/constants/domainConstantSelectors';

const { ACTION_FIGURES } = FB_DB_CONSTANTS;

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
                setCatalogData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records));

            }
        });

        const userRef = UserApi.read(user.id, `${ACTION_FIGURES.ALL}`);
        userRef.on('value', snapshot => {
            if (snapshot.val()) {
                let records = snapshot.val()["BlackSeries6"];
                setUserData(RecordUtils.convertDBNestedObjectsToArrayOfObjects(records));
            }
        });

    }, [initialState, setCatalogData, setUserData, user.id]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const merged = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : [];
    const orangeSeries = SortingUtils.sortDataByAttributeAsc(merged.filter(el => el.assortment === ASSORTMENT.BS_ORANGE), "seriesNumber");
    const blueSeries = SortingUtils.sortDataByAttributeAsc(merged.filter(el => el.assortment === ASSORTMENT.BS_BLUE), "seriesNumber");
    const redSeries = SortingUtils.sortDataByAttributeAsc(merged.filter(el => el.assortment === ASSORTMENT.BS_RED), "seriesNumber");

    const modalSize = { height: '90%', width: '65%' };

    const generateAssortmentSection = (text, backgroundColor, records) => {
        return <>
            <AssortmentHeader text={text} backgroundColor={backgroundColor} />
            <ActionFigure catalog records={records} />
        </>
    };

    const orangeAssort = generateAssortmentSection(ASSORTMENT.BS_ORANGE, 'orange', orangeSeries);
    const blueAssort = generateAssortmentSection(ASSORTMENT.BS_BLUE, 'blue', blueSeries);
    const redAssort = generateAssortmentSection(ASSORTMENT.BS_RED, 'red', redSeries);
    const deluxAssort = generateAssortmentSection(ASSORTMENT.BS_DELUX, 'red', []);
    const annivAssort = generateAssortmentSection(ASSORTMENT.BS_40TH, 'grey', []);
    const vehicleAssort = generateAssortmentSection(ASSORTMENT.BS_VEHICLE, 'yellow', []);
    const centerdAssort = generateAssortmentSection(ASSORTMENT.BS_CENTERPIECE, 'green', []);

    return (
        <Container component='main' maxWidth='lg'>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles(modalSize)}
            >
                <NewCollectibleForm
                    closeModal={closeModal}
                    catalog
                />
            </Modal>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12} className={classes.grid}>
                        <Grid item xs={12} className={classes.newEntryButtonModal}>
                            <ActionButton
                                buttonLabel={'New Entry'}
                                icon={<AddBoxIcon />}
                                onClick={openModal}
                                color={Color.primary('green')}
                            />
                        </Grid>
                        {orangeAssort}
                        {blueAssort}
                        {redAssort}
                        {deluxAssort}
                        {annivAssort}
                        {vehicleAssort}
                        {centerdAssort}
                    </Grid>
                </Grid>
            </div>
        </Container>
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