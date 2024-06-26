import Select from '../../../shared/ui/Select/Select';
import styles from './Filter.module.css';

export default function Filter() {
	return (
		<section className={styles.filterSection}>
			<Select title='Жанр' placeholder='Выберите жанр' />
		</section>
	);
}
