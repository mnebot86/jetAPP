import { createSelector } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { IAppState } from 'store/slices/appState';

interface IState {
	appState: IAppState;
}

// App state selectors
export const getAppState = (state: IState) => state.appState;
export const getColorMode = createSelector(getAppState, state => state.app.colorMode);

// Auth state selectors
export const getIsSignedIn = createSelector(getAppState, state =>
	get(state, 'app.isSignedIn', false)
);

// User state selectors
export const getUserId = createSelector(getAppState, state => get(state, 'app.user._id'));
export const getCurrentUser = createSelector(getAppState, state => get(state, 'app.user'));
export const getUserAvatar = createSelector(getAppState, state => get(state, 'app.user.avatar'));
export const getUserRole = createSelector(getAppState, state => get(state, 'app.user.role'));

// Players state selectors
export const getPlayers = createSelector(getAppState, state => get(state, 'app.user.players', []));
