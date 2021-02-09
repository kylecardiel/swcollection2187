import { VideoGameCatalog } from 'components/catalog/videoGames/videoGameCatalog';
import React from 'react';
import { connect } from 'react-redux';
import { setVideoGameData, setUserData } from 'store/dataSet/dataSetActions';
import { getCatalogList, getUserList } from 'store/dataSet/dataSetSelector';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';

export const VideoGameCatalogConnect = () => {
    return (<VideoGameCatalog />);
};

export const mapStateToProps = state => ({
    helperData: getHelperDataSet(state),
    userList: getUserList(state),
    videoGameList: getCatalogList(state),
});

export const mapDispatchToProps = dispatch => ({
    setVideoGameData: data => dispatch(setVideoGameData(data)),
    setUserData: data => dispatch(setUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameCatalog);
