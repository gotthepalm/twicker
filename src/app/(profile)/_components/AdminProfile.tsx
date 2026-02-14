'use client';

import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/src/types/user';
import { useActionState, useState } from 'react';
import { useSession } from 'next-auth/react';
import EmailSymbol from '@/src/components/EmailSymbol';
import { useRouter } from 'next/navigation';
import setNickname from '@/src/actions/setNickname';
import setName from '@/src/actions/setName';

export default function AdminProfile({ user }: { user: User }) {
	const { update } = useSession();
	const router = useRouter();

	const [editName, setEditName] = useState<boolean>(false);
	const [editNickname, setEditNickname] = useState<boolean>(false);

	const [nickState, nickAction, nickPending] = useActionState(
		async (_prev: string | { ok: true; nickname: string } | null, formData: FormData) => {
			const state = await setNickname(_prev, formData);
			if (state && typeof state === "object" && state.ok) /*if success*/ {
				await update();
				router.replace(`/user/${state.nickname}`);
			}
			return state;
		},
		null,
	);
	const [nameState, nameAction, namePending] = useActionState(async (_prev: string | null, formData: FormData) => {
		const state = await setName(_prev, formData);
		if (!state) {
			setEditName(false)
			await update();
		}
		return state;
	}, null);

	return (
		<div className='w-full max-w-3xl mx-auto pb-10 flex flex-col justify-start'>
			<div className='flex border border-zinc-700 rounded-2xl py-5 px-10 gap-5 items-start'>
				<div>
					<Link href={user.nickname ? `/user/${user.nickname}` : '/registration'}>
						<div className='rounded-full flex items-center justify-center overflow-hidden h-14 w-14 bg-gray-400 text-white'>
							{user.image ? <Image src={user.image} width={56} height={56} alt='' /> : '?'}
						</div>
					</Link>
				</div>
				<div>
					{/*Nickname edit*/}

					<div className='flex gap-1'>
						{editNickname ? (
							<form className='flex gap-2' action={nickAction}>
								<input type='text' name='nickname' placeholder='Enter nickname' />
								<button className='button border border-zinc-700 bg-black text-zinc-400 hover:bg-zinc-300 hover:text-zinc-800'>
									{nickPending ? 'Saving...' : 'Submit'}
								</button>
							</form>
						) : (
							<div className='text-3xl font-medium'>
								<EmailSymbol />
								{user.nickname}
							</div>
						)}
						<p className='text-[14px] text-red-400'>
							{nickState === 'invalid_nickname'
								? 'Invalid nickname'
								: nickState === 'already_taken'
									? 'Nickname already taken'
									: null}
						</p>
						<button
							className='px-1 rounded-lg border border-zinc-700 cursor-pointer'
							onClick={() => setEditNickname(true)}
						>
							<span className='block h-7 w-7 bg-zinc-200 mask-[url(/images/pencil.svg)] mask-contain mask-center mask-no-repeat'></span>
						</button>
					</div>

					{/*Name edit*/}

					<div className='flex gap-1'>
						{editName ? (
							<form className='flex gap-2' action={nameAction}>
								<input type='text' name='name' placeholder='Enter name' />
								<button className='button border border-zinc-700 bg-black text-zinc-400 hover:bg-zinc-300 hover:text-zinc-800'>
									{namePending ? 'Saving...' : 'Submit'}
								</button>
							</form>
						) : (
							<div className='text-zinc-400'>{user.name}</div>
						)}
						<p className='text-[14px] text-red-400'>
							{nameState === 'invalid_name' ? 'Invalid name' : null}
						</p>
						<button
							className='px-1 rounded-lg border border-zinc-700 cursor-pointer'
							onClick={() => setEditName(true)}
						>
							<span className='block h-7 w-7 bg-zinc-200 mask-[url(/images/pencil.svg)] mask-contain mask-center mask-no-repeat'></span>
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
