import { VideoGameDetails } from 'components/catalog/videoGames/videoGameDetails';
import React from 'react';
import { connect } from 'react-redux';
import { getCatalogList, getUserList } from 'store/dataSet/dataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';

export const VideoGameDetailsConnect = () => {
    return ( 
        <VideoGameDetails /> 
    );
};

export const mapStateToProps = (state, ownProps) => ({
    videoGameId: ownProps.match.params.id,
    catalogList: getCatalogList(state),
    userList: getUserList(state),
    screenSize: getScreenSize(state),
});

export default connect(mapStateToProps)(VideoGameDetails);