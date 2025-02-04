import { Paper, Stack, Group, Text, Container } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import { ContentBlock, Section } from "@/shared/ui";

import type { ContentBlockProps } from "@/shared/ui/ContentBlock/ContentBlock";

const IkonDetails = ({ data }: { data: Ikon & { sections: Array<ContentBlockProps> } }) => {
	const { main_image, title, sections, saints } = data;

	return (
		<Container>
			<Stack gap={24}>
				<Paper sx={(theme) => ({ overflow: "hidden" })}>
					<Image
						unoptimized
						src={main_image?.src}
						alt={title ?? ""}
						width={500}
						height={500}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
						priority
					/>
				</Paper>

				{!!saints.length && (
					<Section title={"Святые"}>
						<Group gap={0} sx={() => ({ zIndex: 9 })}>
							{
								// @ts-ignore
								saints.map(({ saint: { rank, slug, title } }) => {
									return (
										<Link key={slug} href={`/saints/${slug}`}>
											<Text span sx={(theme) => ({ color: theme.colors.brand?.[4] })}>
												{rank?.short_name} {title}
											</Text>
										</Link>
									);
								})
							}
						</Group>
					</Section>
				)}

				<ContentBlock.List
					sections={sections}
				/>
			</Stack>
		</Container>
	);
};

export default IkonDetails;

if (process.env.NODE_ENV === "development") {
	IkonDetails.displayName = "IkonDetails";
}
