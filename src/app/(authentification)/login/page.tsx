
import LogInForm from '@/src/app/(authentification)/login/LogIn';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LogIn() {
	const session = await auth()
	if (session?.user) redirect('/')
	return <LogInForm/>
}
