import { Box, Flex, Text, Title, Stack, Divider, Paper, Group } from "@mantine/core";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";
import dynamic from 'next/dynamic'

const ReactPlayer = dynamic(() => import("react-player/youtube"), { ssr: false });

const VideoCard = ({ title_full, category, slug, teaser, src }: any) => {
	const href = `/media/videos/${category.slug}/${slug}`;

	return (
		<Paper
			component={"article"}
			shadow={"xl"}
			sx={(_, fn) => ({
				overflow: "hidden",
				[fn.largerThan("md")]: {
					transition: "transform .3s ease",
					"&:hover": {
						transform: "scale(1.01)",
					},
				},
			})}
		>
			<Box sx={{ overflow: "hidden" }}>
				<ReactPlayer url={src} width={"100%"} />
			</Box>

			<Flex p={{ base: 8, md: 16 }}>
				<Stack gap={16}>
					<Link href={href} title={title_full}>
						<Title
							order={3}
							sx={(theme, fn) => ({
								color: theme.colors.brand?.[4],
								fontSize: 20,
								lineHeight: "22px",
								[fn.largerThan("md")]: {
									fontSize: 22,
									lineHeight: "24px",
								},
							})}
						>
							{title_full}
						</Title>
					</Link>

					{!!teaser && (
						<Text lh={"20px"} ta={"justify"}>
							{teaser}
						</Text>
					)}

					<Group justify={"right"}>
						<Link href={href} className={"svg-link"}>
							<Text span fz={14}>
								<Group gap={0}>
									Подробнее

									<IconArrowRight height={16} />
								</Group>
							</Text>
						</Link>
					</Group>
				</Stack>
			</Flex>
		</Paper>
	);
};

export default VideoCard;

if (process.env.NODE_ENV === "development") {
	VideoCard.displayName = "VideoCard";
}

const VideoCardLinked = ({ title_full, title_short, issued_at, category, slug, teaser, main_image }: News) => {
	const href = `/media/videos/${category?.slug}/${slug}`;

	return (
		<Paper
			component={"article"}
			sx={{
				overflow: "hidden",
			}}
		>
			<Stack gap={8}>
				<Link href={href} title={title_full}>
					<Box sx={{ overflow: "hidden", height: 250 }}>
						<Image
							unoptimized
							src={main_image?.src}
							alt={title_short ?? title_full}
							width={500}
							height={500}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
							}}
							priority
						/>
					</Box>
				</Link>

				<Flex justify={"space-between"}>
					<Link href={`/media/videos/${category.slug}`} title={category?.title_full}>
						<Text span c={"gold.4"}>
							{category.title_full}
						</Text>
					</Link>

					<Link
						href={`/calendar/${moment(issued_at).format("YYYY-MM-DD")}`}
						title={`Перейти к ${moment(issued_at).locale("ru").format("DD.MM.YYYY")}`}
					>
						<Text span c={"gold.4"}>
							{/* TODO: Move dates to config */}
							{moment(issued_at).locale("ru").format("DD.MM.YYYY")}
						</Text>
					</Link>
				</Flex>

				<Divider color={"#d3d3d3"} />

				<Link href={href} title={title_full}>
					<Title order={5} sx={(theme) => ({ color: theme.colors.brand?.[4], lineHeight: "20px" })}>
						{title_short ?? title_full}
					</Title>
				</Link>

				{!!teaser && (
					<Text sx={(theme) => ({ color: theme.colors.brand?.[4], lineHeight: "20px", textAlign: "justify" })}>
						{teaser}
					</Text>
				)}
			</Stack>
		</Paper>
	);
};

if (process.env.NODE_ENV === "development") {
	VideoCardLinked.displayName = "VideoCardLinked";
}

VideoCard.Linked = VideoCardLinked;
