import React, { useContext, useState } from 'react';
import { Color } from 'shared/styles/color';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { StorageReferenceConsumer } from 'context/storageReferenceContext';

export const ImageDetails = ({ looseImageUrl, newImageUrl }) => {
    const { commingSoonPhotoUrl } = useContext(StorageReferenceConsumer);

    const [newImage, setNewImage] = useState(false);
    const changeImage = () => setNewImage(!newImage);

    const classes = useStyles();

    const guardedNewImageUrl = newImageUrl ? newImageUrl : commingSoonPhotoUrl;
    const guardedLooseImageUrl = looseImageUrl ? looseImageUrl : commingSoonPhotoUrl;
    const largeImage = newImage ? guardedNewImageUrl : guardedLooseImageUrl;


    return (
        <Grid container spacing={2} className={classes.detailsContainer}>
            <Grid xs={1} item className={classes.largeImageArrowContainer} onClick={changeImage}>
                <KeyboardArrowLeftIcon />
            </Grid>
            <Grid xs={10} item className={classes.largeImageContainer}>
                <img className={classes.largeImage} alt='complex' src={largeImage} />
            </Grid>
            <Grid xs={1} item className={classes.largeImageArrowContainer} onClick={changeImage}>
                <KeyboardArrowRightIcon />
            </Grid>
            <Grid xs={6} item className={classes.smallImageContainer}>
                <img className={classes.smallImage} alt='complex' src={guardedLooseImageUrl} />
            </Grid>
            <Grid xs={6} item className={classes.smallImageContainer}>
                <img className={classes.smallImage} alt='complex' src={guardedNewImageUrl} />
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    detailsContainer: {
        flexGrow: 1,
        backgroundColor: Color.white(),
    },
    largeImageArrowContainer: {
        border: '2px solid black',
        minHeight: 375,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: Color.grey(),
        },
    },
    largeImageContainer: {
        border: '2px solid black',
        minHeight: 375,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    smallImageContainer: {
        border: '2px solid black',
        maxHeight: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    largeImage: {
        flexShrink: 0,
        maxHeight: 375,
    },
    smallImage: {
        flexShrink: 0,
        maxHeight: 125,
    },
}));

ImageDetails.propTypes = {
    looseImageUrl: PropTypes.string.isRequired,
    newImageUrl: PropTypes.string.isRequired,
};