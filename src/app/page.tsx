'use client';

import Pagination from '@/features/Pagination/Pagination';
import Search from '@/features/Search/Search';
import SetFilters from '@/features/SetFilters/SetFilters';
import { RootState } from '@/providers/store';
import { useLazySearchRequestQuery } from '@/shared/api/api';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import FilmsNotFound from '@/widgets/FIlmsNotFound/FilmsNotFound';
import {
	FilterType,
	GenreKeys,
	YearKeys,
} from '@/widgets/Filter/constants/constants';
import Loading from '@/widgets/Loading/Loading';
import TicketCard from '@/widgets/TicketCard/ui/TicketCard';
import React, { useEffect } from 'react';
import {
	setIsLoad,
	setRating,
	updateSearchRequest,
	updateSearchResponse,
} from '../store/mainSlice';
import styles from './page.module.css';

export default function MainPage() {
	const pageNumber = useAppSelector(
		(state: RootState) => state.main.pageNumber
	);
	const searchResponse = useAppSelector(
		(state: RootState) => state.main.searchResponse
	);
	const searchRequest = useAppSelector(
		(state: RootState) => state.main.searchRequest
	);

	const isLoad = useAppSelector((state: RootState) => state.main.isLoading);

	const dispatch = useAppDispatch();
	const [getFilms, { data, isFetching, isLoading, isError }] =
		useLazySearchRequestQuery();

	useEffect(() => {
		const currentQueryParameters = window.location.search.slice(1).split('&');
		const newRequest: Record<string, string> = {
			page: String(pageNumber),
		};
		if (
			currentQueryParameters.length !== 1 ||
			currentQueryParameters[0] !== ''
		) {
			currentQueryParameters.forEach(param => {
				const filterType = param.split('=')[0] as FilterType;
				const value = param.split('=')[1] as GenreKeys & YearKeys;
				if (value !== '0') {
					newRequest[filterType] = value;
					dispatch(
						updateSearchRequest({
							...searchRequest,
							[filterType]: value,
						})
					);
				}
			});
		}

		getFilms(newRequest);
	}, [getFilms, pageNumber, dispatch]);

	useEffect(() => {
		const currentRating = localStorage.getItem('rating');
		if (currentRating) {
			for (const [key, value] of Object.entries(JSON.parse(currentRating))) {
				dispatch(setRating({ id: key, rating: Number(value) }));
			}
		}
	}, [dispatch]);

	useEffect(() => {
		dispatch(setIsLoad(isLoading));
	}, [dispatch, isLoading]);

	useEffect(() => {
		if (isError) {
			console.error('Возникла ошибка. Попробуйте перезагрузить страницу.');
		}
	}, [isError]);

	useEffect(() => {
		if (data && !isFetching) {
			dispatch(
				updateSearchResponse(
					data || {
						search_result: [],
						total_pages: 1,
					}
				)
			);
		}
	}, [data, isFetching, dispatch]);

	return (
		<main className={styles.mainPage}>
			<SetFilters />
			<section className={styles.searchResult}>
				<Search />
				{isLoad ? (
					<Loading />
				) : (
					<>
						{searchResponse.search_result.length > 0 ? (
							<>
								{searchResponse.search_result.map(film => (
									<React.Fragment key={film.id}>
										<TicketCard {...film} />
									</React.Fragment>
								))}
								<Pagination />
							</>
						) : (
							<FilmsNotFound />
						)}
					</>
				)}
			</section>
		</main>
	);
}
