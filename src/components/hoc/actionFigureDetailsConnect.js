import React from 'react';
// import { connect } from 'react-redux';
import { ActionFigureDetails } from 'components/display/actionFigureDetail';
// import { getCatalogList } from 'store/dataSet/dataSetSelector';

export const ActionFigureDetailsConnect = props => {
    const { catalog, catalogList, figure } = props.location.state;
    return ( 
        <ActionFigureDetails figure={figure} catalog={catalog} catalogList={catalogList}/> );
};

// export const mapStateToProps = state => ({
//     catalogList: getCatalogList(state),
// });

// export default connect(mapStateToProps)(ActionFigureDetails);
