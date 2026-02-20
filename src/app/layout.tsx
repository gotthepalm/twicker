import '@/src/css/index.css';
import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import ClientSection from '@/src/components/ClientSection';
import Link from 'next/link';
import Image from 'next/image';
import MobileMenu from '@/src/components/MobileMenu';
import searchUser from '@/src/actions/searchUser';
import React from 'react';
import HeaderSearchForm from '@/src/components/HeaderSearchForm';

const IBMPlexSansJP = Roboto({
	weight: ['100', '200', '300', '400', '500', '600', '700'],
	subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
	title: 'twicker',
	description: "Twicker it's a new popular powerful social media",
	icons: {
		icon: [
			{ url: '/favicons/favicon.ico' },
			{ url: '/favicons/favicon-16x16.png', sizes: '16x16' },
			{ url: '/favicons/favicon-32x32.png', sizes: '32x32' },
		],
		apple: '/favicon/apple-touch-icon.png',
	},
	other: {
		google: 'notranslate',
	},
};
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {

	return (
		<html lang='en' translate='no'>
			<body className={`${IBMPlexSansJP.className} h-full bg-black text-white text-[18px]`}>
				<SessionProvider>
					<header className='fixed w-full bg-black/50 z-20 backdrop-blur-xl'>
						<div className='mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 h-20'>
							<Link href='/' className='flex text-white no-underline items-center gap-2'>
								<Image src='/images/twicker.png' width={40} height={40} alt='Logo' />
								<h1 className='text-3xl'>twicker</h1>
							</Link>
							<nav className='hidden lg:block'>
								<ul className='flex items-center gap-10 text-[20px] font-medium'>
									<li>
										<Link href='/' className='custom-link'>
											Home
										</Link>
									</li>
									<li>
										<Link href='/users' className='custom-link'>
											Users
										</Link>
									</li>
									<li>
										<Link href='/registration' className='custom-link'>
											Registration
										</Link>
									</li>
								</ul>
							</nav>
							<div className='hidden lg:flex items-center gap-5'>
								<HeaderSearchForm searchUserAction={searchUser}/>
								<ClientSection />
							</div>
							<MobileMenu searchUserAction={searchUser}/>
						</div>
					</header>
					<main className='h-full pt-20'>
						<div className='h-full py-10'>{children}</div>
					</main>
				</SessionProvider>
				<footer></footer>
			</body>
		</html>
	);
}
