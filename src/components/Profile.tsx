import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/src/types/user';

export default function Profile({ user }: { user: User }) {
	return (
		<div className='w-full max-w-3xl mx-auto pb-10 flex flex-col justify-start'>
			<div className='flex gap-5 items-start'>
				<Link href={user.nickname ? `/${user.nickname}` : '/registration'}>
					<div className='rounded-full overflow-hidden h-16 w-16 bg-gray-400 botder border-zinc-700 text-white'>
						{user?.image ? <Image src={user.image} width={64} height={64} alt='' /> : '?'}
					</div>
				</Link>
				<div>
					<div className='text-3xl font-medium'>{user.nickname}</div>
					<div className='text-gray-400'>{user.name}</div>
				</div>
			</div>
		</div>
	);
}
