import { User } from '@/src/types/user';
import createPost from '@/src/actions/createPost';
import Image from 'next/image';

export default function CreatePost({ author }: { author: User }) {
	return (
		<div className='w-full flex bg-zinc-900 rounded-2xl py-5 px-5 md:px-10'>
			<form
				className='flex flex-col md:flex-row w-full gap-4'
				action={async (formData) => {
					'use server';
					await createPost(formData, author);
				}}
			>
				<div className='w-full flex items-center gap-2'>
					<div className='rounded-full flex items-center justify-center overflow-hidden h-10 w-10 bg-gray-400 text-white'>
						{author?.image ? <Image src={author.image} width={40} height={40} alt='' /> : '?'}
					</div>
					<input
						className='w-5/6 border border-t-0 border-r-0 border-l-0 border-b-zinc-700 focus:outline-0'
						placeholder="What's new?"
						name='text'
						type='text'
					/>
				</div>

				<button className='button w-full md:w-auto'>Post</button>
			</form>
		</div>
	);
}
