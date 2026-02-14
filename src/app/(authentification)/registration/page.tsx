import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import Form from '@/src/app/(authentification)/registration/Form';

export default async function Registration() {
	const session = await auth();
	if (!session) redirect('/login');
	if (session.user.nickname) redirect('/');
	return (
		<div className='w-full max-w-[500px] mx-auto border border-zinc-700 py-5 px-10 rounded-xl'>
			<Form/>
		</div>
	);
}
