import { login } from '@/entities/User/services/login';
import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit/react';

interface IInitialState {
	token: string | null;
	isShowAuthModal: boolean;
}

const initialState: IInitialState = {
	token: null,
	isShowAuthModal: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		showAuthModal: (state, action: PayloadAction<boolean>) => {
			state.isShowAuthModal = action.payload;
		},
		logout: state => {
			state.token = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(
			login.fulfilled,
			(state, action: PayloadAction<{ token: string }>) => {
				state.token = action.payload.token;

				localStorage.setItem('token', action.payload.token);
			}
		);
	},
});

export const { showAuthModal, logout } = userSlice.actions;

export default userSlice.reducer;
