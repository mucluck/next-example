import { client } from '@/shared/graphql/client';
// @ts-ignore
import { AUDIO_GUIDES } from '@/shared/graphql/queries/audio-guides/queries.graphql';
// @ts-ignore
import { BOOKS } from '@/shared/graphql/queries/books/queries.graphql';
// @ts-ignore
import { PHOTOS } from '@/shared/graphql/queries/photos/queries.graphql';
// @ts-ignore
import { RADIO_RECORDS } from '@/shared/graphql/queries/radio-records/queries.graphql';
// @ts-ignore
import { VIDEOS_CATEGORIES } from '@/shared/graphql/queries/videos/queries.graphql';
// @ts-ignore
import { TOURS } from '@/shared/graphql/queries/virtual-tours/queries.graphql';
import { Section } from '@/shared/ui';
import { ContentCard } from '@/shared/ui';
import { Slider } from '@/widgets/ui';
import { Container, Flex, Text } from '@mantine/core';
import { compact } from 'lodash';
import type { GetStaticProps } from 'next';
import Link from 'next/link';

const types = {
	radio_record: 'radio-records',
	audio_guides: 'audioguides',
	newsPhotos: 'photos',
	mediaArticlesPhotos: 'photos',
	media_video: 'videos',
	virtual_tour: '3d-tours',
	book: 'books',
} as const;

type TSection = {
	title: string;
	items: Array<any>;
	extra: {
		link: string;
		title: string;
	}
}
type TImage = {
	src: string;
	alt: string
}
type TItem = {
	type: keyof typeof types;
	slug: string;
	category: {
		slug?: string
	},
	title_full: string;
	image: TImage;
	main_image: TImage;
	main_image_preview: TImage;
}

const MediaPage = ({ data }: { data: { sections: Array<TSection> } }) => {
	const sections = data?.sections ?? [];

	return (
		<Container>
			<Flex direction={'column'} gap={{ base: 16, md: 32 }}>
				{
					sections.map(({ title, items, extra }: TSection, idx: number) => {
						if (!items.length) {
							return null;
						}

						return (
							<Section
								extra={
									<Link href={extra?.link} title={extra?.title}>
										<Text c={'gold.4'} span>
											{extra?.title}
										</Text>
									</Link>
								}
								key={`media-section-${idx}`}
								title={title}
							>
								<Slider<TItem>
									breakpoints={{
										'(min-width: 768px)': {
											slides: {
												perView: 4,
												spacing: 16
											},
										},
									}}
									dots
									items={items}
									origin={'auto'}
									perView={1}
									renderItem={({
										image,
										main_image,
										main_image_preview,
										title_full,
										type,
										category = {},
										slug,
									}) => {
										const img = Object.assign({}, image, main_image, main_image_preview);
										const link = compact(['media', types[type], category?.slug, slug]).join('/');

										return (
											<ContentCard
												image={img}
												link={link}
												title={title_full}
												type={type}
											/>
										)
									}}
									spacing={8}
								/>
							</Section>
						);
					})
				}
			</Flex>
		</Container>
	);
};

export default MediaPage;

if (process.env.NODE_ENV === 'development') {
	MediaPage.displayName = 'MediaPage';
}

const limit = 9;

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async () => {
	const {
		data: { radioRecords },
	} = await client.query({
		query: RADIO_RECORDS,
		variables: {
			limit,
			offset: 0,
		},
	});

	const {
		data: { audioGuides },
	} = await client.query({
		query: AUDIO_GUIDES,
		variables: {
			limit,
			offset: 0,
		},
	});

	const {
		data: { tours },
	} = await client.query({
		query: TOURS,
		variables: {
			limit,
		}
	});

	const {
		data: { photos },
	} = await client.query({
		query: PHOTOS,
		variables: {
			limit,
		}
	});

	const {
		data: { books },
	} = await client.query({
		query: BOOKS,
		variables: {
			limit,
		},
	});

	const {
		data: { videoCategories },
	} = await client.query({
		query: VIDEOS_CATEGORIES,
		variables: {
			limit,
		},
	});

	const sections = [
		{
			title: 'Радиоэфиры',
			items: radioRecords ?? [],
			extra: {
				title: 'все радиоэфиры',
				link: '/media/radio-records',
			},
		},
		{
			title: 'Аудиогиды',
			items: audioGuides ?? [],
			extra: {
				title: 'все аудиогиды',
				link: '/media/audioguides',
			},
		},
		{
			title: 'Виртуальные экскурсии',
			items: tours ?? [],
			extra: {
				title: 'все виртуальные экскурсии',
				link: '/media/3d-tours',
			},
		},
		{
			title: 'Фоторепортажи',
			items: photos ?? [],
			extra: {
				title: 'все фоторепортажи',
				link: '/media/photos',
			},
		},
		{
			title: 'Видео',
			items: videoCategories.map((category: any) => ({ ...category, type: 'media_video' })) ?? [],
			extra: {
				title: 'все видео',
				link: '/media/videos',
			},
		},
		{
			title: 'Книги',
			items: books ?? [],
			extra: {
				title: 'все книги',
				link: '/media/books',
			},
		},
	];

	return {
		props: {
			data: {
				sections,
			},
			layout: {
				title: 'Медиатека',
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						title: 'Медиатека',
					},
				],
			},
		},
	};
};
