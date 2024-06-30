import {
	IGetMovieNormalizedResponse,
	useLazyGetFilmQuery,
} from '@/shared/api/api';
import FilmCard from '@/widgets/FilmCard/FilmCard';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './FilmPage.module.css';

export default function FilmPage() {
	const { filmId } = useParams();
	const [getFilm, { data, isFetching }] = useLazyGetFilmQuery();
	const [response, setResponse] = useState<IGetMovieNormalizedResponse>();
	useEffect(() => {
		if (filmId) {
			getFilm({ id: filmId });
		}
	}, [filmId, getFilm]);

	useEffect(() => {
		if (data && !isFetching) setResponse(data);
	}, [data, isFetching]);

	return (
		<div className={styles.filmPage}>
			{response && <FilmCard {...response} />}
			<h3 className={styles.actorsTitle}>Актеры</h3>
			{response?.actors.map(actor => (
				<img src={actor.photo} width={'160px'} />
			))}
		</div>
	);
}
