import VideoGameDetailsConnect from 'components/hoc/videoGame/videoGameDetailsConnect';
import PropTypes from 'prop-types';
import React from 'react';

export const VideoGameDetailsPage = props => {
    return (
        <VideoGameDetailsConnect videoGameId={props.match.params.id}/>
    );
};

VideoGameDetailsPage.propTypes = {
    match: PropTypes.object.isRequired,
};