import { connect } from 'react-redux';
import { setCatalogData, setUserData, setUserDisplaySettings, clearUserDisplaySettings } from 'store/dataSet/dataSetActions';
import { getCatalogList, getUserList, getFilterState } from 'store/dataSet/dataSetSelector';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';
import React from 'react';
import { VideoGameCatalog } from 'components/catalog/videoGames/videoGameCatalog';

export const VideoGameCatalogConnect = () => {
    return (<VideoGameCatalog />);
};

export const mapStateToProps = state => ({
    catalogList: getCatalogList(state),
    userList: getUserList(state),
    helperData: getHelperDataSet(state),
    screenSize: getScreenSize(state),
    filterState: getFilterState(state),
});

export const mapDispatchToProps = dispatch => ({
    setCatalogData: data => dispatch(setCatalogData(data)),
    setUserData: data => dispatch(setUserData(data)),
    setUserDisplaySettings: (settings, value) => dispatch(setUserDisplaySettings(settings, value)),
    clearUserDisplaySettings: () => dispatch(clearUserDisplaySettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameCatalog);
