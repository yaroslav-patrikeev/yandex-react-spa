import Select from '../../../shared/ui/Select/Select';
import { FilterType, filters, paramNames } from '../constants/constants.ts';
import styles from './Filter.module.css';

export default function Filter({
	addQueryParams,
	currentValue,
	sendToStore,
}: {
	addQueryParams: (str: string) => void;
	currentValue: ({ filterType }: { filterType: FilterType }) => string | null;
	sendToStore: (param: { filterType: string; value: string }) => void;
}) {
	return (
		<section className={styles.filterSection}>
			<p className={styles.title}>Фильтр</p>
			<div className={styles.filters}>
				<Select
					title='Жанр'
					placeholder='Выберите жанр'
					items={filters.genre}
					addQueryParams={addQueryParams}
					paramNames={paramNames}
					currentValue={currentValue}
					sendToStore={sendToStore}
				/>
				<Select
					title='Год выпуска'
					placeholder='Выберите год'
					items={filters.release_year}
					addQueryParams={addQueryParams}
					paramNames={paramNames}
					currentValue={currentValue}
					sendToStore={sendToStore}
				/>
			</div>
		</section>
	);
}
