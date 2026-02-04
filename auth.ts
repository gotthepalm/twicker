import NextAuth from 'next-auth';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [GitHub, Google],
	callbacks: {
		session({ session, user }) {
			session.user.nickname = user.nickname
			return session
		},
	}
});
