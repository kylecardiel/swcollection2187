import { screenSize } from 'store/screenSize/screenSizeReducer';
import { initialState } from 'store/initialState';
import * as actionTypes from 'store/screenSize/screenSizeActions';
import { SREEN_SIZE } from 'shared/constants/screenSize';

describe('ScreenSize Reducer', () => {

    let action;
    beforeEach(() => {
        action = null;
    });
    
    describe('for action type SET_SCREEN_SIZE', () => {
        it('should setScreenSizes', () => {
            action = {
                type: actionTypes.SET_SCREEN_SIZE,
                payload: SREEN_SIZE.XL,
            };
            const newState = screenSize(initialState.screenSize, action);
            expect(SREEN_SIZE.XL).toBe(newState);
        });
    });

    describe('for action type DEFAULT', () => {
        it('return same state', () => {
            action = {
                type: 'Default',
                payload: SREEN_SIZE.XL,
            };
            const newState = screenSize(initialState.screenSize, action);
            expect(newState).toBeNull();
        });
    });


});
