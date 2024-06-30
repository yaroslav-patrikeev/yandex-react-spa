import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import { setRating } from '@/store/mainSlice';
import classNames from 'classnames';
import { useState } from 'react';
import { RootState } from '../../../../providers/store';
import EmptyStar from './EmptyStar';
import FilledStar from './FilledStar';
import styles from './RatingItem.module.css';

interface IRatingItem {
	index: number;
	id: string;
	onRating: (movieId: string, user_rate: number, token: string | null) => void;
}

export default function RatingItem({ index, id, onRating }: IRatingItem) {
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
			onClick={(evt: React.MouseEvent) => {
				evt.stopPropagation();
				onRating(id, index + 1, localStorage.getItem('token'));
				dispatch(setRating({ id, rating: index + 1 }));
				setIsHover(false);
			}}
		>
			{!isHover && index + 1 > rating ? (
				<EmptyStar />
			) : !isHover && index + 1 <= rating ? (
				<FilledStar state='active' />
			) : (
				<FilledStar state='hover' />
			)}
			<span
				className={index + 1 <= rating ? styles.activeText : styles.passiveText}
			>
				{index + 1}
			</span>
		</div>
	);
}
