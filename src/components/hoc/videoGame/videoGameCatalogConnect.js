import { VideoGameCatalog } from 'components/catalog/videoGames/pages/videoGameCatalog';
import React from 'react';
import { connect } from 'react-redux';
import { setUserData, setVideoGameData } from 'store/dataSet/dataSetActions';
import { getCatalogList, getUserList } from 'store/dataSet/dataSetSelector';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';

export const VideoGameCatalogConnect = () => {
    return (<VideoGameCatalog />);
};

export const mapStateToProps = state => ({
    helperData: getHelperDataSet(state),
    screenSize: getScreenSize(state),
    userList: getUserList(state),
    videoGameList: getCatalogList(state),
});

export const mapDispatchToProps = dispatch => ({
    setVideoGameData: data => dispatch(setVideoGameData(data)),
    setUserData: data => dispatch(setUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameCatalog);
