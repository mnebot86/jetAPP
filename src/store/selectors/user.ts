import { createSelector } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { UserState } from 'store/slices/user';

export const getCurrentUser = (state: UserState) => state.user;

export const getIsSignedIn = (state: UserState) => get(state, 'user.isSignedIn', false);

export const getUserId = createSelector(getCurrentUser, state => get(state, 'user._id'));

export const getUserAvatar = createSelector(getCurrentUser, state => get(state, 'user.avatar'));

export const getUserRole = createSelector(getCurrentUser, state => get(state, 'user.role'));

export const getPlayers = createSelector(getCurrentUser, state => get(state, 'user.players', []));
