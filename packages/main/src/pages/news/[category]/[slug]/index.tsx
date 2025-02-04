import { NewsDetails } from '@/entities/News/ui';
import { client } from '@/shared/graphql/client';
// @ts-ignore
import { ALL_NEWS_PATHS, CATEGORY,NEWS_BY_SLUG } from '@/shared/graphql/queries/news/queries.graphql';
import type { GetStaticPaths,GetStaticProps } from 'next';
import showdown from 'showdown'; // TODO: May be not need

const converter = new showdown.Converter();

const NewsPage = ({ data }: { data: any }) => {
	return (
		<NewsDetails data={data} />
	);
};

export default NewsPage;

if (process.env.NODE_ENV === 'development') {
	NewsPage.displayName = 'NewsPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await client.query({
		query: ALL_NEWS_PATHS,
	});

	const newsPaths = data?.news.map(
		({ slug, category: { slug: category } }: { slug: string; category: { slug: string } }) => {
			return {
				params: {
					category,
					slug,
				},
			};
		}
	);

	return {
		paths: newsPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.category && !params?.slug) {
		console.error('Error while fetching news');

		return {
			notFound: true,
		};
	}

	const {
		data: { categories },
	} = await client.query({
		query: CATEGORY,
		variables: { slug: params?.category },
	});

	const {
		data: { news },
	} = await client.query({
		query: NEWS_BY_SLUG,
		variables: { slug: params?.slug },
	});

	const currentNews = news?.[0];
	const title = currentNews?.title_short || currentNews?.title_full;

	const body = currentNews.sections?.reduce((result: string, { body }: { body: string }) => {
		if (!result && body) {
			return converter.makeHtml(body).replace(/(<([^>]+)>)/g, '');
		}

		return '';
	}, '');
	const linked = currentNews?.linked?.map(({ news }: { news: Array<News> }) => news);

	return {
		props: {
			data: {
				...currentNews,
				linked
			},
			layout: {
				title,
				body,
				seo: currentNews.seo,
				slug: currentNews?.slug,
				image: Object.assign({}, currentNews?.main_image, currentNews?.preview_image),
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						title: 'Новости',
						href: '/news',
					},
					{
						title: categories?.[0]?.title_full ?? '',
						href: `/news/${params?.category}`,
					},
					{
						title,
					},
				],
			},
		},
	};
};
