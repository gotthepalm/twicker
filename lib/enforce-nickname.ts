import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function enforceNickname() {
	const session = await auth();
	if (!session?.user?.email) return null;

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
		select: { nickname: true },
	});

	if (user && !user.nickname) {
		redirect('/registration/username');
	}

	return user;
}
