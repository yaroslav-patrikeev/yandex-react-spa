import styles from './FIlmsNotFound.module.css';

export default function FilmsNotFound() {
	return (
		<section className={styles.notFound}>
			<h3 className={styles.title}>Фильмы не найдены</h3>
			<p className={styles.description}>Измените запрос и попробуйте снова</p>
		</section>
	);
}
