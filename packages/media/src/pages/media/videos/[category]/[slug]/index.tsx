import type { GetStaticProps, GetStaticPaths } from "next";

import { Container } from "@mantine/core";

// @ts-ignore
import { ALL_VIDEOS_PATHS, VIDEOS_CATEGORY, VIDEO_BY_SLUG } from "@/shared/graphql/queries/videos/queries.graphql";
import { client } from "@/shared/graphql/client";
import { VideoDetails } from "@/entities/Video/ui";

const VideoPage = ({ data }: { data: any }) => {
	return (
		<Container>
			<VideoDetails data={data} />
		</Container>
	);
};

export default VideoPage;

if (process.env.NODE_ENV === "development") {
	VideoPage.displayName = "VideoPage";
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { videos },
	} = await client.query({
		query: ALL_VIDEOS_PATHS,
	});

	const videosPaths = videos.map(
		({ slug, category }: { slug: string; category: string }) => {
			return {
				params: {
					category,
					slug,
				},
			};
		}
	);

	return {
		paths: videosPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.category && !params?.slug) {
		console.error("Error while fetching video");

		return {
			notFound: true,
		};
	}

	const {
		data: { videoCategories },
	} = await client.query({
		query: VIDEOS_CATEGORY,
		variables: { slug: params?.category },
	});

	const {
		data: { videos },
	} = await client.query({
		query: VIDEO_BY_SLUG,
		variables: { slug: params?.slug },
	});

	const title = videos[0]?.title_full ?? "";
	const category = videoCategories[0] ?? {};
	const video = videos?.[0] ?? {};

	// console.log({ params }) // FIXME: Incorrect videocategory

	return {
		props: {
			data: {
				category,
				...video
			},
			layout: {
				title,
				breadcrumbs: [
					{
						href: "/",
						title: "Главная",
					},
					{
						title: "Медиатека",
						href: "/media",
					},
					{
						title: "Видео",
						href: "/media/videos",
					},
					{
						title: category?.title_full ?? "<заголовок>", // TODO: Need to use for all miss title
						href: `/media/videos/${category?.slug}`,
					},
					{
						title,
					},
				],
			},
		},
	};
};
