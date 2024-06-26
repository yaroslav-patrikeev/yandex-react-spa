import { Outlet } from 'react-router-dom';
import Header from '../../widgets/Header/ui/Header';
import Page from '../../widgets/Page/ui/Page';

export default function LayoutApp() {
	return (
		<>
			<Header />
			<Page>
				<Outlet />
			</Page>
		</>
	);
}
