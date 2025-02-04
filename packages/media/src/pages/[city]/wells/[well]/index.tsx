import { ChapelDetails } from '@/entities/Chapel/ui';
import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	WELLS_BY_SLUG,
	// @ts-ignore
	WELLS_PATHS,
} from '@/shared/graphql/queries/wells/queries.graphql';
import type { GetStaticPaths, GetStaticProps } from 'next';

const WellPage = ({ data }: any) => {
	return (
		<ChapelDetails data={data} />
	);
};

export default WellPage;

if (process.env.NODE_ENV === 'development') {
	WellPage.displayName = 'WellPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { wells },
	} = await client.query({
		query: WELLS_PATHS,
	});

	const monasteriesPaths = wells.map(({ slug: well, city }: { slug: string; city: { slug: string } }) => {
		return {
			params: {
				well,
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
	if (!params?.city || !params?.well) {
		console.error('Error while fetching wells');

		return {
			notFound: true,
		};
	}

	const {
		data: { wells },
	} = await client.query({
		query: WELLS_BY_SLUG,
		variables: { slug: params?.well },
	});

	const well = wells[0] ?? {};
	const title = well?.title_full ?? '';
	const city = well?.city;
	const center = well.geoJSON?.features?.find(({ geometry }: any) => geometry.type === 'Point')?.geometry?.coordinates ?? [];

	return {
		props: {
			data: {
				...well,
				center,
				items: [well]
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
						href: `/${city?.slug}/wells`,
						title: 'Святые источники',
					},
					{
						title,
					},
				],
			},
		},
	};
};
