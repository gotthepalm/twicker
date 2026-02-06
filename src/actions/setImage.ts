'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const nicknameRegex = /^[a-z0-9_]{3,20}$/;

export async function setImage(formData: FormData) {
	const nickname = formData.get('image') as string;
	if (!nicknameRegex.test(nickname)) return;
	const session = await auth();
	await prisma.user.update({
		where: { id: session?.user.id },
		data: { nickname },
	});
	revalidatePath('/registration')
}