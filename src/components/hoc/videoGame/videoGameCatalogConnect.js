import { VideoGameCatalog } from 'components/catalog/videoGames/pages/videoGameCatalog';
import React from 'react';
import { connect } from 'react-redux';
import { clearUserDisplaySettings, setUserData, setUserDisplaySettings, setVideoGameData } from 'store/dataSet/dataSetActions';
import { getCatalogList, getVideoGameFilterState, getUserList } from 'store/dataSet/dataSetSelector';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';

export const VideoGameCatalogConnect = () => {
    return (<VideoGameCatalog />);
};

export const mapStateToProps = state => ({
    filterState: getVideoGameFilterState(state),
    helperData: getHelperDataSet(state),
    screenSize: getScreenSize(state),
    userList: getUserList(state),
    videoGameList: getCatalogList(state),
});

export const mapDispatchToProps = dispatch => ({
    setVideoGameData: data => dispatch(setVideoGameData(data)),
    setUserData: data => dispatch(setUserData(data)),
    setUserDisplaySettings: (settings, value) => dispatch(setUserDisplaySettings('videoGames', settings, value)),
    clearUserDisplaySettings: () => dispatch(clearUserDisplaySettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameCatalog);
