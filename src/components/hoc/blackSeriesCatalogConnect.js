import { BlackSeriesCatalog } from 'components/blackSeries/blackSeriesCatalog';
import { connect } from 'react-redux';
import { setCatalogData, setUserData, setUserDisplaySettings, clearUserDisplaySettings } from 'store/dataSet/dataSetActions';
import { getCatalogList, getUserList, getActionFigureFilterState } from 'store/dataSet/dataSetSelector';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';
import React from 'react';

export const BlackSeriesCatalogConnect = () => {
    return (<BlackSeriesCatalog />);
};

export const mapStateToProps = state => ({
    catalogList: getCatalogList(state),
    userList: getUserList(state),
    helperData: getHelperDataSet(state),
    screenSize: getScreenSize(state),
    filterState: getActionFigureFilterState(state),
});

export const mapDispatchToProps = dispatch => ({
    setCatalogData: data => dispatch(setCatalogData(data)),
    setUserData: data => dispatch(setUserData(data)),
    setUserDisplaySettings: (settings, value) => dispatch(setUserDisplaySettings('actionFigures', settings, value)),
    clearUserDisplaySettings: () => dispatch(clearUserDisplaySettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlackSeriesCatalog);
