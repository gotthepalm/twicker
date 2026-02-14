'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import EmailSymbol from '@/src/components/EmailSymbol';

export default function ClientSection() {
	const { data: session, status } = useSession();
	const [openMenu, setOpenMenu] = useState<boolean>(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpenMenu(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	if (status === 'loading') return null;
	if (!session) {
		return (
			<Link href='/login' className='button'>
				Log In
			</Link>
		);
	}

	return (
		<div className='flex items-center gap-2 relative'>
			{/*test section*/}
			{/*<div>Client:{session.user.nickname}</div>*/}
			{/**/}
			<Link href={session.user.nickname ? `/user/${session.user.nickname}` : '/registration'}>
				<div className='rounded-full flex items-center justify-center overflow-hidden h-10 w-10 bg-gray-400 text-white'>
					{session.user?.image ? (
						<Image src={session.user.image} width={40} height={40} alt='' />
					) : (
						'?'
					)}
				</div>
			</Link>

			<button
				onClick={() => setOpenMenu((prev) => !prev)}
				className='flex flex-col px-2 py-1.5 rounded-lg border border-zinc-700 cursor-pointer gap-0.5'
			>
				<span className='h-1 w-1 bg-zinc-300 rounded-full'></span>
				<span className='h-1 w-1 bg-zinc-300 rounded-full'></span>
				<span className='h-1 w-1 bg-zinc-300 rounded-full'></span>
			</button>

			{openMenu && (
				<div ref={menuRef} className='flex flex-col items-start border border-zinc-700 w-[200px] py-2.5 px-4 text-[16px] bg-black rounded-xl absolute top-12 right-0'>
					<div className='flex justify-between w-full items-center'>
						<div className='font-medium'>
							<EmailSymbol />
							{session.user.nickname}
						</div>
					</div>

					<div className='text-zinc-300 mb-10'>{session.user?.name}</div>

					<button className='button  w-3/4 py-1' onClick={() => signOut()}>
						Sign Out
						<Image src='/images/sign-out.svg' width='20' height='20' alt=''/>
					</button>
				</div>
			)}
		</div>
	);
}

