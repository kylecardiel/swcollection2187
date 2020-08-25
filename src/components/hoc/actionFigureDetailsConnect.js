import React from 'react';
import { ActionFigureDetails } from 'components/display/actionFigureDetail';
import { getCatalogList, getUserList } from 'store/dataSet/dataSetSelector';
import { connect } from 'react-redux';
import { getAssortments, getSourceMaterial } from 'store/helperData/helperDataSetSelector';

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
});

export default connect(mapStateToProps)(ActionFigureDetails);