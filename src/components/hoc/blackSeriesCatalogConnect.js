import React from 'react';
import { connect } from 'react-redux';
import { BlackSeriesCatalog } from 'components/blackSeries/blackSeriesCatalog';
import { getCatalogList, getUserList } from 'store/dataSet/dataSetSelector';
import { setCatalogData, setUserData } from 'store/dataSet/dataSetActions';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';

export const BlackSeriesCatalogConnect = () => {
    return (<BlackSeriesCatalog />);
};

export const mapStateToProps = state => ({
    catalogList: getCatalogList(state),
    userList: getUserList(state),
    helperData: getHelperDataSet(state),
    screenSize: getScreenSize(state)
});

export const mapDispatchToProps = dispatch => ({
    setCatalogData: data => dispatch(setCatalogData(data)),
    setUserData: data => dispatch(setUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlackSeriesCatalog);
