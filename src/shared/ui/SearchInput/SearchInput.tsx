import classNames from 'classnames';
import { useState } from 'react';
import styles from './SearchInput.module.css';
export default function SearchInput({
	searchRequest,
	updateRequest,
}: {
	searchRequest: string;
	updateRequest: (str: string) => void;
}) {
	const [isHover, setIsHover] = useState<boolean>(false);
	const [isActive, setIsActive] = useState<boolean>(false);
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
				value={searchRequest}
				onChange={evt => updateRequest(evt.target.value)}
			></input>
			{searchRequest.length > 0 && (
				<button
					className={styles.closeIcon}
					onClick={() => {
						updateRequest('');
						setIsActive(false);
					}}
				></button>
			)}
		</div>
	);
}
