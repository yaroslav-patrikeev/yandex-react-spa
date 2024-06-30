import { useState } from 'react';
import styles from './Carousel.module.css';

export default function Carousel({
	actors,
	step,
}: {
	actors: { name: string; photo: string }[];
	step: number;
}) {
	const [index, setIndex] = useState<number>(0);

	const slideRight = () => {
		if (index - step <= 0) {
			if (
				index - step <
				1856 - (160 * actors.length + 24 * (actors.length - 1))
			) {
				setIndex(1856 - (160 * actors.length + 24 * (actors.length - 1)));
			} else {
				setIndex(index - step);
			}
		}
	};

	const slideLeft = () => {
		if (index + step > 0) {
			setIndex(0);
		} else {
			setIndex(index + step);
		}
	};
	return (
		<section className={styles.carouselWrapper}>
			{index < 0 && (
				<button className={styles.back} onClick={slideLeft}></button>
			)}
			<div
				className={styles.carousel}
				style={{
					transform: `translateX(${index}px)`,
				}}
			>
				{actors.map((actor, i) => (
					<div className={styles.card} key={i}>
						<img src={actor.photo} alt={actor.name} className={styles.photo} />
						<p className={styles.name}>{actor.name}</p>
					</div>
				))}
			</div>
			{index > 1856 - (160 * actors.length + 24 * (actors.length - 1)) && (
				<button className={styles.next} onClick={slideRight}></button>
			)}
		</section>
	);
}
