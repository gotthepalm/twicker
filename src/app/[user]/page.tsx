export default async function User({ params }: { params: Promise<{ user: string }> }) {
	const { user } = await params;
	return (
		<>
			<div>Hello</div>
		</>
	);
}
