import { RootState } from '@/app/providers/store.tsx';
import {
	updatePageNumber,
	updateSearchRequest,
	updateSearchResponse,
} from '@/pages/MainPage/store/slice.ts';
import { useLazySearchRequestQuery } from '@/shared/api/api.ts';
import SearchInput from '@/shared/ui/SearchInput/SearchInput.tsx';
import {
	useAppDispatch,
	useAppSelector,
} from '../../shared/hooks/storeHooks.ts';

export default function Search() {
	const searchRequest = useAppSelector(
		(state: RootState) => state.main.searchRequest
	);

	const dispatch = useAppDispatch();
	const [getData] = useLazySearchRequestQuery();

	return (
		<SearchInput
			searchRequest={searchRequest}
			updateRequest={async (str: string) => {
				dispatch(
					updateSearchRequest({
						...searchRequest,
						title: str,
					})
				);

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
