import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { ImageDetailCard } from 'components/catalog/videoGames/cards/imageDetailCard';
import { ReleaseDetailCard } from 'components/catalog/videoGames/cards/releaseDetailCard';
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
import { UserConsumer } from 'components/auth/authContext';
import { SortingUtils } from 'shared/util/sortingUtil';

const { HOME, VIDEO_GAMES } = ROUTE_CONSTANTS;

export const VideoGameDetails = ({ catalogList, videoGameId, screenSize, userList }) => {
    const { id } = useContext(UserConsumer);
    const singleList = catalogList && userList ? RecordUtils.mergeTwoArraysByAttribute(catalogList, 'id', userList, 'catalogId') : catalogList;
    const videoGame = singleList.filter(vg => vg.id === videoGameId)[0];
    const otherGamesInSeries = SortingUtils.sortDataByStringIntAsc(singleList.filter(el => videoGame.videoGameSeries && el.videoGameSeries === videoGame.videoGameSeries && el.id !== videoGame.id), 'year');

    const isMobile = screenSize.isMobileDevice && screenSize.isPortrait;
    const flexFlowDirection = isMobile ? 'column' : 'row';

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


    const imageDetailCard = <ImageDetailCard imageUrl={videoGame.imageFile}/>;

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
                            </Grid>
                        }
                    </div>
                </Container>
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
    videoGameId: PropTypes.string.isRequired,
    screenSize: PropTypes.object.isRequired,
    userList: PropTypes.array.isRequired,
};