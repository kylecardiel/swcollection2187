import Card from '@material-ui/core/Card';
import { Color } from 'shared/styles/color';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { StorageReferenceConsumer } from 'context/storageReferenceContext';

export const ImageDetailCard = ({ looseImageUrl, newImageUrl }) => {
    const { commingSoonPhotoUrl } = useContext(StorageReferenceConsumer);

    const [newImage, setNewImage] = useState(false);
    const changeImage = changeTo => {
        const changeImage = changeTo === undefined ? !newImage : changeTo;
        setNewImage(changeImage);
    };

    const classes = useStyles();

    const guardedNewImageUrl = newImageUrl ? newImageUrl : commingSoonPhotoUrl;
    const guardedLooseImageUrl = looseImageUrl ? looseImageUrl : commingSoonPhotoUrl;
    const largeImage = newImage ? guardedNewImageUrl : guardedLooseImageUrl;

    return (
        <Card className={classes.card}>
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
            backgroundColor: Color.grey(),
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
    },
}));

ImageDetailCard.propTypes = {
    looseImageUrl: PropTypes.string,
    newImageUrl: PropTypes.string,
};
