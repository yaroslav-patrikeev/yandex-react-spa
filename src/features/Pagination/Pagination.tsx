import { useLazySearchRequestQuery } from '@/shared/api/api';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import { updatePageNumber } from '@/store/mainSlice';
import { RootState } from '../../providers/store';
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
