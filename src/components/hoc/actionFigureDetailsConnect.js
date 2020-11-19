import { ActionFigureDetails } from 'components/display/actionFigureDetail';
import { connect } from 'react-redux';
import { getAssortments, getSourceMaterial } from 'store/helperData/helperDataSetSelector';
import { getCatalogList, getUserList } from 'store/dataSet/dataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';
import React from 'react';

export const ActionFigureDetailsConnect = () => {
    return ( 
        <ActionFigureDetails /> 
    );
};

export const mapStateToProps = (state, ownProps) => ({
    figureId: ownProps.match.params.id,
    catalogList: getCatalogList(state),
    userList: getUserList(state),
    sourceMaterials: getSourceMaterial(state).values,
    assortments: getAssortments(state).values,
    screenSize: getScreenSize(state),
});

export default connect(mapStateToProps)(ActionFigureDetails);