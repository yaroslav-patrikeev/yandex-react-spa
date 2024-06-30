import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export interface ISearchParams {
	title?: string;
	page?: string;
	genre?: string;
	release_year?: string;
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

interface IGetMovieResponse {
	id: string;
	title: string;
	description: string;
	genre: string;
	release_year: number;
	actors: { name: string; photo: string }[];
	rating: string;
	total_rates_count: string;
	poster: string;
}

export interface IGetMovieNormalizedResponse {
	id: string;
	title: string;
	description: string;
	genre: string;
	release_year: number;
	rating: string;
	actors: { name: string; photo: string }[];
}

export const api = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030' }),
	tagTypes: ['movie'],
	endpoints: builder => ({
		searchRequest: builder.query<ISearchNormalizedResponse, ISearchParams>({
			query: ({ title, page, genre, release_year }) => ({
				url: '/api/v1/search',
				params: { title, page, genre, release_year },
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
		getFilm: builder.query<IGetMovieNormalizedResponse, { id: string }>({
			query: ({ id }) => ({
				url: `/api/v1/movie/${id}`,
			}),
			transformResponse: (response: IGetMovieResponse) => {
				return {
					id: response.id,
					title: response.title,
					description: response.description,
					genre: response.genre,
					release_year: response.release_year,
					rating: response.rating,
					actors: response.actors,
				};
			},
			providesTags: ['movie'],
		}),
		setRating: builder.mutation({
			query: ({ movieId, user_rate, token }) => ({
				url: '/api/v1/rateMovie',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: { movieId, user_rate },
				method: 'POST',
			}),
			invalidatesTags: ['movie'],
		}),
	}),
});

export const useLazySearchRequestQuery = api.useLazySearchRequestQuery;
export const useLazyGetFilmQuery = api.useLazyGetFilmQuery;
export const useSetRatingMutation = api.useSetRatingMutation;
