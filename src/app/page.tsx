import prisma from '@/lib/prisma';
import { signIn } from '@/auth';
import Image from 'next/image';

export default async function Home() {
	const users = await prisma.user.findMany();
	console.log('hello static')
	return (
		<div className='h-full text-white'>
			<div
				className='flex flex-col gap-2 justify-center items-center
			'
			>
				<div className=''>Hello tweaker</div>
				<form
					action={async () => {
						'use server';
						await signIn('github');
					}}
				>
					<button className='button bg-white text-black' type='submit'>
						<Image src='/images/google.png' width='32' height='32' alt=''/>
						Sign in with GitHub
					</button>
				</form>
				<form
					action={async () => {
						'use server';
						await signIn('google');
					}}
				>
					<button className='button bg-gray-700' type='submit'>
						<span className='w-8 h-8 bg-white mask-[url(/images/github.png)] mask-no-repeat mask-contain mask-center'></span>
						<span>Sign in with Google</span>
					</button>
				</form>
			</div>
		</div>
	);
}
