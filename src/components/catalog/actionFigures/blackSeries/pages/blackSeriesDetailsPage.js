import BlackSeriesDetailsConnect from 'components/hoc/actionFigures/blackSeries/blackSeriesDetailsConnect';
import React from 'react';
import { useParams } from 'react-router-dom';

export const BlackSeriesDetailsPage = () => {
    let { id } = useParams();
    return (
        <BlackSeriesDetailsConnect figureId={id}/>
    );
};
