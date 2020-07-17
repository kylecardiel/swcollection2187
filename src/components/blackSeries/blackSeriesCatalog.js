import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
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
    const [forNowBlackSeriesState] = useState(props);

    const [catalogList, setCatalogList] = useState(null);
    const [userList, setUserList] = useState(null);

    const [mergedList, setMergedList] = useState(null);


    const [orangeSeries, setOrangeSeries] = useState(null);
    const [blueSeries, setBlueSeries] = useState(null);
    const [redSeries, setRedSeries] = useState(null);

    useEffect(() => {
        const catalogRef = CatalogApi.read(`${ACTION_FIGURES.ALL}`);
        catalogRef.on('value', snapshot => {
            if (snapshot.val()) {
                let records = snapshot.val()["BlackSeries6"];
                let catalogList = RecordUtils.convertDBNestedObjectsToArrayOfObjects(records);
                setCatalogList(catalogList);
            }
        });

        const userRef = UserApi.read(user.id, `${ACTION_FIGURES.ALL}`);
        userRef.on('value', snapshot => {
            if (snapshot.val()) {
                let records = snapshot.val()["BlackSeries6"];
                let userList = RecordUtils.convertDBNestedObjectsToArrayOfObjects(records);
                setUserList(userList);
            }
        });

        const merged = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : [];
        setMergedList(merged);

        if(merged.length > 0) {
            setOrangeSeries(SortingUtils.sortDataByAttributeAsc(mergedList.filter(el => el.assortment === ASSORTMENT.BS_ORANGE), "seriesNumber"));
            setBlueSeries(SortingUtils.sortDataByAttributeAsc(mergedList.filter(el => el.assortment === ASSORTMENT.BS_BLUE), "seriesNumber"));
            setRedSeries(SortingUtils.sortDataByAttributeAsc(mergedList.filter(el => el.assortment === ASSORTMENT.BS_RED), "seriesNumber"));
        }

    }, [catalogList, forNowBlackSeriesState, mergedList, user.id, userList]);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    // const total = forNowBlackSeries && forNowBlackSeries.reduce((a, { purchasePrice }) => a + parseInt(purchasePrice, 10), 0);
    // const count = forNowBlackSeries && forNowBlackSeries.length;
    // const sortRecords = forNowBlackSeries && forNowBlackSeries.sort((a, b) => (a.name > b.name) ? 1 : -1);
    const modalSize = { height: '90%', width: '65%' };

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
                        <AssortmentHeader text={ASSORTMENT.BS_ORANGE} backgroundColor={'orange'} />
                        <ActionFigure catalog records={orangeSeries} />
                        <AssortmentHeader text={ASSORTMENT.BS_BLUE} backgroundColor={'blue'} />
                        <ActionFigure catalog records={blueSeries} />
                        <AssortmentHeader text={ASSORTMENT.BS_RED} backgroundColor={'red'} />
                        <ActionFigure catalog records={redSeries} />
                        {/* <Typography component='h1' variant='h5'>
                            {`${count} figures`}
                        </Typography> */}
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