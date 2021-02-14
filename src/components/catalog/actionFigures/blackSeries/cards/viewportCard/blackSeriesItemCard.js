/* eslint-disable react/prop-types */
import { Card, CardMedia, makeStyles } from '@material-ui/core';
import { BlackSeriesCardContent } from 'components/catalog/actionFigures/blackSeries/cards/viewportCard/blackSeriesCardContents';
import { DisplayNameSection } from 'components/catalog/actionFigures/blackSeries/cards/viewportCard/displayName';
import { StorageReferenceConsumer } from 'context/storageReferenceContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { isProduction } from 'shared/util/environment';
import { CollectorButton } from 'components/catalog/actionFigures/blackSeries/button/collectorButton';
import { UserConsumer } from 'components/auth/authContext';

export const BlackSeriesItemCard = ({ item, other }) => {
    const { loggedIn } = useContext(UserConsumer);
    const { commingSoonPhotoUrl } = useContext(StorageReferenceConsumer);
    const { assortments, newBoxImage, showAssortmentHeaders, smallFigureView, sourceMaterials } = other;
    
    const classes = useStyles({ smallFigureView });

    const cardMediaStyle = {
        paddingTop: smallFigureView ? 0 : '60%',
        height: smallFigureView ? 100 : 250,
    };

    const determineImage = (newImageUrl, looseImageUrl) => {
        if (isProduction){
            return newBoxImage ? (newImageUrl || commingSoonPhotoUrl) : (looseImageUrl || commingSoonPhotoUrl);
        } else {
            return IMAGE_PATHS.FILL_MURRAY;
        }
    };

    return (
        <>
            <Card className={classes.card} >
                <DisplayNameSection
                    assortments={assortments}
                    smallFigureView={smallFigureView}
                    sourceMaterials={sourceMaterials}
                    record={item}
                />
                <CardMedia
                    style={cardMediaStyle}
                    image={determineImage(item.newImageUrl, item.looseImageUrl)
                    }
                    title={item.name}
                    src={item.name}
                />
            </Card>
            {!smallFigureView && 
                <BlackSeriesCardContent
                    record={item}
                    showAssortmentHeaders={showAssortmentHeaders}
                    sourceMaterials={sourceMaterials}
                />
            }
            {loggedIn && 
                <CollectorButton 
                    card={true}
                    figureId={item.id}
                    ownedId={item.ownedId}
                    recordOwned={item.owned}
                    smallFigureView={smallFigureView}
                />
            }
        </>
    );
};

const useStyles = makeStyles(() => ({
    card: {
        maxWidth: 325,
        maxHeight: 325,
        borderRadius: 0,
        boxShadow: '0 0 5px',
    },
}));

BlackSeriesItemCard.propTypes = {
    item: PropTypes.object.isRequired,
    other: PropTypes.object.isRequired,
};
