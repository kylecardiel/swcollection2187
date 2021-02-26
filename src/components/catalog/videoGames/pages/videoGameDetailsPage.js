import VideoGameDetailsConnect from 'components/hoc/videoGame/videoGameDetailsConnect';
import { useParams } from 'react-router-dom';
import React from 'react';

export const VideoGameDetailsPage = () => {
    let { id } = useParams();
    return (
        <VideoGameDetailsConnect videoGameId={id}/>
    );
};
