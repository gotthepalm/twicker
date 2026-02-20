import prisma from '@/lib/prisma';
import Post from '@/src/components/Post';
import { auth } from '@/auth';
import CreatePost from '@/src/components/CreatePost';

export default async function Home() {
	const session = await auth();
	const posts = await prisma.post.findMany({
		orderBy: { id: 'desc' },
		take: 10,
	});
	return (
		<div className='h-full text-white'>
			<div className='w-full max-w-4xl mx-auto px-5 flex flex-col items-center gap-2'>
				{session?.user && session.user.nickname ?  (
					<CreatePost author={session.user} />
				) : null}
				<div className='w-full flex flex-col items-center gap-2'>
					{posts.map(async (value, index) => {
						const author = await prisma.user.findUnique({
							where: {id: value.authorId}
						})
						if (!author) {
							return
						}
						return <Post key={index} author={author} post={value} />;
					})}
				</div>
			</div>
		</div>
	);
}
