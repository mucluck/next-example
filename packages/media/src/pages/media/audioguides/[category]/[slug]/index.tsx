import type { GetStaticProps, GetStaticPaths } from "next";
import { Container } from "@mantine/core";

import { AudioDetails } from "@/entities/Audio/ui"

import {
	// @ts-ignore
	AUDIO_GUIDES_BY_SLUG,
	// @ts-ignore
	AUDIO_GUIDES_PATHS,
	// @ts-ignore
	AUDIO_GUIDES_CATEGORY_BY_SLUG
} from "@/shared/graphql/queries/audio-guides/queries.graphql";
import { client } from "@/shared/graphql/client";

export type AduioGuidePage = {
	sections: any[];
	audio: any;
	category: {
		slug: string
	}
}

const AudioGuidePage = ({ data }: { data: AduioGuidePage }) => {
	return (
		<Container>
			<AudioDetails data={data} />
		</Container>
	);
};

export default AudioGuidePage;

if (process.env.NODE_ENV === "development") {
	AudioGuidePage.displayName = "AudioGuidePage";
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { audioGuides },
	} = await client.query({
		query: AUDIO_GUIDES_PATHS,
	});

	const audioGuidesPaths = audioGuides.map(
		({ slug, category }: { slug: string; category: { slug: string } }) => {
			return {
				params: {
					slug,
					category: category.slug
				},
			};
		}
	);

	return {
		paths: audioGuidesPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.slug) {
		console.error("Error while fetching audio guide");

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
		query: AUDIO_GUIDES_BY_SLUG,
		variables: { slug: params?.slug },
	});

	const data = audioGuides[0] ?? {};
	const title = data?.title_full ?? "";
	const category = audioGuidesCategory[0].category ?? {};

	return {
		props: {
			data,
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
						href: "/media/audioguides",
					},
					{
						title: category.title,
						href: `/media/audioguides/${category.slug ?? ""}`,
					},
					{
						title
					}
				],
			},
		},
	};
};
