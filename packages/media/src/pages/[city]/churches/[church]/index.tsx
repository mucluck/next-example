import { ChapelDetails } from '@/entities/Chapel/ui';
import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	CHURCHES_BY_SLUG,
	// @ts-ignore
	CHURCHES_PATHS,
} from '@/shared/graphql/queries/churches/queries.graphql';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import type { GetStaticPaths, GetStaticProps } from 'next';

const ChurchPage = ({ data }: any) => {
	return (
		<ChapelDetails data={data} />
	);
};

export default ChurchPage;

if (process.env.NODE_ENV === 'development') {
	ChurchPage.displayName = 'MuseumPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { churches },
	} = await client.query({
		query: CHURCHES_PATHS,
	});

	const churchesPaths = churches.map(({ slug: church, city }: { slug: string; city: { slug: string } }) => {
		return {
			params: {
				church,
				city: city.slug,
			},
		};
	});

	return {
		paths: churchesPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.city || !params?.church) {
		console.error('Error while fetching church');

		return {
			notFound: true,
		};
	}

	const {
		data: { churches },
	} = await client.query({
		query: CHURCHES_BY_SLUG,
		variables: { slug: params?.church },
	});

	const church = churches[0] ?? {};
	const title = church?.title_full ?? '';
	const city = church?.city;
	const center = church.geoJSON?.features?.find(({ geometry }: any) => geometry.type === 'Point')?.geometry?.coordinates ?? [];

	return {
		props: {
			data: {
				...church,
				center,
				items: [church]
			},
			layout: {
				title,
				cover: omitBy({
					preview: church?.main_image,
					mobile: church?.main_image_mobile
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
						href: `/${city?.slug}/churches`,
						title: 'Церкви',
					},
					{
						title,
					},
				],
			},
		},
	};
};
