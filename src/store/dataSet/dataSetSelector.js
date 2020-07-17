import { createSelector } from 'reselect';
import get from 'lodash/get';

const _getDataSet = state => state.dataSet;
export const getDataSet = createSelector(_getDataSet, dataSet => dataSet);

export const getDisplayedData = createSelector(getDataSet, dataSet => get(dataSet, 'displayedData', false));