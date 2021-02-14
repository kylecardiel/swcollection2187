import { createSelector } from 'reselect';
import get from 'lodash/get';

const _getDataSet = state => state.dataSet;
export const getDataSet = createSelector(_getDataSet, dataSet => dataSet);

export const getDisplayedData = createSelector(getDataSet, dataSet => get(dataSet, 'displayedData', false));
export const getCatalogList = createSelector(getDataSet, dataSet => get(dataSet, 'catalogList', false));
export const getUserList = createSelector(getDataSet, dataSet => get(dataSet, 'userList', false));

export const getFilterState = createSelector(getDataSet, dataSet => get(dataSet, 'displaySettings', false));
export const getVideoGameFilterState = createSelector(getFilterState, dataSet => get(dataSet, 'videoGames', false));