import prisma from '@/lib/prisma';
import Image from 'next/image';

export default async function User({ params }: { params: Promise<{ user: string }> }) {
	const { user } = await params;
	const dbUsers = await prisma.user.findMany()
	for (const i of dbUsers) {
		if (i.email === user) {
			return (
				<>
					<div className='rounded-full overflow-hidden h-10 w-10 bg-gray-400 text-white border-2'>
						{i?.image ? <Image src={i.image} width={40} height={40} alt='' /> : '?'}
					</div>
					<div>{i.name}</div>
				</>
			)
		}
	}
	return (
		<>
			<div>Hello</div>
		</>
	);
}
