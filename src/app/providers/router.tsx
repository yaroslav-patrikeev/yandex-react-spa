import { createBrowserRouter } from 'react-router-dom';
import { FilmPage } from '../../pages/FilmPage';
import { MainPage } from '../../pages/MainPage';
import LayoutApp from '../ui/LayoutApp';

export const router = createBrowserRouter([
	{
		element: <LayoutApp />,
		children: [
			{
				path: '/',
				element: <MainPage />,
			},
			{
				path: '/films/:filmId',
				element: <FilmPage />,
			},
		],
	},
]);
