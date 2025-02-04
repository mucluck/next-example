import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	TOURS,
} from '@/shared/graphql/queries/virtual-tours/queries.graphql';
import { ChunkGrid, ContentCard } from '@/shared/ui';
import { Container, Stack } from '@mantine/core';
import type { GetStaticProps } from 'next';

const Tours = ({ data }: any) => {
	return (
		<Container>
			<Stack gap={16}>
				<ChunkGrid<{ slug: string; main_image: { src: string }; title_full: string }>
					columns={4}
					items={data.items}
					renderItem={({ slug, main_image, title_full }) => {
						const link = `/media/3d-tours/${slug}`;

						return <ContentCard
							image={main_image} link={link}
							title={title_full} />;
					}}
				/>
			</Stack>
		</Container>
	);
};

export default Tours;

if (process.env.NODE_ENV === 'development') {
	Tours.displayName = 'Tours';
}

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async () => {
	const {
		data: { tours },
	} = await client.query({
		query: TOURS,
	});

	return {
		props: {
			data: {
				items: tours,
			},
			layout: {
				title: 'Виртуальные экскурсии',
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
						title: 'Виртуальные экскурсии',
					},
				],
			},
		},
	};
};
