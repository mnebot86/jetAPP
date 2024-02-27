import { createSlice } from '@reduxjs/toolkit';

export type IModalState = {
	modal: {
		isGameFilmVideoUploadOpen: boolean;
	};
};

const initialState: IModalState = {
	modal: {
		isGameFilmVideoUploadOpen: false,
	},
};

const modalsStateSlice = createSlice({
	name: 'modalsState',
	initialState,
	reducers: {
		toggleIsGameFilmVideoUploadOpen: state => {
			state.modal.isGameFilmVideoUploadOpen = !state.modal.isGameFilmVideoUploadOpen;
		},
	},
});

export const { toggleIsGameFilmVideoUploadOpen } = modalsStateSlice.actions;

export default modalsStateSlice.reducer;
