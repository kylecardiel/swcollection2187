export const SET_USER_SETTINGS = '[userSettings]SET_USER_SETTINGS';
export const setUserSettings = data => ({
    type: SET_USER_SETTINGS,
    payload: data,
});