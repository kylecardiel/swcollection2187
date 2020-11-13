import { BlackSeriesCatalog } from 'components/blackSeries/blackSeriesCatalog';
import { connect } from 'react-redux';
import { setCatalogData, setUserData } from 'store/dataSet/dataSetActions';
import { getCatalogList, getUserList } from 'store/dataSet/dataSetSelector';
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
});

export const mapDispatchToProps = dispatch => ({
    setCatalogData: data => dispatch(setCatalogData(data)),
    setUserData: data => dispatch(setUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlackSeriesCatalog);
