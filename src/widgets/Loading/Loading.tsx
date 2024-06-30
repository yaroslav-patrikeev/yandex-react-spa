import image from '../../shared/assets/icons/loader.svg';
import styles from './Loading.module.css';
export default function Loading() {
	return (
		<div className={styles.loading}>
			<img src={image} className={styles.image} alt='loader' />
		</div>
	);
}
