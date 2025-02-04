// @ts-nocheck
import { Fragment, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { ArticleCard } from '@/entities/Article/ui';
import { BannerCard } from '@/entities/Banner/ui';
import { DayCard } from '@/entities/Days/ui';
import { NewsCard } from '@/entities/News/ui';
import { VideoCard } from '@/entities/Video/ui';
import { client } from '@/shared/graphql/client';
// @ts-ignore
import { MAIN_PAGE, MAIN_PAGE_PARTIAL } from '@/shared/graphql/queries/main/queries.graphql';
import { Masonry } from '@/shared/ui';
import { Button, Container, Divider, Flex, Group, Paper, SimpleGrid, Space, Stack, Text } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconChevronRight } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import type { GetStaticProps } from 'next';
import Link from 'next/link';

const transformData = (data: Array<any>, transform: Array<any>) => {
	return transform.reduce((result, item) => {
		const { components, position } = item;

		if (components.type === 'News') {
			const { news } = item;

			result.splice(position, 0, {
				type: 'news',
				...news,
			});
		}

		if (components.type === 'Calendar') {
			result.splice(position, 0, {
				type: 'calendar',
				// data: mainPage.days?.[0] ?? {},
			});
		}

		if (components.type === 'List') {
			result.splice(position, 0, {
				type: 'list',
				id: 'split-list'
			});
		}

		if (components.type === 'MediaArticle') {
			const { media_article } = item;

			result.splice(position, 0, {
				type: 'article',
				...media_article,
			});
		}

		if (components.type === 'Video') {
			const { media_video } = item;

			result.splice(position, 0, {
				type: 'video',
				...media_video,
			});
		}

		// TODO: Resolve tour block
		// if (components.type === "Tour") {
		// 	const { tours } = item;

		// 	console.log({ tours });

		// 	result.splice(position, 0, {
		// 		type: "Tour",
		// 		data: tours,
		// 	});
		// }

		return result;
	}, data);
};

const getData = (variables: { limit: number; offset: number }) => {
	return client.query({
		query: MAIN_PAGE_PARTIAL,
		variables,
	});
};

const HoveredLink = ({ href, title }) => {
	const { hovered, ref } = useHover();

	return (
		<Link
			href={href} ref={ref}
			style={{ lineHeight: '16px' }}>
			<Text
				fw={hovered ? 'bold' : ''}
				fz={14}
				span
				ta={'justify'}
			>
				{title}
			</Text>
		</Link>
	)
}

