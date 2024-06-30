import StoreProvider from '@/providers/StoreProvider'
import Header from '@/widgets/Header/ui/Header'
import 'normalize.css'
import './globals.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ru'>
			<body id='root'>
				<StoreProvider>
					<Header />
					{children}
				</StoreProvider>
			</body>
		</html>
	);
}
