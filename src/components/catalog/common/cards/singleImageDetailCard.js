import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { StorageReferenceConsumer } from 'context/storageReferenceContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { Color } from 'shared/styles/color';
import { isProduction } from 'shared/util/environment';

export const SingleImageDetailCard = ({ imageUrl }) => {
    const { commingSoonPhotoUrl } = useContext(StorageReferenceConsumer);

    const classes = useStyles();

    const determineImageToUse = image => {
        return isProduction 
            ? image 
                ? image 
                : commingSoonPhotoUrl 
            : IMAGE_PATHS.FILL_MURRAY;
    };

    return (
        <Card className={classes.card}>
            <Grid container spacing={2} className={classes.detailsContainer}>
                <Grid xs={12} item className={classes.largeImageContainer}>
                    <img className={classes.largeImage} alt='complex' src={determineImageToUse(imageUrl)} />
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
    largeImageContainer: {
        maxheight: 415,
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
}));

SingleImageDetailCard.propTypes = {
    imageUrl: PropTypes.string,
};
