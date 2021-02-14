import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { UserConsumer } from 'components/auth/authContext';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { ActionButton } from 'components/common/buttons/actionButton';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import { NewCollectibleForm } from 'components/common/form/newCollectibleForm';
import { CollectorButton } from 'components/catalog/actionFigures/blackSeries/button/collectorButton';
import { CharacterDetailCard } from 'components/catalog/actionFigures/blackSeries/cards/characterDetailCard';
import { CollectorDetailCard } from 'components/catalog/actionFigures/blackSeries/cards/collectorDetailCard';
import { ImageDetailCard } from 'components/catalog/actionFigures/blackSeries/cards/imageDetailCard';
import { ReleaseDetailCard } from 'components/catalog/actionFigures/blackSeries/cards/releaseDetailCard';
import { getAssortmentColor, getSourceColor } from 'components/catalog/actionFigures/blackSeries/helpers/figureColors';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { ROLES } from 'shared/constants/roleConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { modalStyles } from 'shared/styles/modalStyles';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';

const { HOME, BLACK_SERIES } = ROUTE_CONSTANTS;

export const ActionFigureDetails = ({ assortments, catalogList, figureId, helperData, screenSize, sourceMaterials, userList }) => {
    const { id, email } = useContext(UserConsumer);
    const singleList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : catalogList;
    const figure = singleList.filter(f => f.id === figureId)[0];
    const similarFigures = SortingUtils.sortDataByStringIntAsc(singleList.filter(el => el.name === figure.name && el.id !== figure.id), 'year');
    const multipackFigures = singleList.filter(el => el.multipack !== '' && el.multipack === figure.multipack && el.id !== figure.id);

    const isMobile = screenSize.isMobileDevice && screenSize.isPortrait;
    const flexFlowDirection = isMobile ? 'column' : 'row';

    const assortmentBackgroundColor = () => {
        const isSeries4 = figure.assortment === 'Series 4.0';
        let color = '';
        if (isSeries4) {
            const sourceMaterialColors = getSourceColor(sourceMaterials, figure.sourceMaterial);
            color = sourceMaterialColors.backgroundColor;
        } else {
            const assortmentColors = getAssortmentColor(assortments, figure.assortment);
            color = assortmentColors.backgroundColor;
        }
        return color;
    };

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

    const editFigureButton = <div className={classes.editContainer}>
        <ActionButton
            icon={<EditIcon />}
            onClick={openModal}
            color={Color.blue()}
        />
    </div>;

    const releaseDetails = <ReleaseDetailCard 
        assortment={figure.assortment}
        assortmentBackgroundColor={assortmentBackgroundColor()}
        assortmentNumber={figure.seriesNumber}
        exclusiveRetailer={figure.exclusiveRetailer}
        multipack={figure.multipack}
        multipackQuantity={multipackFigureQty}
        packageType={figure.packageType}
        retailPrice={figure.retailPrice}
        wave={figure.wave}
        year={figure.year}
    />;

    const characterDetails = <CharacterDetailCard 
        groups={figure.groups}
        multipack={figure.multipack}
        multipackFigures={multipackFigures}
        name={figure.name}
        similarFigures={similarFigures}
        sourceMaterial={figure.sourceMaterial}
    />;

    const collectorDetails = <CollectorDetailCard
        looseCompleteQtyInput={figure.looseCompleteQty}
        looseIncompleteQtyInput={figure.looseIncompleteQty}
        newInBoxQtyInput={figure.newInBoxQty}
        ownedId={figure.ownedId}
        userId={id}
    />;

    const collectorButton = <div className={classes.editContainer}>
        <CollectorButton 
            figureId={figure.id}
            ownedId={figure.ownedId}
            recordOwned={figure.owned}
            smallFigureView={false}
            card={false}
        />
    </div>;

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
                                {!isMobile &&
                                    <Grid container direction='row' justify='space-around'>
                                        {collectorButton}
                                        {authEditor && editFigureButton}
                                    </Grid>
                                }
                            </Grid>
                            <Grid item md={8} xs={12} >
                                {releaseDetails}
                                {!isMobile && characterDetails}
                                {!isMobile && !isModalOpen && figure.owned && collectorDetails}
                            </Grid>
                            <Grid item md={4} xs={12} >
                                {isMobile && characterDetails}
                            </Grid>
                            {isMobile && !isModalOpen && figure.owned &&
                                <Grid item md={4} xs={12} >
                                    {collectorDetails}
                                </Grid>
                            }
                        </Grid>
                        {isMobile &&
                            <Grid item xs={12} container direction='row' justify='space-around'>
                                {collectorButton}
                                {authEditor && editFigureButton}
                            </Grid>
                        }
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
        justifyContent: 'flex-start',
    },
    editContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        maxWidth: '99%',
        display: 'flex',
        justifyContent: 'center',
    },
}));

ActionFigureDetails.propTypes = {
    assortments: PropTypes.array.isRequired,
    catalogList: PropTypes.array.isRequired,
    figureId: PropTypes.string.isRequired,
    helperData: PropTypes.object.isRequired,
    screenSize: PropTypes.object.isRequired,
    sourceMaterials: PropTypes.array.isRequired,
    userList: PropTypes.array.isRequired,
};