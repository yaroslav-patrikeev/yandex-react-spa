import Button from '../../../shared/ui/Button/Button';
import styles from './Header.module.css';

export default function Header() {
	const isAuthorized = true; // мок
	return (
		<header className={styles.header}>
			<h1 className={styles.title}>Фильмопоиск</h1>
			{isAuthorized ? (
				<div className={styles.authBar}>
					<div className={styles.profileIcon}></div>
					<Button text='Выйти' theme='empty' />{' '}
				</div>
			) : (
				<Button text='Войти' theme='filled' />
			)}
		</header>
	);
}
