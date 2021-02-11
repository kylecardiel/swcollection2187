import { createSelector } from 'reselect';
import get from 'lodash/get';

const _getFirebase = state => state.firebase;
export const getFirebase = createSelector(_getFirebase, firebase => firebase);

export const getUserProfile = createSelector(getFirebase, firebase => get(firebase, 'profile', false));
export const getUserVideoGames = createSelector(getUserProfile, profile => get(profile, 'VideoGames', false));