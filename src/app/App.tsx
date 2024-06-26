import 'normalize.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './global.css';
import { router } from './providers/router';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<>
		<RouterProvider router={router} />
	</>
);
