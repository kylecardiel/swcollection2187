import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { StorageReferenceConsumer } from 'context/storageReferenceContext';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { Color } from 'shared/styles/color';
import { isProduction } from 'shared/util/environment';

export const ImageDetailCard = ({ looseImageUrl, newImageUrl }) => {
    const { commingSoonPhotoUrl } = useContext(StorageReferenceConsumer);

    const [newImage, setNewImage] = useState(false);
    const arrowChangeImage = () => setNewImage(!newImage);
    const changeImage = changeTo => setNewImage(changeTo);

    const classes = useStyles();

    const determineImageToUse = image => {
        return isProduction 
            ? image 
                ? image 
                : commingSoonPhotoUrl 
            : IMAGE_PATHS.PLACEHOLDER_TEST_IMAGE;
    };

    const guardedNewImageUrl = determineImageToUse(newImageUrl);
    const guardedLooseImageUrl = determineImageToUse(looseImageUrl);    
    const largeImage = newImage ? guardedNewImageUrl : guardedLooseImageUrl;

    return (
        <Card className={classes.card}>
            <Grid container spacing={2} className={classes.detailsContainer}>
                <Grid xs={1} item className={classes.largeImageArrowContainer} onClick={arrowChangeImage}>
                    <KeyboardArrowLeftIcon />
                </Grid>
                <Grid xs={10} item className={classes.largeImageContainer}>
                    <img className={classes.largeImage} alt='complex' src={largeImage} />
                </Grid>
                <Grid xs={1} item className={classes.largeImageArrowContainer} onClick={arrowChangeImage}>
                    <KeyboardArrowRightIcon />
                </Grid>
                <Divider/>
                <Grid xs={6} item className={classes.smallImageContainer} onClick={() => changeImage(false)}>
                    <img className={classes.smallImage} alt='complex' src={guardedLooseImageUrl} />
                </Grid>
                <Grid xs={6} item className={classes.smallImageContainer} onClick={() => changeImage(true)}>
                    <img className={classes.smallImage} alt='complex' src={guardedNewImageUrl} />
                </Grid>
            </Grid>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    card: {
        marginTop: theme.spacing(1),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    detailsContainer: {
        flexGrow: 1,
        backgroundColor: Color.nearWhite(),
    },
    largeImageArrowContainer: {
        maxheight: 415,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: Color.lightGrey(),
        },
        backgroundColor: Color.white(),
    },
    largeImageContainer: {
        maxheight: 415,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: Color.white(),
    },
    smallImageContainer: {
        maxHeight: 150,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: Color.white(),
    },
    largeImage: {
        flexShrink: 0,
        maxHeight: 375,
    },
    smallImage: {
        flexShrink: 0,
        maxHeight: 125,
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '5px 5px 5px #999',
        },
    },
}));

ImageDetailCard.propTypes = {
    assortment: PropTypes.string.isRequired,
    authEditor: PropTypes.bool.isRequired,
    figureId: PropTypes.string.isRequired,
    isMobile: PropTypes.bool.isRequired,
    looseImageUrl: PropTypes.string,
    newImageUrl: PropTypes.string,
};
