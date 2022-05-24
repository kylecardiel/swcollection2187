import { VintageCollectionCatalog } from 'components/catalog/actionFigures/vintageCollection/pages/vintageCollectionCatalog';
import React from 'react';
import { connect } from 'react-redux';
import { clearUserDisplaySettings, setCatalogData, setUserData, setUserDisplaySettings } from 'store/dataSet/dataSetActions';
import { getActionFigureCatalogList, getActionFigureFilterState, getActionFigureUserList, ACTION_FIGURE_PATH } from 'store/dataSet/dataSetSelector';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';

export const VintageCollectionCatalogConnect = () => {
    return (<VintageCollectionCatalog />);
};

export const mapStateToProps = state => ({
    catalogList: getActionFigureCatalogList(state),
    filterState: getActionFigureFilterState(state),
    helperData: getHelperDataSet(state),
    screenSize: getScreenSize(state),
    userList: getActionFigureUserList(state),
});

export const mapDispatchToProps = dispatch => ({
    setCatalogData: data => dispatch(setCatalogData(ACTION_FIGURE_PATH, data)),
    setUserData: data => dispatch(setUserData(ACTION_FIGURE_PATH, data)),
    setUserDisplaySettings: (settings, value) => dispatch(setUserDisplaySettings(ACTION_FIGURE_PATH, settings, value)),
    clearUserDisplaySettings: () => dispatch(clearUserDisplaySettings()),
});

export default connect(mapStateToProps, mapDispatchToProps)(VintageCollectionCatalog);
