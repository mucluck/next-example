import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	BOOKS,
} from '@/shared/graphql/queries/books/queries.graphql';
import { ChunkGrid, ContentCard } from '@/shared/ui';
import { Container, Stack } from '@mantine/core';
import type { GetStaticProps } from 'next';

const BooksPage = ({ data }: any) => {
	return (
		<Container>
			<Stack gap={16}>
				<ChunkGrid<Saint>
					columns={4}
					items={data.items}
					renderItem={({ slug, main_image, main_image_preview, title_full, title_short }: any) => {
						const title = title_full ?? title_short ?? '';
						const link = `/media/books/${slug}`;
						const image = Object.assign({}, main_image, main_image_preview);

						return <ContentCard
							image={image} link={link}
							title={title} />;
					}}
				/>
			</Stack>
		</Container>
	);
};

export default BooksPage;

if (process.env.NODE_ENV === 'development') {
	BooksPage.displayName = 'BooksPage';
}

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async () => {
	const {
		data: { books },
	} = await client.query({
		query: BOOKS,
		variables: {
			limit: 56,
		},
	});

	return {
		props: {
			data: {
				items: books,
			},
			layout: {
				title: 'Книги',
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						href: '/media',
						title: 'Медиатека',
					},
					{
						title: 'Книги',
					},
				],
			},
		},
	};
};
