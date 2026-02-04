import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Redirect() {
	const session = await auth()
	if (!session) redirect('/login')
	if (!session.user.nickname) redirect('/registration')
	redirect('/')
}