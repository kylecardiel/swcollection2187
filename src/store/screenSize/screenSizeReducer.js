import * as actions from 'store/screenSize/screenSizeActions';
import { initialState } from 'store/initialState';

export const screenSize = (state = initialState.screenSize, action) => {
    switch (action.type) {
        case actions.SET_SCREEN_SIZE: {
            let cloneState = action.payload;
            return cloneState;
        }
        default:
            return state;
     }
};