import classNames from 'classnames';
import { useState } from 'react';
import styles from './Input.module.css';

interface IInput {
	isRequired?: boolean;
	label: string;
	placeholder: string;
	description?: string;
	isError?: boolean;
	value: string;
	onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
	isRequired = true,
	label,
	placeholder,
	description,
	isError = false,
	value,
	onChange,
}: IInput) {
	const [isActive, setIsActive] = useState<boolean>(false);
	return (
		<div className={styles.inputWrapper}>
			<p className={styles.label}>
				{label}
				{isRequired && <span className={styles.required}>*</span>}
			</p>

			<input
				className={classNames(styles.input, isActive && styles.inputActive)}
				type='text'
				placeholder={placeholder}
				onFocus={() => setIsActive(true)}
				onBlur={() => setIsActive(false)}
				value={value}
				onChange={onChange}
			/>
			<span
				className={classNames(
					styles.description,
					isError && styles.descriptionShow
				)}
			>
				{description}
			</span>
		</div>
	);
}
