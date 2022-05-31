import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { DisplayNameSection } from 'components/catalog/actionFigures/vintageCollection/cards/viewportCard/displayName';
import { StorageReferenceConsumer } from 'context/storageReferenceContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { Color } from 'shared/styles/color';
import { isProduction } from 'shared/util/environment';

export const VintageCollectionCard = ({ item }) => {
    const { commingSoonPhotoUrl } = useContext(StorageReferenceConsumer);
    const {  
        additionalNameDetails,
        name,
        newImageUrl,
        seriesNumber,
        year,
    } = item;

    const classes = useStyles();

    const centeredRowText = text => {
        return <Grid container direction='row' justifyContent='center'>
            <Typography variant='body2' component='p'>
                {text}
            </Typography>
        </Grid>;
    };

    return (
        <Card className={classes.root}>
            <DisplayNameSection 
                name={name}
                seriesNumber={seriesNumber}
            />
            <CardMedia
                className={classes.media}
                image={isProduction ? ( newImageUrl || commingSoonPhotoUrl) : IMAGE_PATHS.FILL_MURRAY}
                title={name}
            />
            <CardContent className={classes.cardContent}>
                {centeredRowText(additionalNameDetails || '-' )}
                {centeredRowText(year)}
            </CardContent>
        </Card>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 250,
    },
    media: {
        height: 150,
        paddingTop: '75%',
    },
    collectorButton: {
        paddingTop: theme.spacing(1),
    },
    cardContent: {
        color: Color.white(),
        backgroundColor: Color.black(),
    },
}));

VintageCollectionCard.propTypes = {
    item: PropTypes.object.isRequired,
};
