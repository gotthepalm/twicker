import { redirect } from 'next/navigation';

export default async function searchUser(formData: FormData) {
	'use server'
	const nickname = formData.get('nickname') as string;
	redirect(`/user/${encodeURI(nickname)}`);
}