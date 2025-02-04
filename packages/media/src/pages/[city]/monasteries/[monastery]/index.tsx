import { MonasteryDetails } from '@/entities/Monastery/ui';
import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	MONASTERIES_BY_SLUG,
	// @ts-ignore
	MONASTERIES_PATHS,
} from '@/shared/graphql/queries/monasteries/queries.graphql';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import type { GetStaticPaths, GetStaticProps } from 'next';

const MonasteryPage = ({ data }: any) => {
	return (
		<MonasteryDetails data={data} />
	);
};

export default MonasteryPage;

if (process.env.NODE_ENV === 'development') {
	MonasteryPage.displayName = 'MonasteryPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { monasteries },
	} = await client.query({
		query: MONASTERIES_PATHS,
	});

	const monasteriesPaths = monasteries.map(({ slug: monastery, city }: { slug: string; city: { slug: string } }) => {
		return {
			params: {
				monastery,
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
	if (!params?.city || !params?.monastery) {
		console.error('Error while fetching monasteries');

		return {
			notFound: true,
		};
	}

	const {
		data: { monasteries },
	} = await client.query({
		query: MONASTERIES_BY_SLUG,
		variables: { slug: params?.monastery },
	});

	const data = monasteries[0] ?? {};
	const title = data?.title_full ?? '';
	const city = data?.city;

	data.geoJSON?.features?.forEach(({ geometry }: any) => {
		if (geometry.type === 'Polygon') {
			geometry.coordinates[0] = geometry.coordinates[0].reverse();
		}
	});
	const center = data.geoJSON?.features?.find(({ geometry }: any) => geometry.type === 'Point')?.geometry?.coordinates ?? [];

	return {
		props: {
			data: {
				...data,
				center,
				items: [data]
			},
			layout: {
				title,
				cover: omitBy({
					preview: data?.main_image,
					mobile: data?.main_image_mobile
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
						href: `/${city?.slug}/monasteries`,
						title: 'Монастыри',
					},
					{
						title,
					},
				],
			},
		},
	};
};
