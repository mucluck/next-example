import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	PHOTOS,
} from '@/shared/graphql/queries/photos/queries.graphql';
import { ChunkGrid, ContentCard } from '@/shared/ui';
import { Container, Stack } from '@mantine/core';
import type { GetStaticProps } from 'next';

const PhotosPage = ({ data }: any) => {
	return (
		<Container>
			<Stack gap={16}>
				<ChunkGrid<Saint>
					items={data.items}
					renderItem={({ slug, main_image, main_image_preview, title_full, title_short }: any) => {
						const title = title_full ?? title_short ?? '';
						const link = `/media/photos/${slug}`;
						const image = { // TODO: Use deeepmerge
							...main_image,
							...main_image_preview
						}

						return (
							<ContentCard
								image={image} link={link}
								title={title}
							/>
						);
					}}
				/>
			</Stack>
		</Container>
	);
};

export default PhotosPage;

if (process.env.NODE_ENV === 'development') {
	PhotosPage.displayName = 'PhotosPage';
}

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async () => {
	const {
		data: { photos },
	} = await client.query({
		query: PHOTOS,
	});

	return {
		props: {
			data: {
				items: photos
			},
			layout: {
				title: 'Фоторепортажи',
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
						title: 'Фоторепортажи',
					},
				],
			},
		},
	};
};
