import NextAuth from 'next-auth';
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { prisma } from "@/lib/prisma"
import { PrismaAdapter } from '@auth/prisma-adapter';

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [GitHub, Google],
		callbacks: {
			async session({ session, user }) {
				// user тут обычно есть (из DB session), но чтобы точно получить СВЕЖИЕ данные —
				// перечитаем из БД (после prisma.user.update они уже будут новые)
				const freshUser = await prisma.user.findUnique({
					where: { id: user.id },
					select: {
						id: true,
						name: true,
						email: true,
						image: true,
						nickname: true
					},
				});

				if (freshUser && session.user) {
					session.user.id = freshUser.id;
					session.user.name = freshUser.name;
					session.user.email = freshUser.email;
					session.user.image = freshUser.image;
					session.user.nickname = freshUser.nickname ?? undefined
				}

				return session;
			},
		},
});
