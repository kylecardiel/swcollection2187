import { VideoGameCatalog } from 'components/catalog/videoGames/pages/videoGameCatalog';
import React from 'react';
import { connect } from 'react-redux';
import { RecordUtils } from 'shared/util/recordUtils';
import { setVideoGameData } from 'store/dataSet/dataSetActions';
import { getCatalogList } from 'store/dataSet/dataSetSelector';
import { getUserVideoGames } from 'store/firebase/dataSetSelector';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';

export const VideoGameCatalogConnect = () => {
    return (<VideoGameCatalog />);
};

export const mapStateToProps = state => ({
    helperData: getHelperDataSet(state),
    screenSize: getScreenSize(state),
    userList: RecordUtils.convertDBNestedObjectsToArrayOfObjects(getUserVideoGames(state), 'ownedId'),
    videoGameList: getCatalogList(state),
});

export const mapDispatchToProps = dispatch => ({
    setVideoGameData: data => dispatch(setVideoGameData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameCatalog);
