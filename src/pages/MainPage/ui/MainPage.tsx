import { RootState } from '@/app/providers/store';
import Pagination from '@/features/Pagination/Pagination';
import Search from '@/features/Search/Search.tsx';
import SetFilters from '@/features/SetFilters/SetFilters';
import { useLazySearchRequestQuery } from '@/shared/api/api';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import {
	FilterType,
	GenreKeys,
	YearKeys,
} from '@/widgets/Filter/constants/constants';
import TicketCard from '@/widgets/TicketCard/ui/TicketCard';
import React, { useEffect } from 'react';
import { updateSearchRequest, updateSearchResponse } from '../store/slice';
import styles from './MainPage.module.css';

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
	const dispatch = useAppDispatch();
	const [getFilms, { data, isFetching }] = useLazySearchRequestQuery();

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
		<>
			<SetFilters />
			<section className={styles.searchResult}>
				<Search />
				{searchResponse.search_result.map(film => (
					<React.Fragment key={film.id}>
						<TicketCard {...film} />
					</React.Fragment>
				))}
				<Pagination />
			</section>
		</>
	);
}
