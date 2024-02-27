import { createSlice } from '@reduxjs/toolkit';
import { User } from 'utils/interface';

export type IAppState = {
	app: {
		user: null | User;
		isSignedIn: boolean;
		colorMode: 'light' | 'dark';
	};
};

const initialState: IAppState = {
	app: {
		user: null,
		isSignedIn: false,
		colorMode: 'light',
	},
};

const appStateSlice = createSlice({
	name: 'appState',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.app.user = action.payload;
			state.app.isSignedIn = true;
		},
		clearUser: state => {
			state.app.user = null;
			state.app.isSignedIn = false;
		},
		setColorMode: (state, action) => {
			// state.app.colorMode = action.payload;
			state.app.colorMode = action.payload;
		},
	},
});

export const { setUser, clearUser, setColorMode } = appStateSlice.actions;

export default appStateSlice.reducer;
