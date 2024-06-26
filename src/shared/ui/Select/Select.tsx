import classNames from 'classnames';
import { useState } from 'react';
import styles from './Select.module.css';

interface ISelectParams {
	title: string;
	placeholder?: string;
	isRequired?: boolean;
	showIcon?: boolean;
}

export default function Select(params: ISelectParams) {
	const [activeArrow, setActiveArrow] = useState<boolean>(false);

	const { title, isRequired, showIcon, placeholder } = params;
	return (
		<div className={styles.select}>
			<div className={styles.selectTitle}>
				<span className={styles.selectTitleText}>{title}</span>
				{isRequired && <span className={styles.selectTitleRequired}></span>}
				{showIcon && <span className={styles.selectTitleIcon}></span>}
			</div>
			<div className={styles.selectInput}>
				{placeholder && (
					<span className={styles.selectInputPlaceholder}>{placeholder}</span>
				)}
				<button
					className={classNames(
						styles.selectInputIcon,
						activeArrow
							? styles.selectInputIconActive
							: styles.selectInputIconPassive
					)}
					onClick={() => setActiveArrow(!activeArrow)}
				></button>
			</div>
		</div>
	);
}
