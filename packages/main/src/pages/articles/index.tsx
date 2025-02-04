import { useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { ArticleCard } from '@/entities/Article/ui';
import { client } from '@/shared/graphql/client';
// @ts-ignore
import { ALL_ARTICLES, ARTICLES_BY_CITY_AND_CATEGORY } from '@/shared/graphql/queries/articles/queries.graphql';
import { Masonry } from '@/shared/ui';
import { useFilters } from '@/widgets/ui';
import { Button, Group, Space } from '@mantine/core';
import { useRequest } from 'ahooks/';
import isEmpty from 'lodash/isEmpty';
import type { GetStaticProps } from 'next';

type Variables = {
	limit: number;
	offset: number;
	category: Array<string>;
	city: Array<string>;
};

const getData = (variables: Variables) => {
	return client.query({
		query: ARTICLES_BY_CITY_AND_CATEGORY,
		variables,
	});
};

const LIMIT = 15;

type Option = {
	label: string;
	value: string;
};

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

const ArticlesPage = ({ data }: { data: { items: Array<Article> } }) => {
	const { filters, selected } = useFilters();

	const [items, setItems] = useState(data.items);
	const [isFull, setFull] = useState(false);

	const defaultParams: Variables = useMemo(() => {
		const cities = filters.cities?.map(({ value }) => value) ?? [];
		const categories = filters.categories?.map(({ value }) => value) ?? [];

		return {
			limit: LIMIT,
			offset: 0,
			category: categories,
			city: cities,
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
			const category = selected?.category ? [selected?.category] : defaultParams.category ?? [];
			const city = selected?.city ? [selected?.city] : defaultParams.city ?? [];

			run({
				...defaultParams,
				category,
				city,
			});
		}
	}, [selected]);

	const variables = params?.[0] ?? defaultParams;

	return (
		<>
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

export default ArticlesPage;

if (process.env.NODE_ENV === 'development') {
	ArticlesPage.displayName = 'ArticlesPage';
}

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown>; data: any }> = async () => {
	const { data } = await client.query({
		query: ALL_ARTICLES,
		variables: {
			limit: 12,
			offset: 0,
		},
	});

	const articles = data?.articles ?? [];
	const categories = data?.categories?.map?.(({ category }: { category: Option }) => category) ?? [];
	const cities = data?.cities ?? [];

	return {
		props: {
			data: {
				items: articles,
			},
			layout: {
				title: 'Статьи',
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						title: 'Статьи',
					},
				],
			},
			filters: {
				categories,
				cities,
			}
		},
	};
};
