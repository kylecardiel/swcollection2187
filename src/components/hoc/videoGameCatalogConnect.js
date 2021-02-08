import { VideoGameCatalog } from 'components/catalog/videoGames/videoGameCatalog';
import React from 'react';
import { connect } from 'react-redux';
import { setVideoGameData } from 'store/dataSet/dataSetActions';
import { getFilterState, getVideoGameList } from 'store/dataSet/dataSetSelector';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';

export const VideoGameCatalogConnect = () => {
    return (<VideoGameCatalog />);
};

export const mapStateToProps = state => ({
    videoGameList: getVideoGameList(state),
    // userList: getUserList(state),
    helperData: getHelperDataSet(state),
    screenSize: getScreenSize(state),
    filterState: getFilterState(state),
});

export const mapDispatchToProps = dispatch => ({
    setVideoGameData: data => dispatch(setVideoGameData(data)),
    // setUserData: data => dispatch(setUserData(data)),
    // setUserDisplaySettings: (settings, value) => dispatch(setUserDisplaySettings(settings, value)),
    // clearUserDisplaySettings: () => dispatch(clearUserDisplaySettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameCatalog);
