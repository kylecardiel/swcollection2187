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
    default:
        return state;
    }
};

const updateState = (state, attribute, payload) => {
    const cloneState = cloneDeep(state);
    cloneState[attribute] = payload;
    return cloneState;
};
