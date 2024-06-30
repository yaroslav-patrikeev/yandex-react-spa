import { RootState } from '@/app/providers/store';
import { useAppSelector } from '@/shared/hooks/storeHooks';
import Rating from '@/shared/ui/Rating/Rating';
import styles from './FilmCard.module.css';

interface IFilmCardProps {
	id: string;
	title: string;
	release_year: number;
	genre: string;
	description: string;
	rating: string;
}

export default function FilmCard(props: IFilmCardProps) {
	const { title, release_year, genre, rating, description, id } = props;
	const isAuthorized =
		!!useAppSelector((state: RootState) => state.user.token) ||
		!!localStorage.getItem('token');
	return (
		<section className={styles.filmCard}>
			<img
				src={`${__API_URL__}/static/images/${id}`}
				alt=''
				className={styles.image}
			/>
			<div>
				<div className={styles.titleBlock}>
					<h2 className={styles.title}>{title}</h2>
					{isAuthorized && <Rating id={id} />}
				</div>

				<div className={styles.description}>
					<p className={styles.point}>
						<span className={styles.key}>Жанр</span>
						{genre}
					</p>
					<p className={styles.point}>
						<span className={styles.key}>Год выпуска</span>
						{release_year}
					</p>
					<p className={styles.point}>
						<span className={styles.key}>Рейтинг</span>
						{rating}
					</p>
					<div className={styles.blockTextDescription}>
						<span className={styles.descriptionKey}>Описание</span>
						<p className={styles.textDescription}>{description}</p>
					</div>
				</div>
			</div>
		</section>
	);
}
