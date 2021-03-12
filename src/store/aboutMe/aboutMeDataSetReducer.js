import * as actions from 'store/aboutMe/aboutMeDataSetActions';
import { initialState } from 'store/initialState';

export const aboutMe = (state = initialState.aboutMe, action) => {
    switch (action.type) {
    case actions.SET_ABOUT_ME_DATA: {
        let cloneState = action.payload;
        return cloneState;
    }
    default:
        return state;
    }
};