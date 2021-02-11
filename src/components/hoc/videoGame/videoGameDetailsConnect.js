import { VideoGameDetails } from 'components/catalog/videoGames/pages/videoGameDetails';
import React from 'react';
import { connect } from 'react-redux';
import { getCatalogList, getUserList } from 'store/dataSet/dataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';
import PropTypes from 'prop-types';

export const VideoGameDetailsConnect = ({ videoGameId }) => {
    return ( 
        <VideoGameDetails videoGameId={videoGameId}/> 
    );
};

export const mapStateToProps = state => ({
    catalogList: getCatalogList(state),
    userList: getUserList(state),
    screenSize: getScreenSize(state),
});

export default connect(mapStateToProps)(VideoGameDetails);

VideoGameDetailsConnect.propTypes = {
    videoGameId: PropTypes.string.isRequired,
};