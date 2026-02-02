import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

const NICKNAME_REGEX = /^[a-z0-9_]{3,20}$/;

async function setNickname(formData: FormData) {
	'use server';
	const session = await auth();
	if (!session?.user?.email) redirect('/login');

	const email = session.user.email;
	const rawNickname = String(formData.get('nickname') ?? '');
	const nickname = rawNickname.trim().toLowerCase();

	if (!NICKNAME_REGEX.test(nickname)) {
		redirect('/registration/username?error=invalid');
	}

	const currentUser = await prisma.user.findUnique({
		where: { email },
		select: { nickname: true },
	});

	if (!currentUser) redirect('/login');
	if (currentUser.nickname) redirect('/');

	const existing = await prisma.user.findUnique({
		where: { nickname },
		select: { email: true },
	});

	if (existing && existing.email !== email) {
		redirect('/registration/username?error=taken');
	}

	await prisma.user.update({
		where: { email },
		data: { nickname },
	});

	redirect('/');
}

function getErrorMessage(code?: string) {
	if (code === 'invalid') {
		return 'Nickname must be 3-20 characters and use only lowercase letters, numbers, or underscores.';
	}
	if (code === 'taken') {
		return 'That nickname is already taken.';
	}
	return null;
}

export default async function UsernameRegistration({
	searchParams,
}: {
	searchParams: { error?: string };
}) {
	const session = await auth();
	if (!session?.user?.email) redirect('/login');

	const user = await prisma.user.findUnique({
		where: { email: session.user.email },
		select: { nickname: true },
	});

	if (!user) redirect('/login');
	if (user.nickname) redirect('/');

	const errorMessage = getErrorMessage(searchParams?.error);

	return (
		<div className='w-full h-[calc(100dvh-80px)] bg-black flex items-center justify-center px-4'>
			<div className='w-full max-w-md rounded-2xl border border-zinc-700 bg-black p-6 shadow-sm'>
				<div className='mb-6 text-center'>
					<h1 className='text-xl font-semibold text-white'>Pick your nickname</h1>
					<p className='mt-1 text-sm text-zinc-300'>
						This unique handle will be used to find your profile.
					</p>
				</div>
				<form action={setNickname} className='flex flex-col gap-4'>
					<label className='flex flex-col gap-2 text-sm text-zinc-200'>
						<span>Nickname</span>
						<input
							name='nickname'
							autoComplete='off'
							autoCapitalize='none'
							autoCorrect='off'
							spellCheck={false}
							placeholder='e.g. gotthepalm'
							minLength={3}
							maxLength={20}
							pattern='[a-z0-9_]{3,20}'
							className='w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none focus:border-white'
							required
						/>
					</label>
					{errorMessage ? (
						<p className='text-sm text-red-400'>{errorMessage}</p>
					) : (
						<p className='text-xs text-zinc-400'>
							3-20 characters. Lowercase letters, numbers, and underscores only.
						</p>
					)}
					<button
						type='submit'
						className='rounded-xl bg-white px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-100 active:scale-[0.98]'
					>
						Save nickname
					</button>
				</form>
			</div>
		</div>
	);
}
