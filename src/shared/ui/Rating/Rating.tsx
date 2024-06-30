import SetRating from '@/features/SetRating/SetRating';
import React from 'react';
import styles from './Rating.module.css';

export default function Rating({ id }: { id: string }) {
	return (
		<div className={styles.rating}>
			{Array(5)
				.fill(null)
				.map((_, i) => (
					<React.Fragment key={i}>
						<SetRating index={i} id={id} />
					</React.Fragment>
				))}
		</div>
	);
}
