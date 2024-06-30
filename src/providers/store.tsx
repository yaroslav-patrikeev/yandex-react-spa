import { configureStore } from '@reduxjs/toolkit';
import { api } from '../shared/api/api';
import mainReducer from '../store/mainSlice';
import userReducer from '../store/userSlice';

export const makeStore = () =>
	configureStore({
		reducer: {
			main: mainReducer,
			user: userReducer,
			[api.reducerPath]: api.reducer,
		},
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(api.middleware),
	});

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
