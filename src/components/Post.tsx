import Image from 'next/image';
import EmailSymbol from '@/src/components/EmailSymbol';
import Link from 'next/link';
import { User } from '@/src/types/user';
import { PostType } from '@/src/types/post';

export default function Post({ post, author }: { post: PostType; author: User }) {
	function formatRelative(date: Date, maxDays = 7): string {
		const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
		const now = new Date();
		const diffSeconds = (date.getTime() - now.getTime()) / 1000;

		if (Math.abs(diffSeconds) > maxDays * 86400) {
			return date.toLocaleDateString();
		}

		const divisions: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
			{ amount: 60, name: 'second' },
			{ amount: 60, name: 'minute' },
			{ amount: 24, name: 'hour' },
			{ amount: 7, name: 'day' },
		];

		let duration = diffSeconds;

		for (const division of divisions) {
			if (Math.abs(duration) < division.amount) {
				return rtf.format(Math.round(duration), division.name);
			}
			duration /= division.amount;
		}

		return date.toLocaleDateString();
	}

	return (
		<article className='w-full flex flex-col gap-2 border border-zinc-700 rounded-2xl py-4 px-4 md:px-10 md:pr-5'>
			<div className='flex justify-between'>
				<Link className='flex gap-2 items-center' href={`/user/${author.nickname}`}>
					<div className='flex gap-1 items-center'>
						<div className='rounded-full flex items-center justify-center overflow-hidden h-10 w-10 bg-gray-400 text-white'>
							{author?.image ? <Image src={author.image} width={40} height={40} alt='' /> : '?'}
						</div>
					</div>
					<div>
						<div className='font-medium'>
							<EmailSymbol />
							{author.nickname}
						</div>
						<div className='self-end text-[14px] text-zinc-600'>{formatRelative(post.createdAt)}</div>
					</div>
				</Link>
				<Link href={`/post/${post.id}`}>
					<div className='h-5 w-5 mask-[url(/images/right-arrow.svg)] mask-center mask-contain mask-no-repeat bg-zinc-500'></div>
				</Link>
			</div>

			<div className='md:pr-5'>
				<div className='text-[14px] md:text-[16px]'>{post.text}</div>
			</div>
		</article>
	);
}
