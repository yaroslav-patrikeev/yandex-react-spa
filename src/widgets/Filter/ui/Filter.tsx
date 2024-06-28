import { allGenres } from '../../../entities/constants/genres.ts';
import Select from '../../../shared/ui/Select/Select';
import styles from './Filter.module.css';

export default function Filter() {
	return (
		<section className={styles.filterSection}>
			<p className={styles.title}>Фильтр</p>
			<div className={styles.filters}>
				<Select
					title='Жанр'
					placeholder='Выберите жанр'
					items={Object.keys(allGenres)}
				/>
				<Select
					title='Год выпуска'
					placeholder='Выберите год'
					items={['1', '2', '3', '4', '5']}
				/>
			</div>
		</section>
	);
}
