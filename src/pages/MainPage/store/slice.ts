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
	totalPage: number;
	searchRequest: string;
	searchResponse: ISearchNormalizedResponse;
}

const initialState: MainState = {
	ratings: [],
	pageNumber: 1,
	totalPage: 1,
	searchRequest: '',
	searchResponse: {
		search_result: [],
		total_pages: 1,
	},
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
		updateTotalPage: (state, action: PayloadAction<number>) => {
			state.totalPage = action.payload;
		},
		updateSearchRequest: (state, action: PayloadAction<string>) => {
			state.searchRequest = action.payload;
		},
	},
});

export const {
	setRating,
	updatePageNumber,
	updateTotalPage,
	updateSearchRequest,
	updateSearchResponse,
} = mainSlice.actions;

export default mainSlice.reducer;
