import type { GetStaticProps } from "next";
import { Container, Stack } from "@mantine/core";

import { RadioCard } from "@/entities/Radio/ui";

import {
	// @ts-ignore
	RADIO_RECORDS,
} from "@/shared/graphql/queries/radio-records/queries.graphql";
import { client } from "@/shared/graphql/client";

const RadioRecordsPage = ({ data }: any) => {
	return (
		<Container>
			<Stack gap={16}>
				{
					data.items?.map(({ title_full, title_short, main_image_preview, main_image_mobile, main_image, audio, teaser, slug }: any) => {
						const title = title_short ?? title_full ?? "";
						const link = `/media/radio-records/${slug}`;

						return (
							<RadioCard title={title} audio={audio} teaser={teaser} link={link} image={main_image_preview} />
						)
					})
				}
			</Stack>
		</Container>
	)
};

export default RadioRecordsPage;

if (process.env.NODE_ENV === "development") {
	RadioRecordsPage.displayName = "RadioRecordsPage";
}

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async () => {
	const {
		data: { radioRecords },
	} = await client.query({
		query: RADIO_RECORDS,
		variables: {
			limit: 24,
			offset: 0
		}
	});

	return {
		props: {
			data: {
				items: radioRecords
			},
			layout: {
				title: "Радиоэфиры",
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
					},
				],
			},
		},
	};
};
