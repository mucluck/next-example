import { ChapelDetails } from '@/entities/Chapel/ui';
import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	TEMPLES_BY_SLUG,
	// @ts-ignore
	TEMPLES_PATHS,
} from '@/shared/graphql/queries/temples/queries.graphql';
import type { GetStaticPaths, GetStaticProps } from 'next';

const TemplePage = ({ data }: any) => {
	return (
		<ChapelDetails data={data} />
	);
};

export default TemplePage;

if (process.env.NODE_ENV === 'development') {
	TemplePage.displayName = 'TemplePage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { temples },
	} = await client.query({
		query: TEMPLES_PATHS,
	});

	const monasteriesPaths = temples.map(({ slug: temple, city }: { slug: string; city: { slug: string } }) => {
		return {
			params: {
				temple,
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
	if (!params?.city || !params?.temple) {
		console.error('Error while fetching temples');

		return {
			notFound: true,
		};
	}

	const {
		data: { temples },
	} = await client.query({
		query: TEMPLES_BY_SLUG,
		variables: { slug: params?.temple },
	});

	const temple = temples[0] ?? {};
	const title = temple?.title_full ?? '';
	const city = temple?.city;
	const center = temple.geoJSON?.features?.find(({ geometry }: any) => geometry.type === 'Point')?.geometry?.coordinates ?? [];

	return {
		props: {
			data: {
				...temple,
				center,
				items: [temple]
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
						href: `/${city?.slug}/temples`,
						title: 'Храмы',
					},
					{
						title,
					},
				],
			},
		},
	};
};
