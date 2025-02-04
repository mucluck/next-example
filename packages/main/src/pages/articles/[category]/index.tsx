import { useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { ArticleCard } from '@/entities/Article/ui';
import { client } from '@/shared/graphql/client';
// @ts-ignore
import { ARTICLE_CATEGORIES_PATHS, ARTICLES_BY_CATEGORY, ARTICLES_BY_CITY_AND_CATEGORY, CATEGORY } from '@/shared/graphql/queries/articles/queries.graphql';
import { Masonry } from '@/shared/ui';
import { useFilters } from '@/widgets/ui';
import { Button, Container, Group, Space } from '@mantine/core';
import { useRequest } from 'ahooks';
import isEmpty from 'lodash/isEmpty';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

type Variables = {
	limit: number;
	offset: number;
	city: Array<string>;
	category: Array<string>;
};

const getData = (variables: Variables) => {
	return client.query({
		query: ARTICLES_BY_CITY_AND_CATEGORY,
		variables,
	});
};

const LIMIT = 15;

// TODO: DRY
const Skeleton = () => {
	return (
		<Masonry<number>
			items={Array(15).fill(6)}
			renderItem={(
				_,
				idx
			) => {
				return (
					<ArticleCard.Skeleton key={idx} />
				);
			}}
		/>
	);
};

const ArticlesCategoryPage = ({ data }: { data: { items: Array<Article> } }) => {
	const { query } = useRouter();

	const { filters, selected } = useFilters();

	const [items, setItems] = useState(data.items);
	const [isFull, setFull] = useState(false);

	const defaultParams: Variables = useMemo(() => {
		const cities = filters.cities?.map(({ value }) => value) ?? [];
		const category = query.category instanceof Array ? query.category : [query.category!];

		return {
			limit: LIMIT,
			offset: 0,
			city: cities,
			category
		};
	}, [filters]);

	const {
		loading: dataLoading,
		params,
		run,
	} = useRequest(getData, {
		defaultParams: [defaultParams],
		onSuccess: ({ data }, params) => {
			const [variables] = params;

			const articles = data.articles;

			if (articles.length < LIMIT) {
				setFull(true);
			}

			if (variables.offset) {
				setItems((prev: Array<any>) => [...prev, ...articles]);

				return;
			}

			setItems(articles);
		},
		onError: (error) => {
			console.error('ArticlesPage', { error });
		},
		cacheKey: 'loadMoreArticles',
	});

	useEffect(() => {
		if (!isEmpty(selected)) {
			const city = selected?.city ? [selected?.city] : defaultParams.city ?? [];

			run({
				...defaultParams,
				city,
			});
		}
	}, [selected]);

	const variables = params?.[0] ?? defaultParams;

	return (
		<>
			<Container
				fluid p={0}
				style={{ position: 'relative' }}>
				<Masonry<Article>
					items={items}
					renderItem={(
						{ title_full, title_short, issued_at, image, category, type, slug, teaser, main_image },
						idx
					) => {
						return (
							<ArticleCard
								category={category}
								image={image}
								issued_at={issued_at}
								key={`${slug}-${type}-${idx}`}
								main_image={main_image}
								slug={slug}
								teaser={teaser}
								title_full={title_full}
								title_short={title_short}
							/>
						);
					}}
				/>

				{
					dataLoading && <Skeleton />
				}

			</Container>

			<Space h={{ base: 24, md: 32 }} />

			<Group justify={'center'}>
				<Button
					disabled={dataLoading || isFull}
					loading={dataLoading}
					onClick={run.bind(null, { ...variables, offset: variables?.offset + LIMIT })}
					w={{ base: '100%', md: 'auto' }}
				>
					{dataLoading ? 'Загрузка' : 'Посмотреть ещё'}
				</Button>
			</Group>
		</>
	);
};

export default ArticlesCategoryPage;

if (process.env.NODE_ENV === 'development') {
	ArticlesCategoryPage.displayName = 'ArticlesCategoryPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { categories },
	} = await client.query({
		query: ARTICLE_CATEGORIES_PATHS,
	});

	const categoriesPaths = categories?.map(({ category: { slug } }: { category: { slug: string } }) => {
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

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown>; data: any }> = async ({ params }) => {
	if (!params?.category) {
		console.error('Error while fetching article category');

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

	const { data } = await client.query(
		{
			query: ARTICLES_BY_CATEGORY,
			variables: {
				category: params?.category,
				limit: 15,
				offset: 0,
			}
		}
	);

	const category = categories[0] ?? {};
	const articles = data?.articles ?? [];
	const cities = data?.cities ?? [];

	return {
		props: {
			data: {
				items: articles,
				category
			},
			layout: {
				title: categories?.[0]?.title_full ?? '',
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						title: 'Статьи',
						href: '/articles',
					},
					{
						title: categories?.[0]?.title_full ?? '',
					},
				],
			},
			filters: {
				cities
			},
		},
	};
};
