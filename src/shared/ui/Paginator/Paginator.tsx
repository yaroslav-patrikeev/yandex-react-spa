import classNames from 'classnames';
import styles from './Paginator.module.css';

interface IPagination {
	pageNumber: number;
	totalPages: number;
	changePage: (number: number) => void;
}

export default function Paginator({
	pageNumber,
	totalPages,
	changePage,
}: IPagination) {
	return (
		<div className={styles.pagination}>
			{
				<button
					className={classNames(
						styles.arrow,
						styles.leftArrow,
						pageNumber === 1 && styles.disabled
					)}
					onClick={() => {
						changePage(pageNumber - 1);
					}}
					disabled={pageNumber === 1}
				></button>
			}
			<span>{pageNumber}</span>
			{
				<button
					className={classNames(
						styles.arrow,
						styles.rightArrow,
						pageNumber === totalPages && styles.disabled
					)}
					onClick={() => {
						changePage(pageNumber + 1);
					}}
					disabled={pageNumber === totalPages}
				></button>
			}
		</div>
	);
}
