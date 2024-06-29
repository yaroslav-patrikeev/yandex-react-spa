import classNames from 'classnames';
import styles from './Button.module.css';

const availableTheme = {
	filled: 'buttonFilled',
	empty: 'buttonEmpty',
};

interface IButtonProps {
	text: string;
	onClick?: VoidFunction;
	theme?: 'filled' | 'empty';
}

export default function Button(props: IButtonProps) {
	const { text, theme = 'filled', onClick } = props;
	return (
		<button
			className={classNames(styles[availableTheme[theme]], styles.button)}
			onClick={onClick}
		>
			{text}
		</button>
	);
}
