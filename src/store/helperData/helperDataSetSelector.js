import { createSelector } from 'reselect';

const _getHelperDataSet = state => state.helperData;
export const getHelperDataSet = createSelector(_getHelperDataSet, helperData => helperData);