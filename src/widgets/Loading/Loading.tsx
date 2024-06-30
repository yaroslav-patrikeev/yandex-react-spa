import Image from 'next/image';

import styles from './Loading.module.css';
export default function Loading() {
	return (
		<div className={styles.loading}>
			<Image
				src={'/loader.svg'}
				className={styles.image}
				width={48}
				height={48}
				alt='loader'
			/>
		</div>
	);
}
