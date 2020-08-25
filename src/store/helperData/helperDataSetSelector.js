import { createSelector } from 'reselect';
import get from 'lodash/get';

const _getHelperDataSet = state => state.helperDataSet;
export const getHelperDataSet = createSelector(_getHelperDataSet, helperDataSet => helperDataSet);

export const getAssortments = createSelector(getHelperDataSet, helperDataSet => get(helperDataSet, 'assortment', false));
export const getSourceMaterial = createSelector(getHelperDataSet, helperDataSet => get(helperDataSet, 'sourceMaterial', false));
