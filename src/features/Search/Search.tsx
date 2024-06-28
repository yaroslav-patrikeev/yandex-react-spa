import { RootState } from '@/app/providers/store.tsx';
import {
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
				dispatch(updateSearchRequest(str));
				getData(
					str
						? {
								title: str,
								page: '1',
						  }
						: { page: '1' }
				).then(data => {
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
