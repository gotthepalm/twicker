import Image from 'next/image';
import EmailSymbol from '@/src/components/EmailSymbol';
import Link from 'next/link';
import { User } from '@/src/types/user';
import { PostType } from '@/src/types/post';

export default function Post({ post, author }: { post: PostType, author: User }) {
	return (
		<article className='w-full flex border border-zinc-700 rounded-2xl py-5 px-10 pr-32 gap-4'>
			<Link href={`/user/${author.nickname}`}>
				<div className='flex gap-1 items-center'>
					<div className='rounded-full flex items-center justify-center overflow-hidden h-10 w-10 bg-gray-400 text-white'>
						{author?.image ? <Image src={author.image} width={40} height={40} alt='' /> : '?'}
					</div>
				</div>
			</Link>
			<div>
				<div className='font-medium'>
					<EmailSymbol />
					{author.nickname}
				</div>
				<div className='text-[16px]'>{post.text}</div>
			</div>
		</article>
	);
}
