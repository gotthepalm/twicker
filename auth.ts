import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter"
import GitHub from '@auth/core/providers/github';
import Google from '@auth/core/providers/google';
import { prisma } from "@/lib/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [GitHub, Google],
});
