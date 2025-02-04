import { ChapelDetails } from '@/entities/Chapel/ui';
import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	BELLTOWERS_BY_SLUG,
	// @ts-ignore
	BELLTOWERS_PATHS,
} from '@/shared/graphql/queries/belltowers/queries.graphql';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import type { GetStaticPaths, GetStaticProps } from 'next';

const BelltowerPage = ({ data }: any) => {
	return (
		<ChapelDetails data={data} />
	);
};

export default BelltowerPage;

if (process.env.NODE_ENV === 'development') {
	BelltowerPage.displayName = 'BelltowerPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { belltowers },
	} = await client.query({
		query: BELLTOWERS_PATHS,
	});

	const monasteriesPaths = belltowers.map(({ slug: belltower, city }: { slug: string; city: { slug: string } }) => {
		return {
			params: {
				belltower,
				city: city.slug,
			},
		};
	});

	return {
		paths: monasteriesPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.city || !params?.belltower) {
		console.error('Error while fetching belltowers');

		return {
			notFound: true,
		};
	}

	const {
		data: { belltowers },
	} = await client.query({
		query: BELLTOWERS_BY_SLUG,
		variables: { slug: params?.belltower },
	});

	const belltower = belltowers[0] ?? {};
	const title = belltower?.title_full ?? '';
	const city = belltower?.city;
	const center = belltower.geoJSON?.features?.find(({ geometry }: any) => geometry.type === 'Point')?.geometry?.coordinates ?? [];

	return {
		props: {
			data: {
				...belltower,
				center,
				items: [belltower]
			},
			layout: {
				title,
				cover: omitBy({
					preview: belltower?.main_image,
					mobile: belltower?.main_image_mobile
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
						href: `/${city?.slug}/belltowers`,
						title: 'Колокольни',
					},
					{
						title,
					},
				],
			},
		},
	};
};
