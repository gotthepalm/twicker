import '../css/index.css';
import type { Metadata } from 'next';
import Header from '@/src/app/_components/Header';
import { Providers } from '@/src/app/_components/Providers';

export const metadata: Metadata = {
	title: 'twicker',
	description: 'created by gotthepalm',
	icons: {
		icon: [
			{ url: '/favicons/favicon.ico' },
			{ url: '/favicons/favicon-16x16.png', sizes: '16x16' },
			{ url: '/favicons/favicon-32x32.png', sizes: '32x32' },
		],
		apple: '/favicon/apple-touch-icon.png',
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className='' lang='en'>
			<body className='h-full bg-black text-white text-[18px]'>
				<Providers>
					<Header/>
					<main className='h-full pt-20'>
						{children}
					</main>
					<footer></footer>
				</Providers>
			</body>
		</html>
	);
}
