import React from 'react';
import { connect } from 'react-redux';
import { ReadContactMe } from 'components/contactMe/readContactMe';
import { getContactMeData } from 'store/dataSet/dataSetSelector';
import { setContactMeData } from 'store/dataSet/dataSetActions';

export const ReadContactMeConnect = () => {
    return (<ReadContactMe />);
};

export const mapStateToProps = state => ({
    contactMeData: getContactMeData(state),
});

export const mapDispatchToProps = dispatch => ({
    setContactMeData: data => dispatch(setContactMeData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadContactMe);
