import type { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box } from '@mantine/core';
// @ts-ignore
import remarkClasses from 'remark-classes';

type TMarkdownProps = {
	markdown: string;
	children?: ReactElement;
}

const Markdown = ({ markdown, children }: TMarkdownProps) => {
	return (
		<Box
			c={'brand.4'}
			sx={{
				'> p': {
					textIndent: 24
				}
			}}
		>
			{children}

			<ReactMarkdown remarkPlugins={[remarkClasses()]}>{markdown}</ReactMarkdown>
		</Box>
	)
}

export default Markdown;

if (process.env.NODE_ENV === 'development') {
	Markdown.displayName = 'Markdown';
}
