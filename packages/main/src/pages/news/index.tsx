import { useEffect, useMemo, useState } from 'react';
import { NewsCard } from '@/entities/News/ui';
import { client } from '@/shared/graphql/client';
// @ts-ignore
import { ALL_NEWS, NEWS_BY_CITY_AND_CATEGORY } from '@/shared/graphql/queries/news/queries.graphql';
import { Masonry } from '@/shared/ui';
import { useFilters } from '@/widgets/ui';
import { Button, Group, Space } from '@mantine/core';
import { useRequest } from 'ahooks';
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
		query: NEWS_BY_CITY_AND_CATEGORY,
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
					<NewsCard.Skeleton key={idx} />
				);
			}}
		/>
	);
};

const NewsPage = ({ data }: { data: { items: Array<News> } }) => {
	const { filters, selected } = useFilters();

	const [items, setItems] = useState(data.items);
	const [full, setFull] = useState(false);

	const defaultParams = useMemo(() => {
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
			const news = data.news;

			if (news.length < LIMIT) {
				setFull(true);
			}

			if (variables.offset) {
				setItems((prev: Array<any>) => [...prev, ...news]);

				return;
			}

			setItems(news);
		},
		onError: (error) => {
			console.error('NewsPage', { error });
		},
		cacheKey: 'loadMoreNews',
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
			<Masonry<News>
				items={items}
				renderItem={(
					{ title_full, title_short, issued_at, image, category, type, slug, teaser, main_image },
					idx
				) => {
					return (
						// @ts-ignore
						<NewsCard
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
					disabled={dataLoading || full}
					loading={dataLoading}
					onClick={run.bind(null, { ...variables, offset: variables.offset + LIMIT })}
					w={{ base: '100%', md: 'auto' }}
				>
					{dataLoading ? 'Загрузка' : 'Посмотреть ещё'}
				</Button>
			</Group>
		</>
	);
};

export default NewsPage;

if (process.env.NODE_ENV === 'development') {
	NewsPage.displayName = 'NewsPage';
}

export const getStaticProps: GetStaticProps<{ data: any }> = async () => {
	const { data } = await client.query({
		query: ALL_NEWS,
		variables: {
			limit: 12,
			offset: 0,
		},
	});

	const title = 'Новости';  // TODO: i18n
	const news = data?.news ?? [];
	const categories = data?.categories?.map?.(({ category }: { category: Option }) => category) ?? [];
	const cities = data?.cities ?? [];

	return {
		props: {
			data: {
				items: news,
			},
			layout: {
				title,
				// seo: data.seo,
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						title
					},
				],
			},
			filters: {
				categories,
				cities
			},
		},
	};
};
