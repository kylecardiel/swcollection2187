import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as screenSizeActions from 'store/screenSize/screenSizeActions';
import { initialState } from 'store/initialState';
import { SREEN_SIZE } from 'shared/constants/screenSize';

describe('Screen Size Actions', () => {
    const middleWare = [thunk];
    const mockStore = configureMockStore(middleWare);
    let actions, store;

    beforeEach(() => {
        actions = [];
    });

    afterEach(() => {
        store.clearActions();
    });

    describe('action: setScreenSizes', () => {
        it('should create an action to setScreenSizes', () => {
            store = mockStore(initialState);
            store.dispatch(screenSizeActions.setScreenSizes(SREEN_SIZE.MD));
            actions = store.getActions();

            expect(actions).toHaveLength(1);
            expect(actions[0].type).toBe(screenSizeActions.SET_SCREEN_SIZE);
            expect(actions[0].payload).toBe(SREEN_SIZE.MD);
        });
    });

});
