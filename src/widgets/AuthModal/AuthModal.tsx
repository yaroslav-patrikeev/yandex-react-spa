import { login } from '@/entities/User/services/login';
import { showAuthModal } from '@/entities/User/services/slice';
import { useAppDispatch } from '@/shared/hooks/storeHooks';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import React, { useState } from 'react';
import styles from './AuthModal.module.css';

export default function AuthModal() {
	const dispatch = useAppDispatch();
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	return (
		<div className={styles.modal}>
			<div className={styles.header}>
				<h2 className={styles.title}>Авторизация</h2>
			</div>
			<div className={styles.inputs}>
				<Input
					label='Логин'
					placeholder='Введите логин'
					value={username}
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
						setUsername(evt.target.value)
					}
				/>
				<Input
					label='Пароль'
					placeholder='Введите пароль'
					value={password}
					onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
						setPassword(evt.target.value)
					}
				/>
			</div>
			<div className={styles.buttons}>
				<Button
					text='Войти'
					onClick={() => {
						dispatch(login({ username, password }));
					}}
				/>
				<Button
					text='Отменить'
					theme='empty'
					onClick={() => {
						dispatch(showAuthModal(false));
					}}
				/>
			</div>
		</div>
	);
}
