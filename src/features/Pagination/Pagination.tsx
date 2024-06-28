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
	const totalPage = useAppSelector((state: RootState) => state.main.totalPage);
	const dispatch = useAppDispatch();
	const [getData, data] = useLazySearchRequestQuery();
	return (
		<Paginator
			pageNumber={pageNumber}
			totalPages={data?.data?.total_pages || totalPage}
			changePage={(number: number) => {
				dispatch(updatePageNumber(number));
				getData({ page: String(number) });
			}}
		/>
	);
}
