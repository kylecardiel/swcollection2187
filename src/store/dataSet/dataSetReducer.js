import * as actions from 'store/dataSet/dataSetActions';
import cloneDeep from 'lodash/cloneDeep';
import { initialState } from 'store/initialState';

export const dataSet = (state = initialState.dataSet, action) => {
    switch (action.type) {
    case actions.SET_DISPLAY_DATA: {
        return Array.isArray(action.payload)
            ? updateState(state, 'displayedData', action.payload)
            : state;
    }
    case actions.SET_CATALOG_DATA: {
        return Array.isArray(action.payload)
            ? updateState(state, 'catalogList', action.payload)
            : state;
    }
    case actions.SET_USER_DATA: {
        return Array.isArray(action.payload)
            ? updateState(state, 'userList', action.payload)
            : state;
    }
    case actions.SET_USER_DISPLAY_SETTINGS: {
        const cloneState = cloneDeep(state);
        cloneState.displaySettings[action.payload.setting] = action.payload.value;
        return cloneState;
    }
    case actions.CLEAR_USER_DISPLAY_SETTINGS: {
        const cloneState = cloneDeep(state);
        cloneState.displaySettings = initialState.dataSet.displaySettings;
        return cloneState;
    }
    case actions.SET_VIDEO_GAME_DATA: {
        return Array.isArray(action.payload)
            ? updateState(state, 'catalogList', action.payload)
            : state;
    }
    default:
        return state;
    }
};

const updateState = (state, attribute, payload) => {
    const cloneState = cloneDeep(state);
    cloneState[attribute] = payload;
    return cloneState;
};
