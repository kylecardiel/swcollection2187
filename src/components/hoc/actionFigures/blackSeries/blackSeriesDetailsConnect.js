import { BlackSeriesDetails } from 'components/catalog/actionFigures/blackSeries/pages/blackSeriesDetails';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { isProduction } from 'shared/util/environment';
import { RecordUtils } from 'shared/util/recordUtils';
import { getActionFigureCatalogList } from 'store/dataSet/dataSetSelector';
import { getUserActionFiguresBlackSeries6 } from 'store/firebase/dataSetSelector';
import { getAssortments, getHelperDataSet, getSourceMaterial } from 'store/helperData/helperDataSetSelector';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';
import userDataFile from 'shared/fixtures/userData.json';

const { usersData } = userDataFile;

export const BlackSeriesDetailsConnect = ({ figureId }) => {
    return ( 
        <BlackSeriesDetails figureId={figureId}/> 
    );
};

export const mapStateToProps = state => ({
    assortments: getAssortments(state).values,
    catalogList: getActionFigureCatalogList(state),
    helperData: getHelperDataSet(state),
    screenSize: getScreenSize(state),
    sourceMaterials: getSourceMaterial(state).values,
    userList: RecordUtils.convertDBNestedObjectsToArrayOfObjects(
        isProduction 
            ? getUserActionFiguresBlackSeries6(state) 
            : usersData.ActionFigures.BlackSeries6, 
        'ownedId',
    ),
});

export default connect(mapStateToProps)(BlackSeriesDetails);

BlackSeriesDetailsConnect.propTypes = {
    figureId: PropTypes.string.isRequired,
};