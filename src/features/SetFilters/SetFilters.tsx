import { RootState } from '@/app/providers/store';
import {
	setIsLoad,
	updatePageNumber,
	updateSearchRequest,
	updateSearchResponse,
} from '@/pages/MainPage/store/slice';
import { useLazySearchRequestQuery } from '@/shared/api/api';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import {
	FilterType,
	GenreKeys,
	YearKeys,
	filters,
} from '@/widgets/Filter/constants/constants';
import Filter from '@/widgets/Filter/ui/Filter';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SetFilters() {
	const navigate = useNavigate();
	const [params, setParams] = useState<string[]>([]);
	const dispatch = useAppDispatch();
	const [getData, { isLoading, isError }] = useLazySearchRequestQuery();
	const searchRequest = useAppSelector(
		(state: RootState) => state.main.searchRequest
	);
	useEffect(() => {
		dispatch(setIsLoad(isLoading));
	}, [dispatch, isLoading]);

	useEffect(() => {
		alert('Возникла ошибка. Попробуйте перезагрузить страницу.');
	}, [isError]);

	const sendToStore = (param: { filterType: string; value: string }) => {
		let newRequest: Record<string, string> = {};
		if (param.value === '0') {
			for (const [key, value] of Object.entries(searchRequest)) {
				if (key !== param.filterType) {
					newRequest[key] = value;
				}
			}
		} else {
			newRequest = {
				...searchRequest,
				[param.filterType]: param.value,
			} as Record<string, string>;
		}
		dispatch(updateSearchRequest(newRequest));
		getData(newRequest).then(data => {
			dispatch(updatePageNumber(1));
			dispatch(
				updateSearchResponse(
					data?.data || { search_result: [], total_pages: 1 }
				)
			);
		});
	};

	const addQueryParams = (str: string) => {
		const filter = str.split('=')[0];
		const paramsWithoutFilter = params.filter(
			param => !param.startsWith(filter)
		);
		let newParams;
		if (str.split('=')[1] !== '0') {
			newParams = [...paramsWithoutFilter, str];
		} else {
			newParams = paramsWithoutFilter;
		}
		setParams(newParams);
		navigate({
			pathname: window.location.pathname,
			search: `?${newParams.join('&')}`,
		});
	};

	const currentValue = ({
		filterType,
	}: {
		filterType: FilterType;
	}): string | null => {
		const params = decodeURI(window.location.search).slice(1).split('&');
		const matchedParams = params.filter(param => param.startsWith(filterType));
		if (
			matchedParams.length > 0 &&
			Object.keys(filters[filterType]).includes(matchedParams[0].split('=')[1])
		) {
			const matchedFilter = matchedParams[0].split('=')[1] as GenreKeys &
				YearKeys;
			return filters[filterType][matchedFilter];
		}
		return null;
	};

	return (
		<Filter
			addQueryParams={addQueryParams}
			currentValue={currentValue}
			sendToStore={sendToStore}
		/>
	);
}
