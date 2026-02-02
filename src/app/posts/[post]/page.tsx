import { enforceNickname } from '@/lib/enforce-nickname';

export default async function Post() {
	await enforceNickname();
    return (
        <div>post</div>
    )
}
