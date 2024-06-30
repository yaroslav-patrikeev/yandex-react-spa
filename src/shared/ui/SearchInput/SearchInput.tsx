import { debounce } from '@/shared/helpers/debounce';
import { useAppDispatch } from '@/shared/hooks/storeHooks';
import { ISearchRequest, updateSearchRequest } from '@/store/mainSlice';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import styles from './SearchInput.module.css';
export default function SearchInput({
	searchRequest,
	updateRequest,
}: {
	searchRequest: ISearchRequest;
	updateRequest: (str: unknown) => void;
}) {
	const [isHover, setIsHover] = useState<boolean>(false);
	const [isActive, setIsActive] = useState<boolean>(false);
	const debouncedUpdateRequest = useCallback(debounce(updateRequest, 600), []);
	const dispatch = useAppDispatch();
	return (
		<div
			className={classNames(
				styles.searchInput,
				isActive && styles.searchInputActive
			)}
			onMouseEnter={() => {
				setIsHover(true);
			}}
			onMouseLeave={() => {
				setIsHover(false);
			}}
			onFocus={() => {
				setIsActive(true);
				setIsHover(false);
			}}
			onBlur={() => {
				setIsActive(false);
			}}
		>
			<div
				className={classNames(
					styles.searchIcon,
					isHover && styles.searchIconIsHover
				)}
			></div>
			<input
				type='text'
				className={styles.input}
				value={searchRequest.title}
				placeholder={'Название фильма'}
				onChange={evt => {
					dispatch(
						updateSearchRequest({
							...searchRequest,
							title: evt.target.value,
						})
					);
					debouncedUpdateRequest(evt.target.value);
				}}
			></input>
			{searchRequest.title && searchRequest.title.length > 0 && (
				<button
					className={styles.closeIcon}
					onClick={() => {
						updateRequest('');
						dispatch(
							updateSearchRequest({
								...searchRequest,
								title: '',
							})
						);
						setIsActive(false);
					}}
				></button>
			)}
		</div>
	);
}
