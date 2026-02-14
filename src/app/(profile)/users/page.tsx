import prisma from '@/lib/prisma';
import Profile from '@/src/app/(profile)/_components/Profile';

export default async function Users() {
	const users = await prisma.user.findMany()
    return (
        <>
			{users.map((value, index) => {
				return <Profile key={index} user={value}/>
			})}
		</>
    )
}