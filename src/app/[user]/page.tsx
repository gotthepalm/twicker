import prisma from '@/lib/prisma';
import Image from 'next/image';
import { enforceNickname } from '@/lib/enforce-nickname';

export default async function User({ params }: { params: Promise<{ user: string }> }) {
	await enforceNickname();
	const { user } = await params;
	const dbUser = await prisma.user.findUnique({
		where: { nickname: user },
		select: { image: true, name: true, nickname: true },
	});
	if (dbUser) {
		return (
			<>
				<div className='rounded-full overflow-hidden h-10 w-10 bg-gray-400 text-white border-2'>
					{dbUser?.image ? <Image src={dbUser.image} width={40} height={40} alt='' /> : '?'}
				</div>
				<div>{dbUser.name}</div>
				<div className='text-sm text-zinc-400'>@{dbUser.nickname}</div>
			</>
		);
	}
	return (
		<>
			<div>Hello</div>
		</>
	);
}
