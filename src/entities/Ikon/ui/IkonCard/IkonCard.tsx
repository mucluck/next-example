import { Box, Stack, Text, Paper } from "@mantine/core";
import Image from "next/image";

import Link from "next/link";

const IkonCard = ({ main_image, main_image_preview, title, slug }: Partial<Ikon>) => {
	const src = main_image_preview?.src ?? main_image?.src ?? "";
	const alt = title ?? slug ?? "";

	return (
		<Box component={"article"} itemScope itemType={"https://schema.org/Article"}>
			<Link href={`/ikons/${slug}`} title={title}>
				<Stack gap={8}>
					<Paper
						sx={(theme) => ({
							border: `1px solid ${theme.colors.gold[4]}`,
							overflow: "hidden",
							backgroundColor: theme.colors.gold[6],
						})}
					>
						<Image
							unoptimized
							src={src}
							alt={alt}
							width={500}
							height={300}
							style={{
								width: "100%",
								objectFit: "contain",
							}}
							priority
						/>
					</Paper>

					{!!title && (
						<Text
							span
							ta={"center"}
							sx={(theme) => ({
								fontSize: 14,
								lineHeight: "16px",
								color: theme.colors.gold[4],
							})}
						>
							{title}
						</Text>
					)}
				</Stack>
			</Link>
		</Box>
	);
};

const IkonCardCalendar = ({ main_image, main_image_preview, title, slug }: Partial<Ikon>) => {
	const src = main_image_preview?.src ?? main_image?.src ?? "";
	const alt = title ?? slug ?? "";

	return (
		<Box component={"article"} itemScope itemType={"https://schema.org/Article"}>
			<Link href={`/ikons/${slug}`} title={title}>
				<Stack gap={8}>
					<Image
						unoptimized
						src={src}
						alt={alt}
						width="0"
						height="0"
						sizes="100vw"
						style={{
							width: "auto",
							height: 200,
							objectFit: "contain",
						}}
						priority
					/>
					{/*
					<Text span c={"gold.5"} fz={12} ta={"center"}>
						{alt}
					</Text> */}
				</Stack>
			</Link>
		</Box>
	);
};

export default IkonCard;

IkonCard.Calendar = IkonCardCalendar;

if (process.env.NODE_ENV === "development") {
	IkonCard.displayName = "IkonCard";
}
