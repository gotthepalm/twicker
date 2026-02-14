import prisma from '@/lib/prisma';
import Profile from '@/src/app/(profile)/_components/Profile';
import AdminProfile from '@/src/app/(profile)/_components/AdminProfile';
import { auth } from '@/auth';
import { notFound } from 'next/navigation';

export default async function User({ params }: { params: Promise<{ user: string }> }) {
	const { user } = await params;
	const dbUser = await prisma.user.findUnique({
		where: {nickname: user}
	})
	if (!dbUser) {
		return (
			notFound()
		);
	}
	const session = await auth()
	if (session?.user.id === dbUser.id) {
		return <AdminProfile user={dbUser}/>
	}
	return <Profile user={dbUser}/>
}
