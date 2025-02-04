import type { GetStaticProps, GetStaticPaths } from "next";
import { Container } from "@mantine/core";

import { RadioDetails } from "@/entities/Radio/ui"

import {
	// @ts-ignore
	RADIO_RECORDS_PATHS,
	// @ts-ignore
	RADIO_RECORDS_BY_SLUG,
} from "@/shared/graphql/queries/radio-records/queries.graphql";
import { client } from "@/shared/graphql/client";

const RadioPage = ({ data }: any) => {
	return (
		<Container>
			<RadioDetails data={data} />
		</Container>
	);
};

export default RadioPage;

if (process.env.NODE_ENV === "development") {
	RadioPage.displayName = "RadioPage";
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { radioRecords },
	} = await client.query({
		query: RADIO_RECORDS_PATHS,
	});

	const radioRecordsPaths = radioRecords.map(
		({ slug }: { slug: string }) => {
			return {
				params: {
					slug
				},
			};
		}
	);

	return {
		paths: radioRecordsPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.slug) {
		console.error("Error while fetching radio record");

		return {
			notFound: true,
		};
	}

	const {
		data: { radioRecords },
	} = await client.query({
		query: RADIO_RECORDS_BY_SLUG,
		variables: { slug: params?.slug },
	});

	const data = radioRecords[0] ?? {};
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
						title: "Радиоэфиры",
						href: "/media/radio-records",
					},
					{
						title
					}
				],
			},
		},
	};
};
