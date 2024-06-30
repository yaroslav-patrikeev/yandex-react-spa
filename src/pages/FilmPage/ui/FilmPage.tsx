import {
	IGetMovieNormalizedResponse,
	useLazyGetFilmQuery,
} from '@/shared/api/api';
import Carousel from '@/shared/ui/Carousel/Carousel';
import FilmCard from '@/widgets/FilmCard/FilmCard';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './FilmPage.module.css';

export default function FilmPage() {
	const { filmId } = useParams();
	const [getFilm, { data, isFetching, isError }] = useLazyGetFilmQuery();
	const [response, setResponse] = useState<IGetMovieNormalizedResponse>();
	useEffect(() => {
		if (filmId) {
			getFilm({ id: filmId });
		}
	}, [filmId, getFilm]);

	useEffect(() => {
		if (data && !isFetching) setResponse(data);
	}, [data, isFetching]);

	useEffect(() => {
		alert('Возникла ошибка. Попробуйте перезагрузить страницу.');
	}, [isError]);

	return (
		<main className={styles.filmPage}>
			{response && <FilmCard {...response} />}
			<h3 className={styles.actorsTitle}>Актеры</h3>
			{response && <Carousel step={600} actors={response.actors} />}
		</main>
	);
}
