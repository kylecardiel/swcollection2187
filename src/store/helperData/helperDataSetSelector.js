import { createSelector } from 'reselect';

const _getHelperDataSet = state => state.helperDataSet;
export const getHelperDataSet = createSelector(_getHelperDataSet, helperDataSet => helperDataSet);