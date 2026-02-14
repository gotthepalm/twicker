'use client';

import setNickname from '@/src/actions/setNickname';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

export default function Form() {
	const router = useRouter();
	const { update } = useSession();

	const [state, action, pending] = useActionState(async (_prev: string | { ok: true; nickname: string } | null, formData: FormData) => {
		const state = await setNickname(_prev, formData);
		if (state && typeof state === "object" && state.ok) /*if success*/ {
			await update();
			router.replace('/');
		}
		return state;
	}, null);
	return (
		<form className='flex flex-col gap-1' action={action}>
			<input
				type='text'
				placeholder='Enter your nickname...'
				className='border border-zinc-700 w-full text-[16px] placeholder:text-[16px] bg-black py-1.5 px-4 rounded-xl'
				name='nickname'
			/>
			<p className='text-[14px] text-zinc-400 px-2.5 pb-3'>
				Nickname must be 3-20 <span className='font-medium'>lowercase</span> characters, without special
				characters and spaces, you can use <code className='bg-zinc-900 p-1 pt-0 rounded-sm'>_</code> instead of
				spaces
			</p>
			<p className='text-[14px] text-red-400 px-2.5 pb-3'>
				{state === 'invalid_nickname'
					? 'Invalid nickname'
					: state === 'already_taken'
						? 'Nickname already taken'
						: null}
			</p>
			<button className='button w-full rounded-xl border border-zinc-700 text-white hover:bg-zinc-700 bg-zinc-800'>
				{pending ? 'Saving...' : 'Submit'}
			</button>
		</form>
	);
}
