import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getVideoGameCatalogList } from 'store/dataSet/dataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';
import { VideoGameDetails } from 'components/catalog/videoGames/pages/videoGameDetails';
import { VideoGameHelper } from 'components/catalog/videoGames/videoGameHelper';

export const VideoGameDetailsConnect = ({ videoGame }) => {
    return ( 
        <VideoGameDetails videoGame={videoGame}/> 
    );
};

export const mapStateToProps = (state, ownProps) => {
    const otherGamesInSeries = VideoGameHelper.getOtherGamesInSeries(getVideoGameCatalogList(state), ownProps.videoGame);
    const screenSize = getScreenSize(state);
    const isMobile = screenSize.isMobileDevice && screenSize.isPortrait;

    return {
        otherGamesInSeries,
        isMobile,
    };
};

export default connect(mapStateToProps)(VideoGameDetails);

VideoGameDetailsConnect.propTypes = {
    videoGame: PropTypes.object.isRequired,
};