import { VideoGameDetails } from 'components/catalog/videoGames/pages/videoGameDetails';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { RecordUtils } from 'shared/util/recordUtils';
import { getVideoGameCatalogList } from 'store/dataSet/dataSetSelector';
import { getUserVideoGames } from 'store/firebase/dataSetSelector';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';

export const VideoGameDetailsConnect = ({ videoGameId }) => {
    return ( 
        <VideoGameDetails videoGameId={videoGameId}/> 
    );
};

export const mapStateToProps = state => ({
    catalogList: getVideoGameCatalogList(state),
    helperData: getHelperDataSet(state),
    screenSize: getScreenSize(state),
    userList: RecordUtils.convertDBNestedObjectsToArrayOfObjects(getUserVideoGames(state), 'ownedId'),
});

export default connect(mapStateToProps)(VideoGameDetails);

VideoGameDetailsConnect.propTypes = {
    videoGameId: PropTypes.string.isRequired,
};