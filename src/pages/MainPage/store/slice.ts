import { ISearchNormalizedResponse } from '@/shared/api/api';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IRating {
	id: string;
	rating: number;
}

export interface MainState {
	ratings: IRating[];
	pageNumber: number;
	searchRequest: ISearchRequest;
	searchResponse: ISearchNormalizedResponse;
	isLoading: boolean;
}

export interface ISearchRequest {
	title?: string;
	genre?: string;
	release_year?: string;
	page?: string;
}

const initialState: MainState = {
	ratings: [],
	pageNumber: 1,
	searchRequest: {
		page: '1',
	},
	searchResponse: {
		search_result: [],
		total_pages: 1,
	},
	isLoading: false,
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		setRating: (state, action: PayloadAction<IRating>) => {
			if (state.ratings.find(rating => rating.id === action.payload.id)) {
				state.ratings = state.ratings.map(rating => {
					if (rating.id === action.payload.id) {
						return action.payload;
					}
					return rating;
				});
			} else {
				state.ratings.push(action.payload);
			}
		},
		updateSearchResponse: (
			state,
			action: PayloadAction<ISearchNormalizedResponse>
		) => {
			state.searchResponse = action.payload;
		},
		updatePageNumber: (state, action: PayloadAction<number>) => {
			state.pageNumber = action.payload;
		},
		updateSearchRequest: (state, action: PayloadAction<ISearchRequest>) => {
			state.searchRequest = action.payload;
		},
		setIsLoad: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
	},
});

export const {
	setRating,
	updatePageNumber,
	updateSearchRequest,
	updateSearchResponse,
	setIsLoad,
} = mainSlice.actions;

export default mainSlice.reducer;
