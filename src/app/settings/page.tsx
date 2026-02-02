import { enforceNickname } from '@/lib/enforce-nickname';

export default async function Settings() {
	await enforceNickname();
    return (
        <>
			<div>Settings</div>
		</>
    )
}
