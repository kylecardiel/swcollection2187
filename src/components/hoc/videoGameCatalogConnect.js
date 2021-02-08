import { VideoGameCatalog } from 'components/catalog/videoGames/videoGameCatalog';
import React from 'react';
import { connect } from 'react-redux';
import { setVideoGameData } from 'store/dataSet/dataSetActions';
import { getCatalogList } from 'store/dataSet/dataSetSelector';
import { getHelperDataSet } from 'store/helperData/helperDataSetSelector';

export const VideoGameCatalogConnect = () => {
    return (<VideoGameCatalog />);
};

export const mapStateToProps = state => ({
    videoGameList: getCatalogList(state),
    helperData: getHelperDataSet(state),
});

export const mapDispatchToProps = dispatch => ({
    setVideoGameData: data => dispatch(setVideoGameData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGameCatalog);
