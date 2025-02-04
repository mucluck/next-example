import { ChapelDetails } from '@/entities/Chapel/ui';
import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	MUSEUMS_BY_SLUG,
	// @ts-ignore
	MUSEUMS_PATHS,
} from '@/shared/graphql/queries/museums/queries.graphql';
import type { GetStaticPaths, GetStaticProps } from 'next';

const MuseumPage = ({ data }: any) => {
	return (
		<ChapelDetails data={data} />
	);
};

export default MuseumPage;

if (process.env.NODE_ENV === 'development') {
	MuseumPage.displayName = 'MuseumPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { museums },
	} = await client.query({
		query: MUSEUMS_PATHS,
	});

	const monasteriesPaths = museums.map(({ slug: museum, city }: { slug: string; city: { slug: string } }) => {
		return {
			params: {
				museum,
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
	if (!params?.city || !params?.museum) {
		console.error('Error while fetching museums');

		return {
			notFound: true,
		};
	}

	const {
		data: { museums },
	} = await client.query({
		query: MUSEUMS_BY_SLUG,
		variables: { slug: params?.museum },
	});

	const museum = museums[0] ?? {};
	const title = museum?.title_full ?? '';
	const city = museum?.city;
	const center = museum.geoJSON?.features?.find(({ geometry }: any) => geometry.type === 'Point')?.geometry?.coordinates ?? [];

	return {
		props: {
			data: {
				...museum,
				center,
				items: [museum]
			},
			layout: {
				title,
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
						href: `/${city?.slug}/museums`,
						title: 'Музеи',
					},
					{
						title,
					},
				],
			},
		},
	};
};
