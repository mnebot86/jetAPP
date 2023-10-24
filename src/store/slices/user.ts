import { createSlice } from '@reduxjs/toolkit';
import { User } from 'utils/interface';

export type UserState = {
	user: null | User;
	isSignedIn: boolean;
};

const initialState: UserState = {
	user: null,
	isSignedIn: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.isSignedIn = true;
		},
		setSignedIn: state => {
			state.isSignedIn = true;
		},
		clearUser: state => {
			state.user = null;
			state.isSignedIn = false;
		},
	},
});

export const { setUser, clearUser, setSignedIn } = userSlice.actions;

export default userSlice.reducer;
