export const SET_DISPLAY_DATA = '[dataSet]SET_DISPLAY_DATA';
export const setDisplayData = data => ({
    type: SET_DISPLAY_DATA,
    payload: data,
});

export const SET_CATALOG_DATA = '[dataSet]SET_CATALOG_DATA';
export const setCatalogData = data => ({
    type: SET_CATALOG_DATA,
    payload: data,
});

export const SET_USER_DATA = '[dataSet]SET_USER_DATA';
export const setUserData = data => ({
    type: SET_USER_DATA,
    payload: data,
});

export const SET_USER_DISPLAY_SETTINGS = '[dataSet]SET_USER_DISPLAY_SETTINGS';
export const setUserDisplaySettings = (setting, value) => ({
    type: SET_USER_DISPLAY_SETTINGS,
    payload: { setting, value },
});

export const CLEAR_USER_DISPLAY_SETTINGS = '[dataSet]CLEAR_USER_DISPLAY_SETTINGS';
export const clearUserDisplaySettings = () => ({
    type: CLEAR_USER_DISPLAY_SETTINGS,
    payload: undefined,
});

export const SET_VIDEO_GAME_DATA = '[dataSet]SET_VIDEO_GAME_DATA';
export const setVideoGameData = data => ({
    type: SET_VIDEO_GAME_DATA,
    payload: data,
});

