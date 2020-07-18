import React, { useState } from 'react';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import { UploadImage } from 'components/admin/uploadImage';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { NewCollectibleForm } from 'components/common/form/newCollectibleForm';
import Modal from 'react-modal';
import { modalStyles } from 'shared/styles/modalStyles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { ActionButton } from 'components/common/buttons/actionButton';
import { Color } from 'shared/styles/color';

const { HOME } = ROUTE_CONSTANTS;

export const Admin = () => {
    const classes = useStyles();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const modalSize = { height: '90%', width: '65%' };

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
    ];

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={PAGES.ADMIN.TITLE} />
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
                        <Grid item xs={12}>
                            <ActionButton
                                buttonLabel={'New Entry'}
                                icon={<AddBoxIcon />}
                                onClick={openModal}
                                color={Color.primary('green')}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <UploadImage />
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
        margin: theme.spacing(3),
    },
}));