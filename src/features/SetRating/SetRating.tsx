import { useSetRatingMutation } from '@/shared/api/api';
import RatingItem from '@/shared/ui/Rating/components/RatingItem';
import { useEffect } from 'react';

interface ISetRating {
	id: string;
	index: number;
}
export default function SetRating(params: ISetRating) {
	const { id, index } = params;
	const [sendRequest, { isError }] = useSetRatingMutation();
	useEffect(() => {
		alert('Возникла ошибка. Попробуйте перезагрузить страницу.');
	}, [isError]);
	return (
		<RatingItem
			id={id}
			index={index}
			onRating={(movieId: string, user_rate: number, token: string | null) => {
				sendRequest({ movieId, user_rate, token });
				const prevRating = localStorage.getItem('rating');
				if (prevRating) {
					const parseRating = JSON.parse(prevRating);
					parseRating[movieId] = user_rate;
					localStorage.setItem('rating', JSON.stringify(parseRating));
				} else {
					localStorage.setItem(
						'rating',
						JSON.stringify({ [movieId]: user_rate })
					);
				}
			}}
		/>
	);
}
