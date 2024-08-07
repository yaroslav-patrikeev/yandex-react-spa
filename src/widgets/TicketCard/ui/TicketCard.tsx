import { RootState } from '@/app/providers/store';
import { useAppSelector } from '@/shared/hooks/storeHooks';
import { useNavigate } from 'react-router-dom';
import Rating from '../../../shared/ui/Rating/Rating';
import styles from './TicketCard.module.css';

interface ITicketCardProps {
	id: string;
	title: string;
	release_year: string;
	genre: string;
	description: string;
}

export default function TicketCard(props: ITicketCardProps) {
	const { title, release_year, genre, description, id } = props;
	const isAuthorized =
		!!useAppSelector((state: RootState) => state.user.token) ||
		!!localStorage.getItem('token');
	const navigate = useNavigate();
	return (
		<article
			className={styles.ticketCard}
			onClick={() => {
				navigate(`/films/${id}`);
			}}
		>
			<img
				src={`${__API_URL__}/static/images/${id}`}
				alt={title}
				className={styles.image}
			/>
			<div className={styles.centralBlock}>
				<div>
					<h3 className={styles.title}>{title}</h3>
					<div className={styles.rating}></div>
				</div>
				<div className={styles.description}>
					<span className={styles.point}>Жанр</span>
					<span>{genre}</span>
					<span className={styles.point}>Год выпуска</span>
					<span>{release_year}</span>
					<span className={styles.point}>Описание</span>
					<span className={styles.descriptionPoint}>{description}</span>
				</div>
			</div>
			{isAuthorized && <Rating id={id} />}
		</article>
	);
}
