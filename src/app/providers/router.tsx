import FilmPage from '@/pages/FilmPage/ui/FilmPage';
import MainPage from '@/pages/MainPage/ui/MainPage';
import { createBrowserRouter } from 'react-router-dom';
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
