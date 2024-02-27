import { createSelector } from '@reduxjs/toolkit';
import { get } from 'lodash';
import { IModalState } from 'store/slices/modals';

interface IState {
	modelsState: IModalState;
}

export const getModelsState = (state: IState) => state.modelsState;

export const getGameFilmVideoUploadOpen = createSelector(getModelsState, state =>
	get(state, 'modal.isGameFilmVideoUploadOpen', false)
);
