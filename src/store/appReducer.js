import { combineReducers } from 'redux'; 
import { firebaseReducer } from 'react-redux-firebase';
import { dataSet } from 'store/dataSet/dataSetReducer';

export const appReducer = combineReducers({
    firebase: firebaseReducer,
    dataSet,
});