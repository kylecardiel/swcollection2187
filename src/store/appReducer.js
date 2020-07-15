import { combineReducers } from 'redux'; 
import { firebaseReducer } from 'react-redux-firebase'

export const appReducer = combineReducers({
    firebase: firebaseReducer,
});