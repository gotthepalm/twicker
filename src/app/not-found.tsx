import Link from 'next/link';

export default function NotFound() {
	return (
		<div>
			<div className='font-bold text-4xl'>page 404, not founded</div>
			<Link className='text-blue-600 underline' href={'/'}>
				go home
			</Link>
		</div>
	);
}
