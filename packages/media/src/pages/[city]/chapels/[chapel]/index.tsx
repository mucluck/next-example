import { ChapelDetails } from '@/entities/Chapel/ui';
import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	CHAPELS_BY_SLUG,
	// @ts-ignore
	CHAPELS_PATHS,
} from '@/shared/graphql/queries/chapels/queries.graphql';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import type { GetStaticPaths, GetStaticProps } from 'next';

const ChapelPage = ({ data }: any) => {
	return (
		<ChapelDetails data={data} />
	);
};

export default ChapelPage;

if (process.env.NODE_ENV === 'development') {
	ChapelPage.displayName = 'ChapelPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { chapels },
	} = await client.query({
		query: CHAPELS_PATHS,
	});

	const chapelPaths = chapels.map(({ slug: chapel, city }: { slug: string; city: { slug: string } }) => {
		return {
			params: {
				chapel,
				city: city.slug,
			},
		};
	});

	return {
		paths: chapelPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	if (!params?.city || !params?.chapel) {
		console.error('Error while fetching chapels');

		return {
			notFound: true,
		};
	}

	const {
		data: { chapels },
	} = await client.query({
		query: CHAPELS_BY_SLUG,
		variables: { slug: params?.chapel },
	});

	const chapel = chapels[0] ?? {};
	const title = chapel?.title_full ?? '';
	const city = chapel?.city;
	const center = chapel.geoJSON?.features?.find(({ geometry }: any) => geometry.type === 'Point')?.geometry?.coordinates ?? [];

	return {
		props: {
			data: {
				...chapel,
				center,
				items: [chapel]
			},
			layout: {
				title,
				cover: omitBy({
					preview: chapel?.main_image,
					mobile: chapel?.main_image_mobile
				}, isNil),
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						href: `/${city?.slug}`,
						title: city?.title_full,
					},
					{
						href: `/${city?.slug}/chapels`,
						title: 'Часовни',
					},
					{
						title,
					},
				],
			},
		},
	};
};
