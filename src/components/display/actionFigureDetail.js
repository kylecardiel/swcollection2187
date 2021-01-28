import React, { useContext, useState } from 'react';
import { ActionButton } from 'components/common/buttons/actionButton';
import { PAGES } from 'shared/constants/stringConstantsSelectors';
import { CharacterDetail } from 'components/display/details/characterDetail';
import { Color } from 'shared/styles/color';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import Container from '@material-ui/core/Container';
import EditIcon from '@material-ui/icons/Edit';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import { getSourceColor, getAssortmentColor } from 'components/display/figureColors';
import Grid from '@material-ui/core/Grid';
import { ImageDetails } from 'components/display/details/imageDetail';
import { makeStyles } from '@material-ui/core/styles';
import Modal from 'react-modal';
import { modalStyles } from 'shared/styles/modalStyles';
import { NewCollectibleForm } from 'components/common/form/newCollectibleForm';
import { OwnerDetails } from 'components/display/details/ownerDetail';
import PropTypes from 'prop-types';
import { RecordUtils } from 'shared/util/recordUtils';
import { ReleaseDetails } from 'components/display/details/releaseDetail';
import { ROLES } from 'shared/constants/roleConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { SortingUtils } from 'shared/util/sortingUtil';
import Typography from '@material-ui/core/Typography';
import { UserConsumer } from 'components/auth/authContext';

const { HOME, BLACK_SERIES } = ROUTE_CONSTANTS;

export const ActionFigureDetails = ({ figureId, catalogList, userList, sourceMaterials, assortments, screenSize, helperData }) => {
    const { id, email } = useContext(UserConsumer);

    const singleList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : catalogList;
    const figure = singleList.filter(f => f.id === figureId)[0];
    const similarFigures = SortingUtils.sortDataByStringIntAsc(singleList.filter(el => el.name === figure.name && el.id !== figure.id), 'year');
    const multipackFigures = singleList.filter(el => el.multipack !== '' && el.multipack === figure.multipack && el.id !== figure.id);

    const numberBackgroundColor = () => {
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

    const flexFlowDirection = screenSize.isMobileDevice && screenSize.isPortrait ? 'column' : 'row';

    const classes = useStyles({ seriesColor: Color.primary(numberBackgroundColor()), flexFlowDirection });
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

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={currentTitleBreadCrumbs} />
            <div className={classes.root}>
                <FormHeaderSection text={headerText} textColor={'white'} backgroundColor={'black'} />
                <Container maxWidth='sm' className={classes.container}>
                    <Grid container spacing={2} className={classes.gridContainer}>
                        <Grid xs={12} md={5} item className={classes.verticalContainer}>
                            <ImageDetails
                                looseImageUrl={figure.looseImageUrl}
                                newImageUrl={figure.newImageUrl}
                            />
                        </Grid>
                        <Grid xs={12} md={7} item className={classes.verticalContainer}>
                            <Grid container spacing={2} className={classes.detailsContainer}>
                                <ReleaseDetails
                                    assortment={figure.assortment}
                                    exclusiveRetailer={figure.exclusiveRetailer}
                                    multipack={figure.multipack}
                                    multipackQuantity={multipackFigureQty}
                                    retailPrice={figure.retailPrice}
                                    wave={figure.wave}
                                    year={figure.year}
                                />
                                <Grid xs={12} md={2} item className={classes.seriesNumberComp}>
                                    <Typography variant='h3' className={classes.seriesNumberText} >
                                        {figure.seriesNumber}
                                    </Typography>
                                </Grid>
                                <CharacterDetail 
                                    name={figure.name}
                                    similarFigures={similarFigures}
                                    sourceMaterial={figure.sourceMaterial}
                                    multipack={figure.multipack}
                                    multipackFigures={multipackFigures}
                                />
                                {!isModalOpen && figure.owned &&
                                    <OwnerDetails 
                                        looseCompleteQtyInput={figure.looseCompleteQty}
                                        looseIncompleteQtyInput={figure.looseIncompleteQty}
                                        newInBoxQtyInput={figure.newInBoxQty}
                                        ownedId={figure.ownedId}
                                        userId={id}
                                    />
                                }
                            </Grid>
                        </Grid>
                    </Grid>
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
                {authEditor &&
                    <div className={classes.editContainer}>
                        <ActionButton
                            buttonLabel={'Edit Figure Details'}
                            icon={<EditIcon />}
                            onClick={openModal}
                            color={Color.blue()}
                        />
                    </div>
                }
            </div>
        </React.Fragment>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: theme.spacing(2),
    },
    container: {
        padding: theme.spacing(3),
        margin: theme.spacing(1),
        maxWidth: '99%',
        height: '75vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editContainer: {
        maxWidth: '99%',
        display: 'flex',
        justifyContent: 'flex-start',
    },
    gridContainer: {
        display: 'flex',
        flexFlow: props => props.flexFlowDirection,
        height: '70vh',
    },
    verticalContainer: {
        flexGrow: 1,
        display: 'flex',
        flexFlow: 'column',
        height: '69vh',
    },
    detailsContainer: {
        flexGrow: 1,
        backgroundColor: Color.white(),
    },
    seriesNumberComp: {
        border: '2px solid black',
        backgroundColor: props => props.seriesColor,
        textAlign: 'center',
    },
    seriesNumberText: {
        paddingTop: theme.spacing(5),
    },
}));

ActionFigureDetails.propTypes = {
    figureId: PropTypes.string.isRequired,
    catalogList: PropTypes.array.isRequired,
    userList: PropTypes.array.isRequired,
    sourceMaterials: PropTypes.array.isRequired,
    assortments: PropTypes.array.isRequired,
    screenSize: PropTypes.object.isRequired,
    helperData: PropTypes.object.isRequired,
};