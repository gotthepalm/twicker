'use client';

import { redirect } from 'next/navigation';
import { setNickname } from '@/src/actions/setNickname';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@/src/components/Profile';

export default function Registration() {
	const { data: session, status, update } = useSession();
	const router = useRouter();
	if (status === 'loading') return <div>Loading...</div>;
	if (!session) redirect('/login');
	if (!session.user.nickname) {
		return (
			<form
				className='flex flex-col gap-1'
				action={async (formData) => {
					await setNickname(formData);
					await update();
					router.refresh();
				}}
			>
				<input
					type='text'
					placeholder='Enter your nickname...'
					className='border border-zinc-700 w-full text-[16px] placeholder:text-[16px] bg-black py-1.5 px-4 rounded-xl'
					name='nickname'
				/>
				<p className='text-[14px] text-zinc-400 px-2.5 pb-3'>
					Nickname must be include 3-20 <span className='font-medium'>lowercase</span> characters, no
					special characters, no spaces, you can use <code className='bg-zinc-900 p-1 pt-0 rounded-sm'>_</code> to separate your nickname
				</p>
				<button className='button w-full rounded-xl border border-zinc-700 text-white hover:bg-zinc-700 bg-zinc-800'>
					Submit
				</button>
			</form>
		);
	}
	redirect('/')
	// return (
	// 	<>
	// 		<Profile user={session.user} />
	// 		<div className='w-full max-w-[600px] mx-auto px-10 py-5 border rounded-2xl border-zinc-700'>
	// 			<form
	// 				className='flex flex-col gap-1'
	// 				action={async (formData) => {
	// 					await setNickname(formData);
	// 					await update();
	// 					router.refresh();
	// 				}}
	// 			>
	// 				<input
	// 					type='text'
	// 					placeholder='Enter your nickname...'
	// 					className='border border-zinc-700 w-full text-[16px] placeholder:text-[16px] bg-black py-1.5 px-4 rounded-xl'
	// 					name='nickname'
	// 				/>
	// 				<p className='text-[14px] text-zinc-400 px-2.5 pb-3'>
	// 					Nickname must be include 3-20 <span className='font-medium'>lowercase</span> characters, no
	// 					special characters, no spaces, you can use <code className='bg-zinc-900 p-1 pt-0 rounded-sm'>_</code> to separate your nickname
	// 				</p>
	// 				<button className='button w-full rounded-xl border border-zinc-700 text-white hover:bg-zinc-700 bg-zinc-800'>
	// 					Change nickname
	// 				</button>
	// 			</form>
	// 		</div>
	// 	</>
	// );
}
