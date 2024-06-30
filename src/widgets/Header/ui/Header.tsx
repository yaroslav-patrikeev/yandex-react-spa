'use client';

import Modal from '@/features/Modal/Modal';
import { RootState } from '@/providers/store';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/storeHooks';
import { logout, showAuthModal } from '@/store/userSlice';
import AuthModal from '@/widgets/AuthModal/AuthModal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '../../../shared/ui/Button/Button';
import styles from './Header.module.css';

export default function Header() {
	const token = useAppSelector((state: RootState) => state.user.token);
	const isShowAuthModal = useAppSelector(
		(state: RootState) => state.user.isShowAuthModal
	);
	const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const router = useRouter();
	useEffect(() => {
		const isToken = !!localStorage.getItem('token') || !!token;
		setIsAuthorized(isToken);
		if (isToken) {
			dispatch(showAuthModal(false));
		}
	}, [token, dispatch]);
	return (
		<header className={styles.wrapper}>
			<div className={styles.header}>
				<h1
					className={styles.title}
					onClick={() => {
						router.push('/');
					}}
				>
					Фильмопоиск
				</h1>
				{isAuthorized ? (
					<div className={styles.authBar}>
						<div className={styles.profileIcon}></div>
						<Button
							text='Выйти'
							theme='empty'
							onClick={() => {
								localStorage.removeItem('token');
								dispatch(logout());
							}}
						/>
					</div>
				) : (
					<Button
						text='Войти'
						theme='filled'
						onClick={() => {
							dispatch(showAuthModal(true));
						}}
					/>
				)}
				{isShowAuthModal && (
					<Modal>
						<AuthModal />
					</Modal>
				)}
			</div>
		</header>
	);
}
