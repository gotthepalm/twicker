import { User } from '@/src/types/user';
import prisma from '@/lib/prisma';

// работа с базой данных
const users = await prisma.user.findMany();
function findAccount(account: string): User | false {
	for (const i of users) {
		if (i.nickname === account) {
			return i;
		}
	}
	return false;
}
//
export async function generateMetadata({ params }: { params: Promise<{ account: string }> }) {
	const { account } = await params;
	const result = findAccount(account);
	if (result) {
		return {
			title: result.name,
		};
	} else {
		return {
			title: 'Uncorrected account name',
		};
	}
}
// компонент
export default async function Account({ params }: { params: Promise<{ account: string }> }) {
	const { account } = await params;
	const result = findAccount(account);
	return (
		<div className='bg-gray-800 text-white h-full flex justify-center'>
			<div>{result ? <div>{result.name}</div> : <div>error</div>}</div>
		</div>
	);
}
