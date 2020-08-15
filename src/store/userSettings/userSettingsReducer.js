import * as actions from 'store/userSettings/userSettingsActions';
import cloneDeep from 'lodash/cloneDeep';
import { initialState } from 'store/initialState';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const userSettings = (state = initialState.userSettings, action) => {
    switch (action.type) {
        case actions.SET_USER_SETTINGS: {
            const cloneState = cloneDeep(state);
            cloneState = action.payload;
            return cloneState;
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'userSettings',
    storage,
};

const userSettingsSave = persistReducer(persistConfig, userSettings);

export default userSettingsSave;