import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Post from '@/src/components/Post';

export default async function PostPage({ params }: { params: Promise<{ postId: string }> }) {
	const { postId } = await params;
	if (!Number(postId)) {
		return notFound()
	}
	const postDb = await prisma.post.findUnique({
		where: { id: Number(postId) },
	});
	if (!postDb) {
		return notFound();
	}
	const author = await prisma.user.findUnique({
		where: { id: postDb.authorId },
	});
	if (!author) {
		return notFound();
	}
	return (
		<div className='w-full max-w-4xl mx-auto px-5 flex flex-col items-center gap-2'>
			<Post post={postDb} author={author} />
		</div>
	);
}
