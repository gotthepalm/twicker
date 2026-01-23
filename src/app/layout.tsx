import '../index.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html className='h-full' lang='en'>
			<body className='h-full bg-black text-white text-[18px]'>
				<header className='w-full border-b border-gray-400'>
					<div className='relative mx-auto flex max-w-7xl items-center px-4 py-3'>
						<Link href='/' className='flex items-center gap-2'>
							<Image src='/images/twicker-x-typed.svg' width={40} height={40} alt='Logo' priority />
						</Link>
						<nav className='absolute left-1/2 -translate-x-1/2'>
							<ul className='flex items-center gap-6 text-sm font-medium'>
								<li>
									<Link href='/' className='text-gray-700 transition-colors hover:text-black'>
										Home
									</Link>
								</li>

								<li>
									<Link href='/posts' className='text-gray-700 transition-colors hover:text-black'>
										Posts
									</Link>
								</li>

								<li>
									<Link
										href='/auth'
										className='rounded-md bg-black px-4 py-2 text-white transition hover:bg-black/80'
									>
										Log in
									</Link>
								</li>
							</ul>
						</nav>
					</div>
				</header>
				<main className='h-full'>{children}</main>
				<footer></footer>
			</body>
		</html>
	);
}
