import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/src/types/user';
import EmailSymbol from '@/src/components/EmailSymbol';
import Post from '@/src/components/Post';
import { PostType } from '@/src/types/post';

export default async function Profile({ user, posts }: { user: User, posts?: PostType[] }) {
	return (
		<div className='w-full max-w-3xl mx-auto px-3 flex flex-col justify-start gap-2'>
			<div className='flex border border-zinc-700 rounded-2xl py-5 px-5 md:px-10 gap-5 items-start'>
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
					<div className='text-2xl mb:text-3xl font-medium mb-2'><EmailSymbol/>{user.nickname}</div>
					<div className='text-gray-400'>{user.name}</div>
				</div>
			</div>
			{posts ? (
				<div className='w-full flex flex-col items-center gap-2'>
					{posts.map((value, index) => {
						return <Post key={index} author={user} post={value} />;
					})}
				</div>
			) : null}
		</div>
	);
}
