'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function setNickname(_prev: string | null, formData: FormData): Promise<string | null> {
	const session = await auth();
	const name = String(formData.get('name') ?? '');
	const length = [...name].length
	if (length < 3 || length > 20) {
		return "invalid_length";
	}
	await prisma.user.update({
		where: { id: session?.user.id },
		data: { name },
	});
	revalidatePath('/');
	return null;
}
