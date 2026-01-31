import Link from 'next/link';
import Image from 'next/image';
import SessionSection from '@/src/app/_components/SessionSection';

export default function Header() {
    return (
		<header className='fixed w-full bg-black/50 z-20 backdrop-blur-xl'>
			<div className='mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 h-20'>
				<Link href='/' className='flex text-white no-underline items-center gap-2'>
					<Image src='/images/twicker.png' width={40} height={40} alt='Logo' />
					<h1 className='text-3xl'>twicker</h1>
				</Link>
				<nav className=''>
					<ul className='flex items-center gap-10 text-sm font-medium'>
						<li>
							<Link
								href='/'
								className='relative text-[18px] text-white no-underline after:absolute
								after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2
								after:bg-white after:transition-all after:duration-300 after:ease-out
								hover:after:w-full'
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href='/posts/post'
								className='relative text-[18px] text-white no-underline after:absolute
								after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2
								after:bg-white after:transition-all after:duration-300 after:ease-out
								hover:after:w-full'
							>
								Posts
							</Link>
						</li>
						<li>
							<Link
								href='/settings'
								className='relative text-[18px] text-white no-underline after:absolute
								after:left-1/2 after:-bottom-1 after:h-[2px] after:w-0 after:-translate-x-1/2
								after:bg-white after:transition-all after:duration-300 after:ease-out
								hover:after:w-full'
							>
								Settings
							</Link>
						</li>
					</ul>
				</nav>
				<SessionSection/>
			</div>
		</header>
    )
}