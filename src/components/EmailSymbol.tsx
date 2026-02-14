import { JetBrains_Mono } from 'next/font/google';

const jetBrainsMono = JetBrains_Mono({
	weight: ['100', '200', '300', '400', '500', '600', '700' ],
});

export default function EmailSymbol({className}: {className?: string}) {
    return (
		<span className={`${className ? className : ''} ${jetBrainsMono.className}`}>@</span>
    )
}