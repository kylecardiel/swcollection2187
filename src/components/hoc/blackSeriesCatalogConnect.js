import React from 'react';
import { connect } from 'react-redux';
import { BlackSeriesCatalog } from 'components/blackSeries/blackSeriesCatalog';
import { getCatalogList, getUserList } from 'store/dataSet/dataSetSelector';
import { setCatalogData, setUserData} from 'store/dataSet/dataSetActions';

export const BlackSeriesCatalogConnect = props => {
    return ( <BlackSeriesCatalog /> );
};

export const mapStateToProps = (state, ownProps) => ({
    catalogList: getCatalogList(state),
    userList: getUserList(state),
    catalog: ownProps.catalog,
});

export const mapDispatchToProps = dispatch => ({
    setCatalogData: data => { 
        dispatch(setCatalogData(data));
    },
    setUserData: data => { 
        dispatch(setUserData(data));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(BlackSeriesCatalog);
