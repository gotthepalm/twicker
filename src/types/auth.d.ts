// types/auth.d.ts
import type { DefaultSession } from "next-auth"
import type { User } from "@/src/types/user"

declare module "next-auth" {
	interface Session {
		user?: (DefaultSession["user"] & User)
	}
}

// ВАЖНО: расширяем AdapterUser, но nickname делаем OPTIONAL,
// иначе prisma-adapter (который типизируется как AdapterUser) начнет падать по типам.
declare module "@auth/core/adapters" {
	interface AdapterUser {
		nickname?: string | null
	}
}

