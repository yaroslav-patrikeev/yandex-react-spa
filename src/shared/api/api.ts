import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface ISearchParams {
	title?: string;
	page?: string;
}

interface ISearchResponse {
	search_result: {
		id: string;
		title: string;
		description: string;
		genre: string;
		release_year: string;
		actors: string;
		rating: string;
		total_rates_count: string;
	}[];
	total_pages: number;
}

export interface ISearchNormalizedResponse {
	search_result: {
		id: string;
		title: string;
		description: string;
		genre: string;
		release_year: string;
	}[];
	total_pages: number;
}

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030' }),
	endpoints: builder => ({
		searchRequest: builder.query<ISearchNormalizedResponse, ISearchParams>({
			query: ({ title, page }) => ({
				url: '/api/v1/search',
				params: { title, page },
			}),
			transformResponse: (response: ISearchResponse) => {
				return {
					total_pages: response.total_pages,
					search_result: response.search_result.map(res => {
						return {
							id: res.id,
							title: res.title,
							description: res.description,
							genre: res.genre,
							release_year: res.release_year,
						};
					}),
				};
			},
		}),
	}),
});

export const useSearchRequestQuery = api.useSearchRequestQuery;
export const useLazySearchRequestQuery = api.useLazySearchRequestQuery;
