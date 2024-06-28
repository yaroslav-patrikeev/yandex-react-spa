import { RootState } from '@/app/providers/store';
import Pagination from '@/features/Pagination/Pagination';
import Search from '@/features/Search/Search.tsx';
import { useSearchRequestQuery } from '@/shared/api/api';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import Filter from '@/widgets/Filter/ui/Filter';
import TicketCard from '@/widgets/TicketCard/ui/TicketCard';
import React, { useEffect } from 'react';
import { updateSearchResponse, updateTotalPage } from '../store/slice';
import styles from './MainPage.module.css';

export default function MainPage() {
	const pageNumber = useAppSelector(
		(state: RootState) => state.main.pageNumber
	);
	const searchResponse = useAppSelector(
		(state: RootState) => state.main.searchResponse
	);
	const dispatch = useAppDispatch();
	const { data } = useSearchRequestQuery({ page: String(pageNumber) });

	useEffect(() => {
		dispatch(
			updateSearchResponse(
				data || {
					search_result: [],
					total_pages: 1,
				}
			)
		);
		dispatch(updateTotalPage(data?.total_pages || 1));
	}, [dispatch, data]);

	return (
		<>
			<Filter />
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
