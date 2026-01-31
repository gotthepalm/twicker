'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

export default function SessionSectionClient() {
	const { data: session, status } = useSession();

	if (status === 'loading') return null;

	if (!session) {
		return (
			<Link href='/login' className='...'>
				Log In
			</Link>
		);
	}

	return (
		<div className='flex gap-2'>
			<div className='rounded-full overflow-hidden h-10 w-10 bg-gray-400 text-white'>
				{session.user?.image ? <Image src={session.user.image} width={40} height={40} alt='' /> : '?'}
			</div>

			<button
				className='text-black bg-white py-1.5 px-4 rounded-3xl font-medium hover:bg-black
				hover:text-white transition-all duration-300 ease-out'
				onClick={() => signOut()}
			>
				Sign Out
			</button>
		</div>
	);
}
