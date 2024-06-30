import { RootState } from '@/app/providers/store.tsx';
import {
	setIsLoad,
	updatePageNumber,
	updateSearchResponse,
} from '@/pages/MainPage/store/slice.ts';
import { useLazySearchRequestQuery } from '@/shared/api/api.ts';
import SearchInput from '@/shared/ui/SearchInput/SearchInput.tsx';
import { useEffect } from 'react';
import {
	useAppDispatch,
	useAppSelector,
} from '../../shared/hooks/storeHooks.ts';

export default function Search() {
	const searchRequest = useAppSelector(
		(state: RootState) => state.main.searchRequest
	);

	const dispatch = useAppDispatch();
	const [getData, { isLoading, isError }] = useLazySearchRequestQuery();

	useEffect(() => {
		alert('Возникла ошибка. Попробуйте перезагрузить страницу.');
	}, [isError]);

	useEffect(() => {
		dispatch(setIsLoad(isLoading));
	}, [dispatch, isLoading]);

	return (
		<SearchInput
			searchRequest={searchRequest}
			updateRequest={(str: string) => {
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
								title: str,
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
