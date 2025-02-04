import { useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { NewsCard } from '@/entities/News/ui';
import { client } from '@/shared/graphql/client';
// @ts-ignore
import { NEWS_BY_CITY_AND_CATEGORY } from '@/shared/graphql/queries/news/queries.graphql';
import { Masonry } from '@/shared/ui';
import { useFilters } from '@/widgets/ui';
import { Button, Container, Group, Space } from '@mantine/core';
import { useRequest } from 'ahooks';
import isEmpty from 'lodash/isEmpty';

type Variables = {
	limit: number;
	offset: number;
	category: Array<string>;
	city: Array<string>;
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

const getData = (variables: Variables) => {
	return client.query({
		query: NEWS_BY_CITY_AND_CATEGORY,
		variables,
	});
};

const limit = 15;

const NewsCategoryDetails = ({ data }: {
	data: {
		items: any;
		category: {
			slug: string;
		};
	};
}) => {
	const { filters, selected } = useFilters();

	const [items, setItems] = useState(data.items);
	const [full, setFull] = useState(false);

	const defaultParams = useMemo(() => {
		const cities = filters.cities?.map(({ value }) => value) ?? [];

		return {
			limit,
			offset: 0,
			category: [data?.category?.slug],
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

			if (news.length < variables.limit) {
				setFull(true);
			}

			if (variables.offset) {
				setItems((prev: Array<any>) => [...prev, ...news]);

				return;
			}

			setItems(news);
		},
		onError: (error) => {
			console.error('NewsCategoryDetails', { error });
		},
		cacheKey: 'loadMoreNewsCategory',
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
			<Masonry<News>
				items={items}
				renderItem={(
					{ title_full, title_short, issued_at, image, category, type, slug, teaser, main_image },
					idx
				) => {
					return (
						//   @ts-ignore
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

			<Container>
				<Group justify={'center'}>
					<Button
						disabled={dataLoading || full}
						loading={dataLoading}
						onClick={run.bind(null, { ...variables, offset: variables.offset + limit })}
						w={{ base: '100%', md: 'auto' }}
					>
						{dataLoading ? 'Загрузка' : 'Посмотреть ещё'}
					</Button>
				</Group>
			</Container>
		</>
	);
};

export default NewsCategoryDetails;
