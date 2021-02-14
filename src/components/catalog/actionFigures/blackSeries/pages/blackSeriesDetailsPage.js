import BlackSeriesDetailsConnect from 'components/hoc/actionFigures/blackSeries/blackSeriesDetailsConnect';
import PropTypes from 'prop-types';
import React from 'react';

export const BlackSeriesDetailsPage = props => {
    return (
        <BlackSeriesDetailsConnect figureId={props.match.params.id}/>
    );
};

BlackSeriesDetailsPage.propTypes = {
    match: PropTypes.object.isRequired,
};