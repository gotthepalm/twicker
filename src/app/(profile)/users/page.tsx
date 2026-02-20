import prisma from '@/lib/prisma';
import Profile from '@/src/app/(profile)/_components/Profile';

export const dynamic = 'force-dynamic'

export default async function Users() {
	const users = await prisma.user.findMany()
    return (
        <div className='flex flex-col gap-4'>
			{users.map((value, index) => {
				return <Profile key={index} user={value}/>
			})}
		</div>
    )
}