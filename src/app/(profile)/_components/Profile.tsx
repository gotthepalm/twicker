import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/src/types/user';
import EmailSymbol from '@/src/components/EmailSymbol';

export default function Profile({ user }: { user: User }) {
	return (
		<div className='w-full max-w-3xl mx-auto pb-10 flex flex-col justify-start'>
			<div className='flex border border-zinc-700 rounded-2xl py-5 px-10 gap-5 items-start'>
				<Link href={user.nickname ? `/user/${user.nickname}` : '/registration'}>
					<div className='rounded-full flex items-center justify-center overflow-hidden h-14 w-14 bg-gray-400 text-white'>
						{user.image ? (
							<Image src={user.image} width={56} height={56} alt='' />
						) : (
							'?'
						)}
					</div>
				</Link>
				<div>
					<div className='text-3xl font-medium mb-2'><EmailSymbol/>{user.nickname}</div>
					<div className='text-gray-400'>{user.name}</div>
				</div>
			</div>
		</div>
	);
}
