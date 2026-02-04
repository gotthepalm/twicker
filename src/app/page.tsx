import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
	// const session = await auth()
	// if (!session) redirect('/login')
	return (
		<div className='h-full text-white'>
			<div
				className='flex flex-col gap-2 justify-center items-center
			'
			>
				<div className=''>Main Page</div>
			</div>
		</div>
	);
}
