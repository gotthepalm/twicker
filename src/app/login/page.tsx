import { signIn } from '@/auth';
import Image from 'next/image';

export default function LogIn() {
	return (
		<div className="w-full h-[calc(100dvh-80px)] bg-black flex items-center justify-center px-4">
			<div className="w-full max-w-sm rounded-2xl border border-zinc-700 bg-black p-6 shadow-sm">
				<div className="mb-6 text-center">
					<h1 className="text-xl font-semibold text-white">Welcome back</h1>
					<p className="mt-1 text-sm text-zinc-300">Sign in to continue</p>
				</div>
				<div className="flex flex-col gap-3">
					<form
						action={async () => {
							'use server';
							await signIn('google');
						}}
					>
						<button
							type="submit"
							className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-medium text-zinc-800 transition hover:bg-zinc-50 active:scale-[0.98]"
						>
							<Image src="/images/google.png" width={20} height={20} alt="" />
							Sign in with Google
						</button>
					</form>
					<form
						action={async () => {
							'use server';
							await signIn('github');
						}}
					>
						<button
							type="submit"
							className="flex w-full items-center justify-center gap-3 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 active:scale-[0.98]"
						>
							<span className="h-5 w-5 bg-white mask-[url(/images/github.png)] mask-no-repeat mask-contain mask-center"></span>
							Sign in with GitHub
						</button>
					</form>
				</div>
			</div>
		</div>

	);
}
