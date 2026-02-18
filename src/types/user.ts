import { Prisma } from '@/src/generated/client';

export type User = Prisma.UserGetPayload<{
	select: {
		id: true
		nickname: true
		name: true
		email: true
		image: true
	}
}>
