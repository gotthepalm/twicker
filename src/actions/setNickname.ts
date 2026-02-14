"use server";

import { auth } from "@/auth";
import { Prisma } from "@/src/generated/client";
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const nicknameRegex = /^[a-z0-9_]{3,20}$/;

export default async function setNickname(
	_prev: string | {ok: true, nickname: string} | null,
	formData: FormData
): Promise<string | {ok: true, nickname: string}> {
	const session = await auth();
	const nickname = String(formData.get("nickname") ?? "");
	if (!nicknameRegex.test(nickname)) return "invalid_nickname";
	try {
		await prisma.user.update({
			where: { id: session?.user.id },
			data: { nickname },
		});
		revalidatePath('/')
		return {ok: true, nickname: nickname};
	} catch (error: unknown) {
		if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
			return "already_taken";
		}
		return "server";
	}
}