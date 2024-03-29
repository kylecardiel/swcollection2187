import VideoGameDetailsConnect from 'components/hoc/videoGame/videoGameDetailsConnect';
import { useLocation } from 'react-router-dom';
import React from 'react';

export const VideoGameDetailsPage = () => {
    let { state: { id } } = useLocation();
    return (
        <VideoGameDetailsConnect videoGameId={id}/>
    );
};
