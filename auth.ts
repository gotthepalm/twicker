import NextAuth from 'next-auth';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from '@auth/prisma-adapter';
import { User } from '@/src/types/user';
import { Session } from 'next-auth';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [GitHub, Google],
		callbacks: {
			async session({ session, user }) {
				const u = user as User & { nickname?: string | null }

				return {
					...session,
					user: {
						// можно не тащить DefaultSession["user"], если тебе не нужно
						id: u.id,
						email: u.email ?? null,
						name: u.name ?? null,
						image: u.image ?? null,
						nickname: u.nickname ?? null,
					},
				} satisfies Session
			},
		},
});
