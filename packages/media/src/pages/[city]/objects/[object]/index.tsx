import { ChapelDetails } from '@/entities/Chapel/ui';
import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	OBJECTS_BY_SLUG,
	// @ts-ignore
	OBJECTS_PATHS,
} from '@/shared/graphql/queries/objects/queries.graphql';
import type { GetStaticPaths, GetStaticProps } from 'next';

const ObjectPage = ({ data }: any) => {
	return (
		<ChapelDetails data={data} />
	);
};

export default ObjectPage;

if (process.env.NODE_ENV === 'development') {
	ObjectPage.displayName = 'ObjectPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { objects },
	} = await client.query({
		query: OBJECTS_PATHS,
	});

	const monasteriesPaths = objects.map(({ slug: object, city }: { slug: string; city: { slug: string } }) => {
		return {
			params: {
				object,
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
	if (!params?.city || !params?.object) {
		console.error('Error while fetching objects');

		return {
			notFound: true,
		};
	}

	const {
		data: { objects },
	} = await client.query({
		query: OBJECTS_BY_SLUG,
		variables: { slug: params?.object },
	});

	const object = objects[0] ?? {};
	const title = object?.title_full ?? '';
	const city = object?.city;
	const center = object.geoJSON?.features?.find(({ geometry }: any) => geometry.type === 'Point')?.geometry?.coordinates ?? [];

	return {
		props: {
			data: {
				...object,
				center,
				items: [object]
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
						href: `/${city?.slug}/objects`,
						title: 'Достопримечательности',
					},
					{
						title,
					},
				],
			},
		},
	};
};
