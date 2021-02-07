import { HowTo } from 'components/howTo/howTo';
import React from 'react';
import { connect } from 'react-redux';
import { getScreenSize } from 'store/screenSize/screenSizeSelector';

export const HowToConnect = () => {
    return (<HowTo />);
};

export const mapStateToProps = state => ({
    screenSize: getScreenSize(state),
});

export default connect(mapStateToProps)(HowTo);
