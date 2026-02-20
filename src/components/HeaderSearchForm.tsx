import React from 'react';

export default function HeaderSearchForm({ searchUserAction }: { searchUserAction: (formData: FormData) => Promise<void> }) {
    return (
		<form
			className='border border-zinc-700 rounded-2xl flex items-center px-2'
			action={searchUserAction}
		>
			<input
				placeholder='Search user...'
				type='text'
				name='nickname'
				className='px-4 w-40 placeholder:text-[16px]'
			/>
			<button
				type='submit'
				className='w-8 h-8 mask-[url(/images/search-icon.svg)] mask-no-repeat
								mask-center mask-contain bg-zinc-200 cursor-pointer'
			></button>
		</form>
    )
}