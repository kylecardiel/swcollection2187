import React, { useContext, useState } from 'react';
import { ActionButton } from 'components/common/buttons/actionButton';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import { CharacterDetailCard } from 'components/display/details/cards/characterDetailCard';
import { CollectorDetailCard } from 'components/display/details/cards/collectorDetailCard';
import { Color } from 'shared/styles/color';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import Grid from '@material-ui/core/Grid';
import { ImageDetailCard } from 'components/display/details/cards/imageDetailCard';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import { modalStyles } from 'shared/styles/modalStyles';
import { NewCollectibleForm } from 'components/common/form/newCollectibleForm';
import PropTypes from 'prop-types';
import { RecordUtils } from 'shared/util/recordUtils';
import { ReleaseDetailCard } from 'components/display/details/cards/releaseDetailCard';
import { ROLES } from 'shared/constants/roleConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { SortingUtils } from 'shared/util/sortingUtil';
import { UserConsumer } from 'components/auth/authContext';

const { HOME, BLACK_SERIES } = ROUTE_CONSTANTS;

export const ActionFigureDetails = ({ catalogList, figureId, helperData, screenSize, userList }) => {
    const { id, email } = useContext(UserConsumer);
    const singleList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : catalogList;
    const figure = singleList.filter(f => f.id === figureId)[0];
    const similarFigures = SortingUtils.sortDataByStringIntAsc(singleList.filter(el => el.name === figure.name && el.id !== figure.id), 'year');
    const multipackFigures = singleList.filter(el => el.multipack !== '' && el.multipack === figure.multipack && el.id !== figure.id);

    const isMobile = screenSize.isMobileDevice && screenSize.isPortrait;
    const flexFlowDirection = isMobile ? 'column' : 'row';

    const classes = useStyles({ flexFlowDirection });
    const headerText = figure.additionalNameDetails ? `${figure.name} (${figure.additionalNameDetails})` : figure.name;

    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
        {
            route: BLACK_SERIES,
            title: PAGES.BLACK_SERIES_CATALOG.TITLE,
        },
    ];

    const currentTitleBreadCrumbs = figure.additionalNameDetails
        ? `${figure.name} (${figure.additionalNameDetails})`
        : `${figure.name}`;

    const multipackFigureQty = multipackFigures.length + 1;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(!isModalOpen);
    const modalSize = { height: '85%', width: '85%' };
    const authEditor = email === ROLES.EMAIL;

    const editFigureButton = () => {
        return <div className={classes.editContainer}>
            <ActionButton
                buttonLabel={'Edit Figure Details'}
                icon={<EditIcon />}
                onClick={openModal}
                color={Color.blue()}
            />
        </div>;
    };

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={currentTitleBreadCrumbs} />
            <div className={classes.root}>
                <Container component='main' maxWidth='xl'>
                    <div className={classes.root}>
                        <Grid container spacing={1} className={classes.container}>
                            <Grid item xs={12} className={classes.figureHeader}>
                                <FormHeaderSection text={headerText} textColor={'white'} backgroundColor={'black'} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className={classes.container}>
                            <Grid item md={4} xs={12}>
                                <ImageDetailCard
                                    looseImageUrl={figure.looseImageUrl}
                                    newImageUrl={figure.newImageUrl}
                                />
                            </Grid>
                            <Grid item md={8} xs={12} >
                                <ReleaseDetailCard 
                                    assortment={figure.assortment}
                                    assortmentNumber={figure.seriesNumber}
                                    exclusiveRetailer={figure.exclusiveRetailer}
                                    multipack={figure.multipack}
                                    multipackQuantity={multipackFigureQty}
                                    packageType={figure.packageType}
                                    retailPrice={figure.retailPrice}
                                    wave={figure.wave}
                                    year={figure.year}
                                />
                                {!isMobile && 
                                    <CharacterDetailCard 
                                        name={figure.name}
                                        similarFigures={similarFigures}
                                        sourceMaterial={figure.sourceMaterial}
                                        multipack={figure.multipack}
                                        multipackFigures={multipackFigures}
                                    />
                                }
                                {!isMobile && !isModalOpen && figure.owned &&
                                    <CollectorDetailCard
                                        looseCompleteQtyInput={figure.looseCompleteQty}
                                        looseIncompleteQtyInput={figure.looseIncompleteQty}
                                        newInBoxQtyInput={figure.newInBoxQty}
                                        ownedId={figure.ownedId}
                                        userId={id}
                                    />
                                }
                            </Grid>
                            <Grid item md={4} xs={12} >
                                {isMobile && 
                                    <CharacterDetailCard 
                                        name={figure.name}
                                        similarFigures={similarFigures}
                                        sourceMaterial={figure.sourceMaterial}
                                        multipack={figure.multipack}
                                        multipackFigures={multipackFigures}
                                    />
                                }
                            </Grid>
                            {isMobile && !isModalOpen && figure.owned &&
                                    <Grid item md={4} xs={12} >
                                        <CollectorDetailCard
                                            looseCompleteQtyInput={figure.looseCompleteQty}
                                            looseIncompleteQtyInput={figure.looseIncompleteQty}
                                            newInBoxQtyInput={figure.newInBoxQty}
                                            ownedId={figure.ownedId}
                                            userId={id}
                                        />
                                    </Grid>
                            }
                        </Grid>
                        <Grid item xs={12} >
                            {authEditor && editFigureButton()}
                        </Grid>
                    </div>
                </Container>
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    style={modalStyles(modalSize)}
                >
                    <NewCollectibleForm
                        closeModal={closeModal}
                        catalog
                        formData={helperData}
                        figure={figure}
                    />
                </Modal>
            </div>
        </React.Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    figureHeader: {
        marginTop: theme.spacing(3),
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(-2),
        maxWidth: '99%',
        display: 'flex',
        justifyContent: 'center',
    },
}));

ActionFigureDetails.propTypes = {
    catalogList: PropTypes.array.isRequired,
    figureId: PropTypes.string.isRequired,
    helperData: PropTypes.object.isRequired,
    screenSize: PropTypes.object.isRequired,
    userList: PropTypes.array.isRequired,
};