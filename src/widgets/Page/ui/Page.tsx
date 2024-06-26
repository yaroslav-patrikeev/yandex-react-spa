import { type ReactNode } from 'react';
import styles from './Page.module.css';

interface IPageProps {
	children: ReactNode;
}

export default function Page(props: IPageProps) {
	const { children } = props;
	return <main className={styles.main}>{children}</main>;
}
