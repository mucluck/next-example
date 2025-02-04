import type { GetStaticProps, GetStaticPaths } from "next";
import { Container, Stack } from "@mantine/core";

import { AudioCard } from "@/entities/Audio/ui";

import {
	// @ts-ignore
	AUDIO_GUIDES_CATEGORIES_PATHS,
	// @ts-ignore
	AUDIO_GUIDES_CATEGORY_BY_SLUG,
	// @ts-ignore
	AUDIO_GUIDES_BY_CATEGORY
} from "@/shared/graphql/queries/audio-guides/queries.graphql";
import { client } from "@/shared/graphql/client";

const AudioGuidesCategoriesPage = ({ data }: any) => {
	return (
		<Container>
			<Stack gap={16}>
				{
					data.items?.map(({ slug, main_image, category, title_short, title_full, audio, teaser }: any) => {
						const link = `/media/audioguides/${category.slug}/${slug}`;
						const title = title_short ?? title_full ?? "";

						return (
							<AudioCard
								link={link}
								image={main_image}
								title={title}
								audio={audio}
								teaser={teaser}
							/>
						);
					})
				}
			</Stack>
		</Container>
	)
};

export default AudioGuidesCategoriesPage;

if (process.env.NODE_ENV === "development") {
	AudioGuidesCategoriesPage.displayName = "AudioGuidesCategoriesPage";
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { audioGuides },
	} = await client.query({
		query: AUDIO_GUIDES_CATEGORIES_PATHS,
	});

	const categoriesPaths = audioGuides?.map(({ category }: any) => {
		const { slug } = category;

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

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.category) {
		console.error("Error while fetching audioguides category");

		return {
			notFound: true,
		};
	}

	const {
		data: { audioGuidesCategory },
	} = await client.query({
		query: AUDIO_GUIDES_CATEGORY_BY_SLUG,
		variables: { slug: params?.category },
	});

	const {
		data: { audioGuides },
	} = await client.query({
		query: AUDIO_GUIDES_BY_CATEGORY,
		variables: { category: params?.category, limit: 9, offset: 0 },
	});

	const title = audioGuidesCategory?.[0]?.category?.title ?? "";

	return {
		props: {
			data: {
				items: audioGuides
			},
			layout: {
				title,
				breadcrumbs: [
					{
						href: "/",
						title: "Главная",
					},
					{
						href: "/media",
						title: "Медиатека",
					},
					{
						title: "Аудиогиды",
						href: '/media/audioguides'
					},
					{
						title
					},
				],
			},
		},
	};
};
