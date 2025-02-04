import { NewsCategoryDetails } from '@/entities/News/ui';
import { client } from '@/shared/graphql/client';
// @ts-ignore
import { CATEGORY, NEWS_BY_CATEGORY, NEWS_CATEGORIES_PATHS } from '@/shared/graphql/queries/news/queries.graphql';
import type { GetStaticPaths, GetStaticProps } from 'next';

const NewsCategory = ({ data }: { data: { items: Array<News>; category: { slug: string }; } }) => {
	return <NewsCategoryDetails data={data} />;
};

export default NewsCategory;

if (process.env.NODE_ENV === 'development') {
	NewsCategory.displayName = 'NewsCategory';
}

const limit = 15;

export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await client.query({
		query: NEWS_CATEGORIES_PATHS,
	});

	const categoriesPaths = data?.news.map(({ category: { slug } }: { category: { slug: string } }) => {
		return {
			params: {
				category: slug,
			},
		};
	});

	return {
		paths: categoriesPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ data: any }> = async ({ params }) => {
	if (!params?.category) {
		console.error('Error while fetching news category');

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

	const { data } = await client.query({
		query: NEWS_BY_CATEGORY,
		variables: {
			category: params?.category,
			limit,
			offset: 0,
		},
	});

	const category = categories[0] ?? {};
	const news = data?.news ?? [];
	const cities = data?.cities ?? [];

	return {
		props: {
			data: {
				items: news,
				category,
			},
			layout: {
				title: category?.title_full ?? '',
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
					},
				],
			},
			filters: {
				cities
			}
		},
	};
};
