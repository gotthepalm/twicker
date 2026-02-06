import prisma from '@/lib/prisma';
import Profile from '@/src/components/Profile';
import { auth } from '@/auth';
import AdminProfile from '@/src/components/AdminProfile';

export default async function User({ params }: { params: Promise<{ user: string }> }) {
	const { user } = await params;
	const dbUser = await prisma.user.findUnique({
		where: {nickname: user}
	})
	if (!dbUser) {
		return (
			<div>error</div>
		);
	}
	const session = await auth()
	if (dbUser.id !== session?.user.id) {
		return (
			<div className='flex gap-2'>
				<Profile user={dbUser}/>
			</div>
		);
	}
	return (
		<div className='flex gap-2'>
			<AdminProfile user={dbUser}/>
		</div>
	);

}
