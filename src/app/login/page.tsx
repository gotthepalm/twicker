import { signIn } from '@/auth';
import Image from 'next/image';

export default function LogIn() {
	return (
		<div className='flex flex-col'>
			<form
				action={async () => {
					'use server';
					await signIn('google');
				}}
			>
				<button className='button bg-white text-black' type='submit'>
					<Image src='/images/google.png' width='32' height='32' alt='' />
					Sign in with Google
				</button>
			</form>
			<form
				action={async () => {
					'use server';
					await signIn('github');
				}}
			>
				<button className='button bg-gray-700' type='submit'>
					<span className='w-8 h-8 bg-white mask-[url(/images/github.png)] mask-no-repeat mask-contain mask-center'></span>
					<span>Sign in with GitHub</span>
				</button>
			</form>
		</div>
	);
}
