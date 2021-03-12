import { AboutMe } from 'components/aboutMe/aboutMe';
import React from 'react';
import { connect } from 'react-redux';
import { getAboutMeDataSet } from 'store/aboutMe/aboutMeDataSetSelector';
import { setAboutMeData } from 'store/aboutMe/aboutMeDataSetActions';

export const AboutMeConnect = () => {
    return (<AboutMe />);
};

export const mapStateToProps = state => ({
    aboutMeData: getAboutMeDataSet(state),
});

export const mapDispatchToProps = dispatch => ({
    setAboutMeData: data => dispatch(setAboutMeData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AboutMe);
