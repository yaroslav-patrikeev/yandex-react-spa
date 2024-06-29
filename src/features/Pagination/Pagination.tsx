import { RootState } from '../../app/providers/store';
import { updatePageNumber } from '../../pages/MainPage/store/slice.ts';
import { useLazySearchRequestQuery } from '../../shared/api/api.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../shared/hooks/storeHooks.ts';
import Paginator from '../../shared/ui/Paginator/Paginator';

export default function Pagination() {
	const pageNumber = useAppSelector(
		(state: RootState) => state.main.pageNumber
	);
	const searchResponse = useAppSelector(
		(state: RootState) => state.main.searchResponse
	);
	const dispatch = useAppDispatch();
	const [getData] = useLazySearchRequestQuery();
	return (
		<Paginator
			pageNumber={pageNumber}
			totalPages={searchResponse.total_pages}
			changePage={(number: number) => {
				dispatch(updatePageNumber(number));
				getData({ page: String(number) });
			}}
		/>
	);
}
