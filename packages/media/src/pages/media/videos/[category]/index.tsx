import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	VIDEOS_BY_CATEGORY,
	// @ts-ignore
	VIDEOS_CATEGORIES_PATHS,
	// @ts-ignore
	VIDEOS_CATEGORY,
} from '@/shared/graphql/queries/videos/queries.graphql';
import { ChunkGrid, ContentCard } from '@/shared/ui';
import { Container, Stack } from '@mantine/core';
import type { GetStaticPaths, GetStaticProps } from 'next';

const VideosCategory = ({ data }: any) => {
	return (
		<Container>
			<Stack gap={16}>
				<ChunkGrid<Saint>
					columns={4}
					items={data.items}
					renderItem={({ slug, main_image, main_image_preview, title_full, title_short, category }: any) => {
						const title = title_full ?? title_short ?? '';
						const link = `/media/videos/${category}/${slug}`;
						const image = {
							// TODO: Use deeepmerge
							...main_image,
							...main_image_preview,
						};

						return <ContentCard
							image={image} link={link}
							title={title} />;
					}}
				/>
			</Stack>
		</Container>
	);
};

export default VideosCategory;

if (process.env.NODE_ENV === 'development') {
	VideosCategory.displayName = 'VideosCategory';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { categories },
	} = await client.query({
		query: VIDEOS_CATEGORIES_PATHS,
	});

	const categoriesPaths = categories?.map(({ slug }: { slug: string }) => {
		return {
			params: {
				category: slug,
			},
		};
	});

	return {
		paths: categoriesPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.category) {
		console.error('Error while fetching videos category');

		return {
			notFound: true,
		};
	}

	const {
		data: { videoCategories },
	} = await client.query({
		query: VIDEOS_CATEGORY,
		variables: { slug: params?.category },
	});

	const {
		data: { videos },
	} = await client.query({
		query: VIDEOS_BY_CATEGORY,
		variables: { category: params?.category, limit: 12, offset: 0 },
	});

	const title = videoCategories?.[0]?.title_full ?? '';

	return {
		props: {
			data: {
				items: videos,
			},
			layout: {
				title,
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
						href: '/media/videos',
						title: 'Видео',
					},
					{
						title,
					},
				],
			},
		},
	};
};
