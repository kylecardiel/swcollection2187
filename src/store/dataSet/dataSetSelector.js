import { createSelector } from 'reselect';
import get from 'lodash/get';

export const ACTION_FIGURE_PATH = 'actionFigures';
export const VIDEO_GAME_SUB_CATALOG = 'videoGames';

const _getDataSet = state => state.dataSet;
export const getDataSet = createSelector(_getDataSet, dataSet => dataSet);

export const getCatalogList = createSelector(getDataSet, dataSet => get(dataSet, 'catalogList', false));
export const getActionFigureCatalogList = createSelector(getCatalogList, dataSet => get(dataSet, ACTION_FIGURE_PATH, false));
export const getVideoGameCatalogList = createSelector(getCatalogList, dataSet => get(dataSet, VIDEO_GAME_SUB_CATALOG, false));

export const getUserList = createSelector(getDataSet, dataSet => get(dataSet, 'userList', false));
export const getActionFigureUserList = createSelector(getUserList, dataSet => get(dataSet, ACTION_FIGURE_PATH, false));
export const getVideoGameUserList = createSelector(getUserList, dataSet => get(dataSet, VIDEO_GAME_SUB_CATALOG, false));

export const getFilterState = createSelector(getDataSet, dataSet => get(dataSet, 'displaySettings', false));
export const getActionFigureFilterState = createSelector(getFilterState, dataSet => get(dataSet, ACTION_FIGURE_PATH, false));
export const getVideoGameFilterState = createSelector(getFilterState, dataSet => get(dataSet, VIDEO_GAME_SUB_CATALOG, false));

export const getContactMeData = createSelector(getDataSet, dataSet => get(dataSet, 'contactMe', false));