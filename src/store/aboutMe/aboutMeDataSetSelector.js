import { createSelector } from 'reselect';

const _getAboutMeDataSet = state => state.aboutMe;
export const getAboutMeDataSet = createSelector(_getAboutMeDataSet, aboutMe => aboutMe);
