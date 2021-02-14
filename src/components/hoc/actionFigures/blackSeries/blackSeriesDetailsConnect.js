import { BlackSeriesDetails } from 'components/catalog/actionFigures/blackSeries/pages/blackSeriesDetails';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { getActionFigureCatalogList, getActionFigureUserList } from 'store/dataSet/dataSetSelector';
import { getAssortments, getHelperDataSet, getSourceMaterial } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';

export const BlackSeriesDetailsConnect = ({ figureId }) => {
    return ( 
        <BlackSeriesDetails figureId={figureId}/> 
    );
};

export const mapStateToProps = (state, ownProps) => ({
    catalogList: getActionFigureCatalogList(state),
    helperData: getHelperDataSet(state),
    userList: getActionFigureUserList(state),
    sourceMaterials: getSourceMaterial(state).values,
    assortments: getAssortments(state).values,
    screenSize: getScreenSize(state),
});

export default connect(mapStateToProps)(BlackSeriesDetails);


BlackSeriesDetailsConnect.propTypes = {
    figureId: PropTypes.string.isRequired,
};