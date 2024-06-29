import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

export default function Modal({ children }: { children: ReactNode }) {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'visible';
		};
	}, []);

	return createPortal(
		<section className={styles.modal}>{children}</section>,
		document.body
	);
}
