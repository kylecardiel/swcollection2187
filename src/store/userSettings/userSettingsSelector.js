import { createSelector } from 'reselect';

const _getUserSettings = state => state.userSettings;
export const getUserSettings = createSelector(_getUserSettings, userSettings => userSettings);