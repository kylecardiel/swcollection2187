import { UserProfile } from 'components/userProfiles/userProfile';
import React from 'react';
import { connect } from 'react-redux';
import { getUserActionFiguresBlackSeries6, getUserVideoGames } from 'store/firebase/dataSetSelector';

export const UserProfileConnect = () => {
    return (<UserProfile />);
};

export const mapStateToProps = state => ({
    userActionFigureList: getUserActionFiguresBlackSeries6(state),
    userVideoGameList: getUserVideoGames(state),
});

export default connect(mapStateToProps)(UserProfile);
