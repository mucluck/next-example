import type { GetStaticProps, GetStaticPaths } from "next";
import { Container } from "@mantine/core";

import { TourDetails } from "@/entities/Tour/ui"

import {
	// @ts-ignore
	TOURS_PATHS,
	// @ts-ignore
	TOURS_BY_SLUG,
} from "@/shared/graphql/queries/virtual-tours/queries.graphql";
import { client } from "@/shared/graphql/client";

const TourPage = ({ data }: any) => {
	return (
		<Container>
			<TourDetails data={data} />
		</Container>
	);
};

export default TourPage;

if (process.env.NODE_ENV === "development") {
	TourPage.displayName = "TourPage";
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { tours },
	} = await client.query({
		query: TOURS_PATHS,
	});

	const toursPaths = tours.map(
		({ slug }: { slug: string }) => {
			return {
				params: {
					slug
				},
			};
		}
	);

	return {
		paths: toursPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.slug) {
		console.error("Error while fetching tours");

		return {
			notFound: true,
		};
	}

	const {
		data: { tours },
	} = await client.query({
		query: TOURS_BY_SLUG,
		variables: { slug: params?.slug },
	});

	const data = tours[0] ?? {};
	const title = data?.title_full ?? "";

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
						title: "Виртуальные экскурсии",
						href: "/media/3d-tours",
					},
					{
						title
					}
				],
			},
		},
	};
};
