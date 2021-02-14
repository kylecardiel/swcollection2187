export const SET_CATALOG_DATA = '[dataSet]SET_CATALOG_DATA';
export const setCatalogData = (catalog, data) => ({
    type: SET_CATALOG_DATA,
    payload: { catalog, data },
});

export const SET_USER_DATA = '[dataSet]SET_USER_DATA';
export const setUserData = (catalog, data) => ({
    type: SET_USER_DATA,
    payload: { catalog, data },
});

export const SET_USER_DISPLAY_SETTINGS = '[dataSet]SET_USER_DISPLAY_SETTINGS';
export const setUserDisplaySettings = (catalog, setting, value) => ({
    type: SET_USER_DISPLAY_SETTINGS,
    payload: { catalog, setting, value },
});

export const CLEAR_USER_DISPLAY_SETTINGS = '[dataSet]CLEAR_USER_DISPLAY_SETTINGS';
export const clearUserDisplaySettings = () => ({
    type: CLEAR_USER_DISPLAY_SETTINGS,
    payload: undefined,
});
