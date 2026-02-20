'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import EmailSymbol from '@/src/components/EmailSymbol';

export default function MobileMenu({ searchUserAction }: { searchUserAction: (formData: FormData) => Promise<void> }) {
	const { data: session, status } = useSession();
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	useEffect(() => {
		document.body.style.overflow = openMenu ? 'hidden' : '';
		return () => {
			document.body.style.overflow = '';
		};
	}, [openMenu]);
	if (status === 'loading') return null;

	return (
		<div className='flex lg:hidden'>
			{session?.user ? (
				<Link
					className='mr-4'
					href={session.user.nickname ? `/user/${session.user.nickname}` : '/registration'}
				>
					<div className='rounded-full flex items-center justify-center overflow-hidden h-10 w-10 bg-gray-400 text-white'>
						{session.user?.image ? <Image src={session.user.image} width={40} height={40} alt='' /> : '?'}
					</div>
				</Link>
			) : (
				<Link href='/login' className='button mr-4'>
					Log In
				</Link>
			)}
			<button onClick={() => setOpenMenu(true)} className='border border-zinc-700 rounded-xl p-2'>
				<svg width='24' height='24' viewBox='0 0 24 24' aria-hidden='true'>
					<path d='M4 7h16M4 12h16M4 17h16' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
				</svg>
			</button>
			{openMenu &&
				createPortal(
					<div
						onClick={() => setOpenMenu(false)}
						className='backdrop-blur-md fixed inset-0 z-50 h-100dvh w-100dvw flex lg:hidden items-center justify-center'
					>
						<div
							onClick={(e) => e.stopPropagation()}
							className='flex flex-col items-center gap-12 py-4 px-6 bg-black/40 border border-zinc-700 rounded-2xl'
						>
							<nav>
								<ul className='flex flex-col items-center gap-5 text-[20px] font-medium'>
									<li>
										<Link href='/' className='custom-link' onClick={() => setOpenMenu(false)}>
											Home
										</Link>
									</li>
									<li>
										<Link href='/users' className='custom-link' onClick={() => setOpenMenu(false)}>
											Users
										</Link>
									</li>
									<li>
										<Link
											href='/registration'
											className='custom-link'
											onClick={() => setOpenMenu(false)}
										>
											Registration
										</Link>
									</li>
								</ul>
							</nav>
							<div className='flex gap-2 flex-col items-center'>
								{session?.user ? (
									<>
										<div className='flex gap-2 items-center'>
											<Link
												href={
													session.user.nickname
														? `/user/${session.user.nickname}`
														: '/registration'
												}
												onClick={() => setOpenMenu(false)}
											>
												<div className='rounded-full flex items-center justify-center overflow-hidden h-10 w-10 bg-gray-400 text-white'>
													{session.user?.image ? (
														<Image src={session.user.image} width={40} height={40} alt='' />
													) : (
														'?'
													)}
												</div>
											</Link>
											<div className='flex justify-between w-full items-center'>
												<div className='font-medium'>
													<EmailSymbol />
													{session.user.nickname}
												</div>
											</div>
										</div>
										<button className='button group py-1' onClick={() => signOut()}>
											Sign Out
											<div
												className='h-5 w-5 mask-[url(/images/sign-out.svg)] mask-center mask-contain mask-no-repeat
										bg-black group-hover:bg-zinc-300 transition-all duration-300 ease-out'
											></div>
										</button>
									</>
								) : null}
							</div>
							<form
								className='border border-zinc-700 rounded-2xl flex items-center px-2'
								action={searchUserAction}
							>
								<input
									placeholder='Search user...'
									type='text'
									name='nickname'
									className='px-4 w-40 placeholder:text-[16px]'
								/>
								<button
									type='submit'
									className='w-8 h-8 mask-[url(/images/search-icon.svg)] mask-no-repeat
								mask-center mask-contain bg-zinc-200 cursor-pointer'
								></button>
							</form>
						</div>
					</div>,
					document.body,
				)}
		</div>
	);
}
