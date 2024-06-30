import SetRating from '@/features/SetRating/SetRating';
import { useSetRatingMutation } from '@/shared/api/api';
import { debounce } from '@/shared/helpers/debounce';
import React, { useCallback, useEffect } from 'react';
import styles from './Rating.module.css';

export default function Rating({ id }: { id: string }) {
	const [sendRequest, { isError }] = useSetRatingMutation();

	useEffect(() => {
		if (isError) {
			console.error('Возникла ошибка. Попробуйте перезагрузить страницу.');
		}
	}, [isError]);

	const sendRequestWithDebounce = useCallback(debounce(sendRequest, 600), []);

	return (
		<div className={styles.rating}>
			{Array(5)
				.fill(null)
				.map((_, i) => (
					<React.Fragment key={i}>
						<SetRating
							index={i}
							id={id}
							sendRequest={sendRequestWithDebounce}
						/>
					</React.Fragment>
				))}
		</div>
	);
}
