import '../index.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import ClientSection from '@/src/app/_components/ClientSection';
import Link from 'next/link';
import Image from 'next/image';
import { redirect } from 'next/navigation';

const IBMPlexSansJP = Roboto({
	weight: ['100', '200', '300', '400', '500', '600', '700'],
	subsets: ['latin', 'cyrillic'],
});

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
	async function searchUser(formData: FormData) {
		'use server'
		const nickname = formData.get('nickname') as string;
		redirect(`/user/${nickname}`);
	}
	// const session = await auth();
	return (
		<html className='' lang='en'>
			<body className={`${IBMPlexSansJP.className} h-full bg-black text-white text-[18px]`}>
				<SessionProvider>
					<header className='fixed w-full bg-black/50 z-20 backdrop-blur-xl'>
						<div className='mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 h-20'>
							<Link href='/' className='flex text-white no-underline items-center gap-2'>
								<Image src='/images/twicker.png' width={40} height={40} alt='Logo' />
								<h1 className='text-3xl'>twicker</h1>
							</Link>
							<nav className=''>
								<ul className='flex items-center gap-10 text-[20px] font-medium'>
									<li>
										<Link href='/' className='custom-link'>
											Home
										</Link>
									</li>
									<li>
										<Link href='/registration' className='custom-link'>
											Registration
										</Link>
									</li>
									<li>
										<Link href='/users' className='custom-link'>
											Users
										</Link>
									</li>
								</ul>
							</nav>
							<div className='flex items-center gap-5'>
								<form
									className='border border-zinc-700 rounded-2xl flex items-center px-2'
									action={searchUser}
								>
									<input
										placeholder='Search user...'
										type='text'
										className='border-none bg-transparent pl-3 pr-1 w-40 focus:outline-0 active:bg-black'
										name='nickname'
									/>
									<button
										type='submit'
										className='w-8 h-8 mask-[url(/images/search-icon.svg)] mask-no-repeat
								mask-center mask-contain bg-zinc-200 cursor-pointer'
									></button>
								</form>
								{/*test section*/}
								{/*<div>Server: {session?.user.nickname}</div>*/}
								{/**/}
								<ClientSection />
							</div>
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