const HomePage = ({
	data,
}: {
	data: {
		main_content: Array<Record<string, unknown>>;
		banners: Array<Banner>;
		fixed_content: Array<unknown>;
	};
}) => {
	const { main_content = [], banners = [], fixed_content = [] } = data;
	const transformed = transformData([...main_content], [...fixed_content]);

	const [skip, setSkip] = useState({ limit: 10, offset: 10 });
	const [mainData, setMainData] = useState(transformed);


	const {
		loading: dataLoading,
		run,
		cancel: getDataCancel,
	} = useRequest(getData, {
		manual: true,
		onSuccess: ({ data }) => {
			setSkip((prev) => ({ ...prev, offset: prev.offset + data?.main_content?.length }));
			// @ts-ignore
			setMainData((prev) => [...prev, ...data?.main_content]);
		},
	});

	const handleGetData = () => {
		run(skip);
	};

	useEffect(() => {
		return getDataCancel;
	}, []);

	return (
		<>
			{
				banners.map(({ link, title, params }) => {
					return <BannerCard
						href={link} key={link}
						params={params} title={title} />;
				})
			}

			<Space h={{ base: 16 }} />

			<Masonry<Article | News>
				items={mainData as Array<Article | News>}
				renderItem={(
					// @ts-ignore
					{
						title_full,
						title_short,
						issued_at,
						image,
						category,
						type,
						slug,
						teaser,
						main_image,
						sections,
						...more
					}, idx
				) => {
					if (type === 'article') {
						return (
							<ArticleCard
								category={category}
								image={image}
								issued_at={issued_at}
								key={`${type}-${slug}-${idx}`}
								main_image={main_image}
								slug={slug}
								teaser={teaser}
								title_full={title_full}
								title_short={title_short}
							/>
						);
					}

					if (type === 'news') {
						const media = sections?.map(({ media }: { media: any }) => media);
						const mediaType = media?.reduce((result: string, { type }: { type: string }) => {
							if (type) {
								result = type;
							}

							return result;
						}, '');

						return (
							<NewsCard
								category={category}
								image={image}
								issued_at={issued_at}
								key={`${type}-${slug}-${idx}`}
								main_image={main_image}
								mediaType={mediaType}
								slug={slug}
								teaser={teaser}
								title_full={title_full}
								title_short={title_short}
							/>
						);
					}

					if (type === 'calendar') {
						return <DayCard key={'calendar'} />;
					}

					if (type === 'video') {
						return (
							<VideoCard
								category={{
									title: 'Туризм на Nazghoolовой земле',
									slug: 'turizm-na-Nazghoolovoj-zemle', // TODO: Need to resolve bug
								}}
								image={image}
								key={`${type}-${slug}-${idx}`}
								slug={slug}
								src={more.src}
								teaser={teaser}
								title_full={title_full}
								title_short={title_short}
							/>
						);
					}

					if (type === 'list') {
						return (
							<Paper
								key={'list'} p={16}
								shadow="xl" sx={() => ({ backgroundColor: 'white' })}>
								<SimpleGrid cols={2}>
									<Stack>
										<Link href={'/news'}>
											<Flex
												align={'center'} gap={4}
												justify={'space-between'}>
												<Text
													align="center"
													c={'brand.4'}
													fw={'600'}
													order={5}
													span>
													Все новости
												</Text>

												<Text
													c={'brand.4'} span
													sx={{ display: 'flex' }}>
													<IconChevronRight size={24} />
												</Text>
											</Flex>
										</Link>

										<Stack gap={8}>
											{data?.news?.map(({ slug, title_short, category }, idx) => {
												return (
													<Fragment key={`split-list-${slug}`}>
														{!!idx && <Divider />}

														<HoveredLink
															href={`/news/${category.slug}/${slug}`}
															title={title_short}
														/>
													</Fragment>
												)
											})}
										</Stack>
									</Stack>

									<Stack>
										<Link href={'/articles'}>
											<Flex
												align={'center'} gap={4}
												justify={'space-between'}>
												<Text
													align="center"
													c={'brand.4'}
													fw={'600'} order={5}
													span>
													Все статьи
												</Text>

												<Text
													c={'brand.4'} span
													sx={{ display: 'flex' }}>
													<IconChevronRight size={24} />
												</Text>
											</Flex>
										</Link>
										<Stack gap={8}>
											{data?.articles?.map(({ slug, title_short, category }, idx) => {
												return (
													<Fragment key={`split-list-${slug}`}>
														{!!idx && <Divider />}

														<HoveredLink
															href={`/articles/${category.slug}/${slug}`}
															title={title_short}
														/>
													</Fragment>
												)
											})}
										</Stack>
									</Stack>
								</SimpleGrid>
							</Paper>
						);
					}

					return null;
				}}
			/>

			<Space h={{ base: 24, md: 32 }} />

			<Container>
				<Group justify={'center'}>
					<Button
						disabled={dataLoading}
						loading={dataLoading}
						onClick={handleGetData}
						w={{ base: '100%', md: 'auto' }}
					>
						{dataLoading ? 'Загрузка' : 'Посмотреть ещё'}
					</Button>
				</Group>
			</Container >
		</>
	);
};

export const getStaticProps: GetStaticProps<{
	layout: Record<string, unknown>;
}> = async () => {
	const { data } = await client.query({
		query: MAIN_PAGE,
	});

	const { layout = [{}], ...mainPage } = data;

	const seo = layout[0]?.seo ?? {};
	const site_name = seo.og.site_name ?? '';
	const title = seo.html?.title ?? '';

	return {
		props: {
			layout: {
				seo,
				title: `${title} | ${site_name}`,
				isMain: true,
			},
			data: mainPage,
		},
	};
};

export default HomePage;
