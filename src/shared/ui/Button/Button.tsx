import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

const availableTheme = {
	filled: 'buttonFilled',
	empty: 'buttonEmpty',
};

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	theme: 'filled' | 'empty';
}

export default function Button(props: IButtonProps) {
	const { text, theme } = props;
	return (
		<button
			className={classNames(styles[availableTheme[theme]], styles.button)}
		>
			{text}
		</button>
	);
}
