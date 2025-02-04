import { PhotoDetails } from '@/entities/Photo/ui'
import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	PHOTOS_BY_SLUG,
	// @ts-ignore
	PHOTOS_PATHS,
} from '@/shared/graphql/queries/photos/queries.graphql';
import { Container } from '@mantine/core';
import type { GetStaticPaths, GetStaticProps } from 'next';

const PhotoPage = ({ data }: any) => {
	console.log({ data })
	return (
		<Container>
			<PhotoDetails data={data} />
		</Container>
	);
};

export default PhotoPage;

if (process.env.NODE_ENV === 'development') {
	PhotoPage.displayName = 'PhotoPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { photos },
	} = await client.query({
		query: PHOTOS_PATHS,
	});

	const photosPaths = photos.map(
		({ slug }: { slug: string }) => {
			return {
				params: {
					slug
				},
			};
		}
	);

	return {
		paths: photosPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.slug) {
		console.error('Error while fetching photos');

		return {
			notFound: true,
		};
	}

	const {
		data: { photos },
	} = await client.query({
		query: PHOTOS_BY_SLUG,
		variables: { slug: params?.slug },
	});

	const data = photos[0] ?? {};
	const title = data?.title_short ?? data?.title_full ?? '';

	return {
		props: {
			data: {
				...data, photos
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
						title: 'Фоторепортажи',
						href: '/media/photos',
					},
					{
						title
					}
				],
			},
		},
	};
};
