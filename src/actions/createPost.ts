'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { User } from '@/src/types/user';

export default async function createPost(formData: FormData, author: User) {
	const text = formData.get('text') as string;
	await prisma.post.create({
		data: {
			text: text,
			authorId: author.id,
		},
	});
	revalidatePath('/')
}