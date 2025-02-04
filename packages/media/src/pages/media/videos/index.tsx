import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	VIDEOS_CATEGORIES,
} from '@/shared/graphql/queries/videos/queries.graphql';
import { ChunkGrid, ContentCard } from '@/shared/ui';
import { Container, Stack } from '@mantine/core';
import type { GetStaticProps } from 'next';

const MediaVideos = ({ data }: any) => {
	return (
		<Container>
			<Stack gap={16}>
				<ChunkGrid<Saint>
					columns={4}
					items={data.items}
					renderItem={({ slug, main_image, main_image_preview, title_full, title_short }: any) => {
						const title = title_full ?? title_short ?? '';
						const link = `/media/videos/${slug}`;
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
	)
};

if (process.env.NODE_ENV === 'development') {
	MediaVideos.displayName = 'MediaVideos';
}

export default MediaVideos;

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async () => {
	const {
		data: { videoCategories },
	} = await client.query({
		query: VIDEOS_CATEGORIES,
		variables: {
			limit: 24
		}
	});

	return {
		props: {
			data: {
				items: videoCategories,
			},
			layout: {
				title: 'Видео',
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
						title: 'Видео',
					},
				],
			},
		},
	};
};
