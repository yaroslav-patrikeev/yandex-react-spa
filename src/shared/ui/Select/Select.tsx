import classNames from 'classnames';
import { useState } from 'react';
import styles from './Select.module.css';

interface ISelectParams {
	title: string;
	items: string[];
	placeholder?: string;
	isRequired?: boolean;
	showIcon?: boolean;
}

export default function Select(params: ISelectParams) {
	const [activeArrow, setActiveArrow] = useState<boolean>(false);
	const [currentItem, setCurrentItem] = useState<null | string>(null);

	const { title, isRequired, showIcon, placeholder, items } = params;
	return (
		<div className={styles.select}>
			<div className={styles.selectTitle}>
				<span className={styles.selectTitleText}>{title}</span>
				{isRequired && <span className={styles.selectTitleRequired}></span>}
				{showIcon && <span className={styles.selectTitleIcon}></span>}
			</div>
			<div
				className={classNames(
					styles.selectInput,
					activeArrow && styles.selectInputActive
				)}
				onClick={() => setActiveArrow(!activeArrow)}
			>
				{placeholder && !currentItem && (
					<span className={styles.selectInputPlaceholder}>{placeholder}</span>
				)}
				{currentItem && (
					<span className={styles.selectInputCurrentItem}>{currentItem}</span>
				)}
				<div
					className={classNames(
						styles.selectInputIcon,
						activeArrow
							? styles.selectInputIconActive
							: styles.selectInputIconPassive
					)}
				></div>
				<div
					className={classNames(
						styles.selectItems,
						activeArrow && styles.selectItemsOpened
					)}
				>
					{items.map(item => (
						<div
							className={styles.selectItem}
							onClick={() => setCurrentItem(item)}
						>
							{item}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
