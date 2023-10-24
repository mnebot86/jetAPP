import { createSelector } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { UserState } from 'store/slices/user';

export const currentUser = (state: UserState) => state.user;

export const getIsSignedIn = (state: UserState) => get(state, 'isSignedIn', false);

export const getUserId = createSelector(currentUser, state => get(state, 'user._id'));

export const getUserAvatar = createSelector(currentUser, state => get(state, 'user.avatar'));

export const getUserRole = createSelector(currentUser, state => get(state, 'user.role'));

export const getPlayers = createSelector(currentUser, state => get(state, 'user.players', []));
