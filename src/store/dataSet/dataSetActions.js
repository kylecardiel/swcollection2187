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