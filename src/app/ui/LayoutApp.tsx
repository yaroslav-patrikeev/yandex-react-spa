import { Outlet } from 'react-router-dom';
import Header from '../../widgets/Header/ui/Header';

export default function LayoutApp() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
