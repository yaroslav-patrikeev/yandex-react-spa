import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import mainReducer from '../../pages/MainPage/store/slice.ts';
import { api } from '../../shared/api/api';

export const store = configureStore({
	reducer: {
		main: mainReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
