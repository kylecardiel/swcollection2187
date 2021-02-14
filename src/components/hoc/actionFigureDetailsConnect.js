import { ActionFigureDetails } from 'components/display/actionFigureDetail';
import React from 'react';
import { connect } from 'react-redux';
import { getActionFigureCatalogList, getActionFigureUserList } from 'store/dataSet/dataSetSelector';
import { getAssortments, getHelperDataSet, getSourceMaterial } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';

export const ActionFigureDetailsConnect = () => {
    return ( 
        <ActionFigureDetails /> 
    );
};

export const mapStateToProps = (state, ownProps) => ({
    figureId: ownProps.match.params.id,
    catalogList: getActionFigureCatalogList(state),
    helperData: getHelperDataSet(state),
    userList: getActionFigureUserList(state),
    sourceMaterials: getSourceMaterial(state).values,
    assortments: getAssortments(state).values,
    screenSize: getScreenSize(state),
});

export default connect(mapStateToProps)(ActionFigureDetails);