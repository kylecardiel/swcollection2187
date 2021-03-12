import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { aboutMe } from 'store/aboutMe/aboutMeDataSetReducer';
import { dataSet } from 'store/dataSet/dataSetReducer';
import { helperDataSet } from 'store/helperData/helperDataSetReducer';
import { screenSize } from 'store/screenSize/screenSizeReducer';

export const appReducer = combineReducers({
    firebase: firebaseReducer,
    aboutMe,
    dataSet,
    helperDataSet,
    screenSize,
});