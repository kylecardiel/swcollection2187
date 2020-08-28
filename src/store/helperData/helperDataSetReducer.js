import * as actions from 'store/helperData/helperDataSetActions';
import { initialState } from 'store/initialState';

export const helperDataSet = (state = initialState.helperDataSet, action) => {
    switch (action.type) {
    case actions.SET_HELPER_DATA: {
        return action.payload;
    }
    default:
        return state;
    }
};