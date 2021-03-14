import { MediaCard } from 'components/common/cards/mediaCard';
import React, { useState } from 'react';
import { IMAGE_PATHS } from 'shared/constants/imagePaths';
import { ROUTE_CONSTANTS } from 'shared/constants/routeConstants';
import { HOME_PAGE } from 'shared/constants/stringConstantsSelectors';

const { HOME_PAGE: { ACTION_FIGURES: { BLACK_SERIES } } } = IMAGE_PATHS;

export const BlackSeriesHomPageCard = () => {
    // const imageArray = [BLACK_SERIES.HEROES, BLACK_SERIES.TROOPERS, BLACK_SERIES.VILLIANS];
    // const [currentImage, setCurrentImage] = useState(0);
    
    // setInterval(() => {
    //     let updateImageCount;
    //     if (currentImage < 2){
    //         updateImageCount = currentImage + 1;
    //     } else {
    //         updateImageCount = 0;
    //     }
    //     setCurrentImage(updateImageCount);
    // }, 3000);

    const heroCard = <MediaCard
        cardText={HOME_PAGE.CARDS.BLACK_SERIES}
        route={ROUTE_CONSTANTS.ACTION_FIGURES.BLACK_SERIES}
        imagePath={BLACK_SERIES.HEROES}
    />;

    const trooperCard = <MediaCard
        cardText={HOME_PAGE.CARDS.BLACK_SERIES}
        route={ROUTE_CONSTANTS.ACTION_FIGURES.BLACK_SERIES}
        imagePath={BLACK_SERIES.TROOPERS}
    />;

    const villianCard = <MediaCard
        cardText={HOME_PAGE.CARDS.BLACK_SERIES}
        route={ROUTE_CONSTANTS.ACTION_FIGURES.BLACK_SERIES}
        imagePath={BLACK_SERIES.VILLIANS}
    />;

    const cardArray = [heroCard, trooperCard, villianCard];
    const [currentImage, setCurrentImage] = useState(0);


    return (
        <>{cardArray[currentImage]}</>
    );
};