'use client';

import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/src/types/user';
import { useState } from 'react';
import { setImage } from '@/src/actions/setImage';
import { setNickname } from '@/src/actions/setNickname';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AdminProfile({ user }: { user: User }) {
	const router = useRouter();
	const { update } = useSession();
	const [editImage, setEditImage] = useState<boolean>(false);
	const [editNickname, setEditNickname] = useState<boolean>(false);
	return (
		<div className='w-full max-w-3xl mx-auto pb-10 flex flex-col justify-start'>
			<div className='flex gap-5 items-start'>
				<div>
					<Link href={user.nickname ? `/${user.nickname}` : '/registration'}>
						<div className='rounded-full overflow-hidden h-16 w-16 bg-gray-400 botder border-zinc-700 text-white'>
							{user?.image ? <Image src={user.image} width={64} height={64} alt='' /> : '?'}
						</div>
					</Link>
					<button className='button' onClick={() => setEditImage(true)}>
						edit image
					</button>
					{editImage ? (
						<form
							action={async (formData) => {
								await setImage(formData);
								setEditImage(false);
							}}
						>
							<input type='text' name='image' />
							<button className='button'>submit</button>
						</form>
					) : null}
				</div>
				<div>
					<div>
						<div className='text-3xl font-medium'>{user.nickname}</div>
						<button className='button' onClick={() => setEditNickname(true)}>
							edit nickname
						</button>
						{editNickname ? (
							<form
								action={async (formData) => {
									const nickname = formData.get('nickname') as string;
									await setNickname(formData);
									setEditNickname(false);
									await update()
									router.replace(`/${nickname}`)
								}}
							>
								<input type='text' name='nickname' />
								<button className='button'>submit</button>
							</form>
						) : null}
					</div>
					<div className='text-gray-400'>{user.name}</div>
				</div>
			</div>
		</div>
	);
}
