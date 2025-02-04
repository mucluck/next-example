import { CityDetails } from '@/entities/City/ui';
import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	CITIES_BY_SLUG,
	// @ts-ignore
	CITIES_PATHS,
} from '@/shared/graphql/queries/cities/queries.graphql';
import { LeafletWithRouter, Section } from '@/shared/ui';
import { Container, Space } from '@mantine/core';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import type { GetStaticPaths, GetStaticProps } from 'next';

const CityPage = ({ data }: any) => {
	return (
		<>
			<Container>
				<CityDetails data={data} />
			</Container>

			<Space h={{ base: 24, md: 32 }} />

			<Container>
				<Section title={'Расположение'} />
			</Container>

			<LeafletWithRouter items={data.items} />
		</>
	);
};

export default CityPage;

if (process.env.NODE_ENV === 'development') {
	CityPage.displayName = 'CityPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { cities },
	} = await client.query({
		query: CITIES_PATHS,
	});

	const citiesPaths = cities.map(({ slug: city }: { slug: string }) => {
		return {
			params: {
				city,
			},
		};
	});

	return {
		paths: citiesPaths,
		fallback: false,
	};
};



export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.city) {
		console.error('Error while fetching cities');

		return {
			notFound: true,
		};
	}

	const {
		data: { cities },
	} = await client.query({
		query: CITIES_BY_SLUG,
		variables: {
			slug: params?.city
		},
	});

	const city = cities[0] ?? {};
	const title = city?.title_full ?? '';
	const center = city.geoJSON?.features?.find(({ geometry }: any) => geometry.type === 'Point')?.geometry?.coordinates ?? [];

	const items = [
		city,
		...(city?.cathedrals_geo ?? []),
		...(city?.churches_geo ?? []),
		...(city?.objects_geo ?? []),
		...(city?.museums_geo ?? []),
		...(city?.belltowers_geo ?? []),
		...(city?.chapels_geo ?? []),
		...(city?.monasteries_geo ?? []),
	]

	return {
		props: {
			data: {
				...city,
				center,
				items
			},
			layout: {
				title,
				cover: omitBy({
					preview: city?.main_image,
					mobile: city?.main_image_mobile
				}, isNil),
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						title,
					},
				],
			},
		}
	};
};
