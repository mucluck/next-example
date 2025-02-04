import { ArticleDetails } from '@/entities/Article/ui';
import { client } from '@/shared/graphql/client'
// @ts-ignore
import { ALL_ARTICLES_PATHS, ARTICLES_BY_SLUG, CATEGORY } from '@/shared/graphql/queries/articles/queries.graphql'
import { Container } from '@mantine/core';
import type { GetStaticPaths,GetStaticProps } from 'next';
import showdown from 'showdown';


const converter = new showdown.Converter();

const ArticlePage = ({ data }: { data: any }) => {
	return (
		<Container>
			<ArticleDetails data={data} />
		</Container>
	);
}

export default ArticlePage;

if (process.env.NODE_ENV === 'development') {
	ArticlePage.displayName = 'ArticlePage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { data: { articles } } = await client.query({
		query: ALL_ARTICLES_PATHS,
	});

	const articlesPaths = articles.map(({ slug, category: { slug: category } }: { slug: string, category: { slug: string } }) => {
		return {
			params: {
				category,
				slug,
			},
		};
	});

	return {
		paths: articlesPaths,
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.category && !params?.slug) {
		console.error('Error while fetching article');

		return {
			notFound: true,
		};
	}

	const { data: { categories } } = await client.query({
		query: CATEGORY,
		variables: { slug: params?.category }
	});

	const { data: { articles } } = await client.query({
		query: ARTICLES_BY_SLUG,
		variables: { slug: params?.slug }
	});

	const article = articles?.[0];
	const title = article?.title_short ?? article?.title_full;

	const body = article.sections?.reduce((result: string, { body }: { body: string }) => {
		if (!result && body) {
			return converter.makeHtml(body).replace(/(<([^>]+)>)/g, '');
		}

		return result;
	}, '');

	const linked = article.linked?.map?.(({ linkedMediaArticle }: { linkedMediaArticle: Array<News> }) => linkedMediaArticle) ?? [];
	const linkedNews = article.linked_news?.map?.(({ news }: { news: Array<News> }) => news) ?? [];


	return {
		props: {
			data: {
				...article,
				linked,
				linkedNews
			},
			layout: {
				title,
				body,
				seo: article.seo,
				slug: article?.slug,
				image: Object.assign({}, article?.main_image, article?.main_image_mobile, article?.preview_image),
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная'
					},
					{
						title: 'Статьи',
						href: '/articles',
					},
					{
						title: categories?.[0]?.title_full ?? '',
						href: `/articles/${params?.category}`
					},
					{
						title
					}
				]
			},
		}
	}
}
