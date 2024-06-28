import styles from './Rating.module.css';
import RatingItem from './components/RatingItem';

export default function Rating({ id }: { id: string }) {
	return (
		<div className={styles.rating}>
			{Array(5)
				.fill(null)
				.map((_, i) => (
					<RatingItem key={i} index={i} id={id} />
				))}
		</div>
	);
}
