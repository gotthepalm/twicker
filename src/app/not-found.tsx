import Link from 'next/link';

export default function NotFound() {
	return (
		<div className='w-full max-w-[700px] mx-auto h-[calc(100dvh-160px)] flex items-center px-10'>
			<div>
				<div className='text-4xl'>
					Error <span className='font-bold'>404</span>, not found
				</div>
				<div className='pb-5'>this page doesn&apos;t exist</div>
				<Link
					className='custom-link text-blue-400 after:bg-blue-400 relative'
					href={'/'}
				>
					Go home
				</Link>
			</div>
		</div>
	);
}
