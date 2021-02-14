import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { UserConsumer } from 'components/auth/authContext';
import { ReleaseDetailCard } from 'components/catalog/videoGames/cards/releaseDetailCard';
import { SingleImageDetailCard } from 'components/catalog/common/cards/singleImageDetailCard';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { ActionButton } from 'components/common/buttons/actionButton';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { UserApi } from 'shared/api/userApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { BS_CARD_BUTTONS, PAGES } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { RecordUtils } from 'shared/util/recordUtils';
import { SortingUtils } from 'shared/util/sortingUtil';
import { ROLES } from 'shared/constants/roleConstants';
import { NewVideoGameForm } from 'components/catalog/videoGames/forms/newVideoGameForm';
import { modalStyles } from 'shared/styles/modalStyles';
import Modal from 'react-modal';
import EditIcon from '@material-ui/icons/Edit';

const { HOME, VIDEO_GAMES } = ROUTE_CONSTANTS;

export const VideoGameDetails = ({ catalogList, helperData, videoGameId, screenSize, userList }) => {
    const { email, id } = useContext(UserConsumer);
    const singleList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : catalogList;
    const videoGame = singleList.filter(vg => vg.id === videoGameId)[0];
    const otherGamesInSeries = SortingUtils.sortDataByStringIntAsc(singleList.filter(el => videoGame.videoGameSeries && el.videoGameSeries === videoGame.videoGameSeries && el.id !== videoGame.id), 'year');

    const isMobile = screenSize.isMobileDevice && screenSize.isPortrait;
    const flexFlowDirection = isMobile ? 'column' : 'row';

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(!isModalOpen);
    const closeModal = () => setIsModalOpen(!isModalOpen);
    const modalSize = { height: '85%', width: '85%' };
    const authEditor = email === ROLES.EMAIL;

    const classes = useStyles({ flexFlowDirection });
    const links = [
        {
            route: HOME,
            title: PAGES.HOME_PAGE.TITLE,
        },
        {
            route: VIDEO_GAMES,
            title: PAGES.VIDEO_GAME_CATALOG.TITLE,
        },
    ];

    const [ownedVG, setOwnedVG] = useState(videoGame.owned);

    const addToCollection = () => {
        let newCollectile = {
            catalogId: videoGame.id,
            owned: true,
            purchasePrice: 0,
        };

        setOwnedVG(!ownedVG);
        UserApi.create(id, FB_DB_CONSTANTS.VIDEO_GAMES, newCollectile);
    };

    const removeFromCollection = () => {
        setOwnedVG(!ownedVG);
        UserApi.delete(id, FB_DB_CONSTANTS.VIDEO_GAMES, videoGame.ownedId);
    };

    const onclickCard = () => {
        return ownedVG
            ? () => removeFromCollection()
            : () => addToCollection();
    };


    const imageDetailCard = <SingleImageDetailCard imageUrl={videoGame.imageFile}/>;

    const releaseDetailCard = <ReleaseDetailCard
        developer={videoGame.developer}
        price={videoGame.price}
        videoGameConsole={videoGame.videoGameConsole}
        videoGameFormat={videoGame.videoGameFormat}
        videoGameSeries={videoGame.videoGameSeries}
        videoGameType={videoGame.videoGameType}
        year={videoGame.year}
        otherGamesInSeries={otherGamesInSeries}
    />;


    const collectorButton = <div className={classes.editContainer}>
        <ActionButton
            buttonLabel={ownedVG ? BS_CARD_BUTTONS.REMOVE : BS_CARD_BUTTONS.ADD}
            onClick={onclickCard()}
            color={ownedVG ? Color.red() : Color.green()}
        />
    </div>;

    const editFigureButton = <div className={classes.editContainer}>
        <ActionButton
            icon={<EditIcon />}
            onClick={openModal}
            color={Color.blue()}
        />
    </div>;

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={videoGame.name} />
            <div className={classes.root}>
                <Container component='main' maxWidth='xl'>
                    <div className={classes.root}>
                        <Grid container spacing={1} className={classes.container}>
                            <Grid item xs={12} className={classes.figureHeader}>
                                <FormHeaderSection text={videoGame.name} textColor={'white'} backgroundColor={'black'} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} className={classes.container}>
                            <Grid item md={4} xs={12}>
                                {imageDetailCard}
                                {!isMobile &&
                                    <Grid container direction='row' justify='space-around'>
                                        {collectorButton}
                                        {authEditor && editFigureButton}
                                    </Grid>
                                }
                            </Grid>
                            <Grid item md={8} xs={12} >
                                {releaseDetailCard}
                            </Grid>
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
                    <NewVideoGameForm
                        setIsModalOpen={setIsModalOpen}
                        formData={helperData}
                        item={videoGame}
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
    editContainer: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        maxWidth: '99%',
        display: 'flex',
        justifyContent: 'center',
    },
}));

VideoGameDetails.propTypes = {
    catalogList: PropTypes.array.isRequired,
    helperData: PropTypes.object.isRequired,
    screenSize: PropTypes.object.isRequired,
    userList: PropTypes.array.isRequired,
    videoGameId: PropTypes.string.isRequired,
};