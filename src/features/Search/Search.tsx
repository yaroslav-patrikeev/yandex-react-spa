import { RootState } from '@/providers/store.jsx';
import { useLazySearchRequestQuery } from '@/shared/api/api';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import SearchInput from '@/shared/ui/SearchInput/SearchInput';
import {
	setIsLoad,
	updatePageNumber,
	updateSearchResponse,
} from '@/store/mainSlice';
import { useEffect } from 'react';

export default function Search() {
	const searchRequest = useAppSelector(
		(state: RootState) => state.main.searchRequest
	);

	const dispatch = useAppDispatch();
	const [getData, { isLoading, isError }] = useLazySearchRequestQuery();

	useEffect(() => {
		if (isError) {
			console.error('Возникла ошибка. Попробуйте перезагрузить страницу.');
		}
	}, [isError]);

	useEffect(() => {
		dispatch(setIsLoad(isLoading));
	}, [dispatch, isLoading]);

	return (
		<SearchInput
			searchRequest={searchRequest}
			updateRequest={(str: unknown) => {
				const newRequest: Record<string, string> = {};
				for (const [key, value] of Object.entries(searchRequest)) {
					if (key !== 'title') {
						newRequest[key] = value;
					}
				}

				getData(
					str
						? {
								...newRequest,
								title: str as string,
						  }
						: {
								...newRequest,
						  }
				).then(data => {
					dispatch(updatePageNumber(1));
					dispatch(
						updateSearchResponse(
							data?.data || { search_result: [], total_pages: 1 }
						)
					);
				});
			}}
		/>
	);
}
