import { CathedralDetails } from '@/entities/Cathedral/ui';
import { client } from '@/shared/graphql/client';
import { CATHEDRALS_BY_SLUG, CATHEDRALS_PATHS } from '@/shared/graphql/queries/cathedrals/queries.graphql';
import isNil from 'lodash/isNil';
import omitBy from 'lodash/omitBy';
import type { GetStaticPaths, GetStaticProps } from 'next';
import showdown from 'showdown'; // TODO: May be not need

const converter = new showdown.Converter();

const CathedralPage = ({ data }: any) => {
	return (
		<CathedralDetails data={data} />
	);
};

export default CathedralPage;

if (process.env.NODE_ENV === 'development') {
	CathedralPage.displayName = 'CathedralPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { cathedrals },
	} = await client.query({
		query: CATHEDRALS_PATHS,
	});

	const cathedralsPaths = cathedrals.map(({ slug: cathedral, city }: { slug: string; city: { slug: string } }) => {
		return {
			params: {
				cathedral,
				city: city.slug,
			},
		};
	});

	return {
		paths: cathedralsPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.city || !params?.cathedral) {
		console.error('Error while fetching cathedrals');

		return {
			notFound: true,
		};
	}

	const {
		data: { cathedrals },
	} = await client.query({
		query: CATHEDRALS_BY_SLUG,
		variables: { slug: params?.cathedral },
	});

	const cathedral = cathedrals[0] ?? {};
	const title = cathedral?.title_full ?? '';
	const city = cathedral?.city;
	const center = cathedral.geoJSON?.features?.find(({ geometry }: any) => geometry.type === 'Point')?.geometry?.coordinates ?? [];
	const articles = cathedral?.articles.map(({ media_article }: any) => media_article) ?? [];
	const news = cathedral?.news?.map(({ news }: any) => news) ?? [];

	const body = cathedral.sections?.reduce((result: string, { body }: { body: string }) => {
		if (!result && body) {
			return converter.makeHtml(body).replace(/(<([^>]+)>)/g, '');
		}

		return '';
	}, '');

	return {
		props: {
			data: {
				...cathedral,
				news,
				articles,
				center,
				items: [cathedral]
			},
			layout: {
				title,
				cover: omitBy({
					preview: cathedral?.main_image,
					mobile: cathedral?.main_image_mobile
				}, isNil),
				body,
				seo: cathedral.seo,
				slug: cathedral?.slug,
				image: Object.assign({}, cathedral?.main_image, cathedral?.preview_image),
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						href: `/${city?.slug}`,
						title: city?.title_full ?? 'Город',
					},
					{
						href: `/${city?.slug}/cathedrals`,
						title: 'Соборы',
					},
					{
						title,
					},
				],
			},
		},
	};
};
