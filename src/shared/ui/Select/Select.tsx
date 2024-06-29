import { FilterType } from '@/widgets/Filter/constants/constants';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import styles from './Select.module.css';

interface ISelectParams {
	title: string;
	items: Record<string, string>;
	placeholder?: string;
	isRequired?: boolean;
	showIcon?: boolean;
	paramNames: Record<string, FilterType>;
	addQueryParams: (str: string) => void;
	currentValue: ({ filterType }: { filterType: FilterType }) => string | null;
	sendToStore: (param: { filterType: string; value: string }) => void;
}

export default function Select(params: ISelectParams) {
	const [activeArrow, setActiveArrow] = useState<boolean>(false);
	const [currentItem, setCurrentItem] = useState<null | string>(null);

	const {
		title,
		isRequired,
		showIcon,
		placeholder,
		items,
		paramNames,
		addQueryParams,
		currentValue,
		sendToStore,
	} = params;

	useEffect(() => {
		setCurrentItem(currentValue({ filterType: paramNames[title] }));
	}, [paramNames, title, currentValue]);
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
				<ul
					className={classNames(
						styles.selectItems,
						activeArrow && styles.selectItemsOpened
					)}
				>
					{Object.entries(items).map((item, i) => (
						<li
							key={i}
							className={styles.selectItem}
							onClick={() => {
								setCurrentItem(item[1]);
								addQueryParams(`${paramNames[title]}=${item[0]}`);
								sendToStore({
									filterType: paramNames[title],
									value: item[0],
								});
							}}
						>
							{item[1]}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
