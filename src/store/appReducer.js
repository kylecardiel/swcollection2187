import { combineReducers } from 'redux'; 
import { firebaseReducer } from 'react-redux-firebase';
import { dataSet } from 'store/dataSet/dataSetReducer';
import { helperDataSet } from 'store/helperData/helperDataSetReducer';
import { screenSize } from 'store/screenSize/screenSizeReducer';

export const appReducer = combineReducers({
    firebase: firebaseReducer,
    dataSet,
    helperDataSet,
    screenSize,
});