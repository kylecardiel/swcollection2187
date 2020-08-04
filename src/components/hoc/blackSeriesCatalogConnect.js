import React from 'react';
import { connect } from 'react-redux';
import { BlackSeriesCatalog } from 'components/blackSeries/blackSeriesCatalog';
import { getCatalogList, getUserList } from 'store/dataSet/dataSetSelector';
import { setCatalogData, setUserData} from 'store/dataSet/dataSetActions';

export const BlackSeriesCatalogConnect = () => {
    return ( <BlackSeriesCatalog /> );
};

export const mapStateToProps = (state, ownProps) => ({
    catalog: ownProps.catalog,
    catalogList: getCatalogList(state),
    userList: getUserList(state),
});

export const mapDispatchToProps = dispatch => ({
    setCatalogData: data => dispatch(setCatalogData(data)),
    setUserData: data => dispatch(setUserData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BlackSeriesCatalog);
