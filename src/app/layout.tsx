import '../css/index.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { auth, signOut } from '@/auth';

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
	const session = await auth();
	return (
		<html className='h-[200dvh]' lang='en'>
			<body className='h-full bg-black text-white text-[18px]'>
				<header className='fixed w-full bg-black/50 z-20 backdrop-blur-xl'>
					<div className='mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 h-20'>
						<Link href='/' className='flex text-white no-underline items-center gap-2'>
							<Image src='/images/twicker.png' width={40} height={40} alt='Logo' />
							<h1 className='text-3xl'>twicker</h1>
						</Link>
						<nav className=''>
							<ul className='flex items-center gap-10 text-sm font-medium'>
								<li>
									<Link
										href='/'
										className='relative text-[18px] text-white no-underline after:absolute
										after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2
										after:bg-white after:transition-all after:duration-300 after:ease-out
										hover:after:w-full'
									>
										Home
									</Link>
								</li>
								<li>
									<Link
										href='/posts/post'
										className='relative text-[18px] text-white no-underline after:absolute
										after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2
										after:bg-white after:transition-all after:duration-300 after:ease-out
										hover:after:w-full'
									>
										Posts
									</Link>
								</li>
								<li>
									<Link
										href='/settings'
										className='relative text-[18px] text-white no-underline after:absolute
										after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2
										after:bg-white after:transition-all after:duration-300 after:ease-out
										hover:after:w-full'
									>
										Settings
									</Link>
								</li>
							</ul>
						</nav>
						{!session ? (
							<Link
								href='/login'
								className='text-sm font-medium relative text-[18px] text-black no-underline bg-white
								 px-2.5 py-1.5 rounded-2xl'
							>
								Log In
							</Link>
						) : (
							<div className='flex gap-2'>
								<div className='rounded-full overflow-hidden h-10 w-10 bg-gray-400 text-white border-2'>
									{session.user?.image ? (
										<Image src={session.user.image} width='40' height='40' alt='' className='' />
									) : (
										'?'
									)}
								</div>
								<form
									action={async () => {
										'use server';
										await signOut();
									}}
								>
									<button
										className='text-sm font-medium relative text-[18px] text-black no-underline bg-white
								 px-2.5 py-1.5 rounded-2xl'
										type='submit'
									>
										Sign Out
									</button>
								</form>
							</div>
						)}
					</div>
				</header>
				<main className='h-full pt-20'>
					<div className='w-full max-w-7xl mx-auto py-10 px-2.5 flex justify-center'>{children}</div>
				</main>
				<footer></footer>
			</body>
		</html>
	);
}
