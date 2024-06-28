import classNames from 'classnames';
import { useState } from 'react';
import { RootState } from '../../../../app/providers/store';
import { setRating } from '../../../../pages/MainPage/store/slice.ts';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../../shared/hooks/storeHooks.ts';
import styles from './RatingItem.module.css';

interface IRatingItem {
	index: number;
	id: string;
}

export default function RatingItem({ index, id }: IRatingItem) {
	const [isHover, setIsHover] = useState(false);
	const rating =
		useAppSelector((state: RootState) => state.main.ratings).find(
			rating => rating.id === id
		)?.rating || 0;
	const dispatch = useAppDispatch();
	return (
		<div
			className={classNames(styles.item, !isHover && styles.itemDisabled)}
			onMouseEnter={() => {
				setIsHover(true);
			}}
			onMouseLeave={() => {
				setIsHover(false);
			}}
			onClick={() => {
				dispatch(setRating({ id, rating: index + 1 }));
				setIsHover(false);
			}}
		>
			<div
				className={classNames(
					!isHover && index + 1 <= rating
						? styles.activeStar
						: styles.passiveStar,
					isHover && styles.hoverStar
				)}
			></div>
			<span
				className={index + 1 <= rating ? styles.activeText : styles.passiveText}
			>
				{index + 1}
			</span>
		</div>
	);
}
