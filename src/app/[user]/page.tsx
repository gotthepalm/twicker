import prisma from '@/lib/prisma';
import Profile from '@/src/components/Profile';

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

	return (
		<div className='flex gap-2'>
			<Profile user={dbUser}/>
		</div>
	);
}
