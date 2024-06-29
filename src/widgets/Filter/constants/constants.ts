export const paramNames: Record<string, FilterType> = {
	['Жанр']: 'genre',
	'Год выпуска': 'release_year',
};
export const filters = {
	genre: {
		'0': 'Не выбран',
		comedy: 'Комедия',
		drama: 'Драма',
		action: 'Боевик',
		thriller: 'Триллер',
		horror: 'Ужасы',
		family: 'Семейный',
		cartoon: 'Анимированный',
		fantasy: 'Фэнтези',
		romance: 'Романтика',
		adventure: 'Приключения',
		musical: 'Мьюзикл',
		war: 'Военный',
	},
	release_year: {
		'0': 'Не выбран',
		'2009': '2009',
		'2008': '2008',
		'2007': '2007',
		'2006': '2006',
		'1990-2005': '1990-2005',
		'1950-1989': '1950-1989',
	},
};

export type GenreKeys =
	| '0'
	| 'comedy'
	| 'drama'
	| 'action'
	| 'thriller'
	| 'horror'
	| 'family'
	| 'cartoon'
	| 'fantasy'
	| 'romance'
	| 'adventure'
	| 'musical'
	| 'war';

export type YearKeys =
	| '0'
	| '2009'
	| '2008'
	| '2007'
	| '2006'
	| '1990-2005'
	| '1950-1989';

export type FilterType = keyof typeof filters;
