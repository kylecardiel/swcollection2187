import * as actions from 'store/dataSet/dataSetActions';
import cloneDeep from 'lodash/cloneDeep';
import { initialState } from 'store/initialState';

export const dataSet = (state = initialState.dataSet, action) => {
    switch (action.type) {
    case actions.SET_CATALOG_DATA: {
        const cloneState = cloneDeep(state);
        cloneState.catalogList[action.payload.catalog] = action.payload.data;
        return cloneState;
    }
    case actions.SET_USER_DATA: {
        const cloneState = cloneDeep(state);
        cloneState.userList[action.payload.catalog] = action.payload.data;
        return cloneState;
    }
    case actions.SET_USER_DISPLAY_SETTINGS: {
        const cloneState = cloneDeep(state);
        cloneState.displaySettings[action.payload.catalog][action.payload.setting] = action.payload.value;
        return cloneState;
    }
    case actions.CLEAR_USER_DISPLAY_SETTINGS: {
        const cloneState = cloneDeep(state);
        cloneState.displaySettings = initialState.dataSet.displaySettings;
        return cloneState;
    }
    default:
        return state;
    }
};
