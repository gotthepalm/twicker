'use client';

import { useEffect } from 'react';
import { setNickname } from '@/src/actions/setNickname';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Registration() {
	const { data: session, status, update } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'loading') return;

		if (!session) {
			router.replace('/login');
			return;
		}

		if (session.user.nickname) {
			router.replace('/');
		}
	}, [status, session, router]);

	if (status === 'loading') return <div>Loading...</div>;
	if (!session) return null; // пока редиректим
	if (session.user.nickname) return null; // пока редиректим

	return (
		<div className="w-full max-w-[500px] mx-auto border border-zinc-700 py-5 px-10 rounded-xl">
			<form
				className="flex flex-col gap-1"
				action={async (formData) => {
					await setNickname(formData);
					// чтобы session.user.nickname обновился на клиенте:
					await update();
					// чтобы серверные компоненты/страницы тоже обновились:
					router.refresh();
				}}
			>
				<input
					type="text"
					placeholder="Enter your nickname..."
					className="border border-zinc-700 w-full text-[16px] placeholder:text-[16px] bg-black py-1.5 px-4 rounded-xl"
					name="nickname"
				/>
				<p className="text-[14px] text-zinc-400 px-2.5 pb-3">
					Nickname must be include 3-20 <span className="font-medium">lowercase</span> characters, no special
					characters, no spaces, you can use <code className="bg-zinc-900 p-1 pt-0 rounded-sm">_</code> to separate
					your nickname
				</p>
				<button className="button w-full rounded-xl border border-zinc-700 text-white hover:bg-zinc-700 bg-zinc-800">
					Submit
				</button>
			</form>
		</div>
	);
}

