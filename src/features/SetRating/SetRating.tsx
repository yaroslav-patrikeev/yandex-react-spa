import RatingItem from '@/shared/ui/Rating/components/RatingItem';
import { memo } from 'react';

interface ISetRating {
	id: string;
	index: number;
	sendRequest: ({
		movieId,
		user_rate,
		token,
	}: {
		movieId: string;
		user_rate: number;
		token: string | null;
	}) => void;
}
export default memo(function SetRating(params: ISetRating) {
	const { id, index, sendRequest } = params;

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
});
