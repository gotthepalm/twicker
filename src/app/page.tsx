import { enforceNickname } from '@/lib/enforce-nickname';

export default async function Home() {
	await enforceNickname();
	return (
		<div className='h-full text-white'>
			<div
				className='flex flex-col gap-2 justify-center items-center
			'
			>
				<div className=''>Main Page</div>
			</div>
		</div>
	);
}
