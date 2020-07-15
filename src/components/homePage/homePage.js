import React, { useState, useEffect, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { CommonApi } from 'shared/api/orchestrator';
import Modal from 'react-modal';
import { modalStyles } from 'shared/styles/modalStyles';
import { NewCollectibleForm } from 'components/common/form/newCollectibleForm';
import { ActionButton } from 'components/common/buttons/actionButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { Color } from 'shared/styles/color';
import { RecordUtils } from 'shared/util/recordUtils';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { UserConsumer } from 'components/auth/authContext';

export const Homepage = props => {
    const user = useContext(UserConsumer);
    const classes = useStyles();
    const [forNowBlackSeriesState] = useState(props);
    const [forNowBlackSeries, setForNowBlackSeries] = useState(null);

    useEffect(() => {
        const recordsRef = CommonApi.read(user.id, FB_DB_CONSTANTS.ACTION_FIGURES.ALL);
        recordsRef.on('value', snapshot => {
            if(snapshot.val()){
                let records = snapshot.val()["Black Series 6"];
                let recordList = RecordUtils.convertDBNestedObjectsToArrayOfObjects(records);
                setForNowBlackSeries(recordList);
            }
        });
    }, [forNowBlackSeriesState, user.id]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = record => {
        setIsModalOpen(true);
    }
    const closeModal = () => setIsModalOpen(false);

    const forNowBlackSeriesComponents = forNowBlackSeries && forNowBlackSeries.map(record =>
        <Typography key={record.name} variant='body2' color='textSecondary' component='p'>
            {` ${record.name}/${record.assortment}/$${record.purchasePrice}`}
        </Typography>
    );

    const total = forNowBlackSeries && forNowBlackSeries.reduce((a, {purchasePrice}) => a + parseInt(purchasePrice,10), 0);
    const count = forNowBlackSeries && forNowBlackSeries.length;

    const modalSize = { height: '90%', width: '55%' };

    return (
        <Container component='main' maxWidth='lg'>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={modalStyles(modalSize)}
            >
                <NewCollectibleForm
                    closeModal={closeModal}
                />
            </Modal>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12} className={classes.grid}>
                        <Typography component='h1' variant='h5'>
                            {'Welcome'}
                        </Typography>
                        <Grid item xs={12} className={classes.newEntryButtonModal}>
                            <ActionButton
                                buttonLabel={'New Entry'}
                                icon={<AddBoxIcon />}
                                onClick={openModal}
                                color={Color.primary('green')}
                            />
                        </Grid>
                        <Typography component='h1' variant='h5'>
                            {`$${total} on ${count} figures`}
                        </Typography>
                        {forNowBlackSeriesComponents}
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
}));