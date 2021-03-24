import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';
import { aboutMe } from 'store/aboutMe/aboutMeDataSetReducer';
import { dataSet } from 'store/dataSet/dataSetReducer';
import { helperDataSet } from 'store/helperData/helperDataSetReducer';
import { screenSize } from 'store/screenSize/screenSizeReducer';
import { isProduction } from 'shared/util/environment';

const determineReducers = () => {
    const reducers = {
        aboutMe,
        dataSet,
        helperDataSet,
        screenSize,
    };

    if(isProduction){
        reducers['firebase'] = firebaseReducer;
    }

    return reducers;
};

export const appReducer = combineReducers(determineReducers());


