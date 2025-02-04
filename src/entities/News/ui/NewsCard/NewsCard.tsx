import { Box, Flex, Text, Title, Stack, Divider, Paper, Group, Grid, Skeleton } from "@mantine/core";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { IconArrowRight, IconVideo, IconCamera } from "@tabler/icons-react";

const mediaIcon = {
	Video: <IconVideo size={48} color={"white"} />,
	Gallery: <IconCamera size={48} color={"white"} />,
};

const NewsCard = ({
	title_full,
	title_short,
	issued_at,
	category,
	slug,
	teaser,
	main_image,
	mediaType,
}: News & { mediaType: string }) => {
	const href = `/news/${category?.slug}/${slug}`;
	// @ts-ignore
	const icon: string = mediaIcon[mediaType];

	return (
		<Paper
			component={"article"}
			shadow={"xl"}
			sx={(_, fn) => ({
				position: "relative",
				overflow: "hidden",
				[fn.largerThan("md")]: {
					transition: "transform .3s ease",
					"&:hover": {
						transform: "scale(1.01)",
					},
				},
			})}
			itemScope
			itemType={"https://schema.org/NewsArticle"}
		>
			<Box component={Link} href={href} title={title_full} sx={{ overflow: "hidden", display: 'flex' }}>
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

			<Divider color={"#d3d3d3"} />

			<Flex px={{ base: 8, md: 16 }} py={8} justify={"space-between"}>
				<Link href={`/news/${category?.slug}`} title={category?.title_full}>
					<Text span c={"gold.4"}>
						{category?.title_full}
					</Text>
				</Link>

				<Text span c={"gold.4"}>
					{/* TODO: Move dates to config */}
					{moment(issued_at).locale("ru").format("DD.MM.YYYY")}
				</Text>
			</Flex>

			<Divider color={"#d3d3d3"} />

			<Flex p={{ base: 8, md: 16 }} direction={"column"}>
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

					{
						!!teaser && (
							<Text
								span
								lh={"20px"}
								ta={"justify"}
								fz={16}
							>
								{teaser}
							</Text>
						)
					}

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

			<Box sx={() => ({ position: "absolute", left: 16, top: 16 })}>{icon}</Box>
		</Paper>
	);
};

export default NewsCard;

if (process.env.NODE_ENV === "development") {
	NewsCard.displayName = "NewsCard";
}

const NewsCardLinked = ({ title_full, title_short, issued_at, category, slug, teaser, main_image }: News) => {
	const href = `/news/${category?.slug}/${slug}`;

	return (
		<Paper
			component={"article"}
			sx={{
				overflow: "hidden",
			}}
		>
			<Stack gap={8}>
				<Link href={href} title={title_full} style={{ textDecoration: "none" }}>
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
					<Link href={`/news/${category?.slug}`} title={category?.title_full} style={{ textDecoration: "none" }}>
						<Text span c={"gold.4"}>
							{category?.title_full}
						</Text>
					</Link>

					<Link
						href={`/calendar/${moment(issued_at).format("YYYY-MM-DD")}`}
						title={`Перейти к ${moment(issued_at).locale("ru").format("DD.MM.YYYY")}`}
						style={{ textDecoration: "none" }}
					>
						<Text span c={"gold.4"}>
							{/* TODO: Move dates to config */}
							{moment(issued_at).locale("ru").format("DD.MM.YYYY")}
						</Text>
					</Link>
				</Flex>

				<Divider color={"#d3d3d3"} />

				<Link href={href} title={title_full} style={{ textDecoration: "none" }}>
					<Title order={5} sx={(theme) => ({ color: theme.colors.brand?.[4], lineHeight: "20px" })}>
						{title_short ?? title_full}
					</Title>
				</Link>

				{!!teaser && (
					<Text lineClamp={4} sx={(theme) => ({ lineHeight: "20px", textAlign: "justify" })}>
						{teaser}
					</Text>
				)}
			</Stack>
		</Paper>
	);
};

if (process.env.NODE_ENV === "development") {
	NewsCardLinked.displayName = "NewsCardLinked";
}

NewsCard.Linked = NewsCardLinked;

const NewsCardSkeleton = () => {
	return (
		<Grid grow gutter={8}>
			<Grid.Col span={8}>
				<Skeleton height={300} />
			</Grid.Col>

			<Grid.Col span={8}>
				<Stack gap={8}>
					<Skeleton height={12} radius="xl" />
					<Skeleton height={12} width="30%" radius="xl" />
					<Skeleton height={12} width="40%" radius="xl" />
					<Skeleton height={12} width="70%" radius="xl" />
				</Stack>
			</Grid.Col>
		</Grid>
	);
};

if (process.env.NODE_ENV === "development") {
	NewsCardSkeleton.displayName = "NewsCardSkeleton";
}

NewsCard.Skeleton = NewsCardSkeleton;
