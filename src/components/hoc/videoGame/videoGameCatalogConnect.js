import { VideoGameCatalog } from 'components/catalog/videoGames/pages/videoGameCatalog';
import React from 'react';
import { connect } from 'react-redux';
import { clearUserDisplaySettings, setUserData, setUserDisplaySettings, setCatalogData } from 'store/dataSet/dataSetActions';
import { getVideoGameCatalogList, getVideoGameFilterState, getVideoGameUserList, VIDEO_GAME_SUB_CATALOG } from 'store/dataSet/dataSetSelector';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';

export const VideoGameCatalogConnect = () => {
    return (<VideoGameCatalog />);
};

export const mapStateToProps = state => ({
    filterState: getVideoGameFilterState(state),
    helperData: getHelperDataSet(state),
    screenSize: getScreenSize(state),
    userList: getVideoGameUserList(state),
    videoGameList: getVideoGameCatalogList(state),
});

export const mapDispatchToProps = dispatch => ({
    setVideoGameData: data => dispatch(setCatalogData(VIDEO_GAME_SUB_CATALOG, data)),
    setUserData: data => dispatch(setUserData(VIDEO_GAME_SUB_CATALOG, data)),
    setUserDisplaySettings: (settings, value) => dispatch(setUserDisplaySettings(VIDEO_GAME_SUB_CATALOG, settings, value)),
    clearUserDisplaySettings: () => dispatch(clearUserDisplaySettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameCatalog);
