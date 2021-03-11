import BlackSeriesDetailsConnect from 'components/hoc/actionFigures/blackSeries/blackSeriesDetailsConnect';
import React from 'react';
import { useLocation } from 'react-router-dom';

export const BlackSeriesDetailsPage = () => {
    let { state: { id } } = useLocation();
    return (
        <BlackSeriesDetailsConnect figureId={id}/>
    );
};
