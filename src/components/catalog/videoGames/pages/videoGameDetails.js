import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { UserConsumer } from 'components/auth/authContext';
import { SingleImageDetailCard } from 'components/catalog/common/cards/singleImageDetailCard';
import { ReleaseDetailCard } from 'components/catalog/videoGames/cards/releaseDetailCard';
import NewVideoGameForm from 'components/catalog/videoGames/forms/newVideoGameForm';
import { CommonBreadCrumbs } from 'components/common/breadcrums/breadcrumbs';
import { ActionButton } from 'components/common/buttons/actionButton';
import { FormHeaderSection } from 'components/common/form/formHeaderSection';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import { UserApi } from 'shared/api/userApi';
import { FB_DB_CONSTANTS } from 'shared/constants/databaseRefConstants';
import { ROLES } from 'shared/constants/roleConstants';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { BS_CARD_BUTTONS, PAGES } from 'shared/constants/stringConstantsSelectors';
import { Color } from 'shared/styles/color';
import { modalStyles } from 'shared/styles/modalStyles';

const { HOME, VIDEO_GAMES } = ROUTE_CONSTANTS;

export const VideoGameDetails = ({ otherGamesInSeries, isMobile, videoGame }) => {
    const { email, id } = useContext(UserConsumer);
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

    const content = <div className={classes.root}>
        <Grid container spacing={1} className={classes.container}>
            <Grid item xs={12} className={classes.figureHeader}>
                <FormHeaderSection text={videoGame.name} textColor={'white'} backgroundColor={'black'} />
            </Grid>
        </Grid>
        <Grid container spacing={1} className={classes.container}>
            <Grid item md={4} xs={12}>
                {imageDetailCard}
                {!isMobile &&
                <Grid container direction='row' justifyContent='space-around'>
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
        <Grid item xs={12} container direction='row' justifyContent='space-around'>
            {collectorButton}
            {authEditor && editFigureButton}
        </Grid>
        }
    </div>;

    const dynamicContent = isMobile ? content : <Container component='main' maxWidth='xl'>{content}</Container>;

    return (
        <React.Fragment>
            <CommonBreadCrumbs links={links} currentTitle={videoGame.name} />
            <div className={classes.root}>
                {dynamicContent}
                <Modal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    style={modalStyles(modalSize)}
                >
                    <NewVideoGameForm
                        setIsModalOpen={setIsModalOpen}
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
    otherGamesInSeries: PropTypes.array,
    isMobile: PropTypes.bool.isRequired,
    videoGame: PropTypes.object,
};