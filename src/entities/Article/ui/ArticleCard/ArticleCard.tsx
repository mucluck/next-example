import { Box, Flex, Text, Title, Stack, Divider, Paper, Group, Grid, Skeleton } from "@mantine/core";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

const ArticleCard = ({ title_full, issued_at, category, slug, teaser, main_image }: Article) => {
	const href = `/articles/${category.slug}/${slug}`;

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
			itemScope
			itemType={"https://schema.org/Article"}
		>
			<Box
				component={Link}
				href={href}
				title={title_full}
				sx={{ overflow: "hidden", display: 'flex' }}
			>
				<Image
					unoptimized
					src={main_image?.src}
					alt={title_full}
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
				<Group gap={4}>
					<Link href={`/articles/${category.slug}`} title={category?.title_full}>
						<Text span c={"gold.4"}>
							{category?.title_full}
						</Text>
					</Link>
				</Group>

				<Text span c={"gold.4"}>
					{/* TODO: Move dates to config */}
					{moment(issued_at).locale("ru").format("DD.MM.YYYY")}
				</Text>
			</Flex>

			<Divider color={"#d3d3d3"} />

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

					{
						!!teaser && (
							<Text
								span
								lh={"20px"}
								fz={16}
								ta={"justify"}
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

									<IconArrowRight height={16} className={"arrow"} />
								</Group>
							</Text>
						</Link>
					</Group>
				</Stack>
			</Flex>
			<style jsx global>
				{
					`
									.svg-link svg {
										transition: transform .3s ease;
									}

									.svg-link:hover svg {
										transform: translateX(4px);
									}
								`
				}
			</style>
		</Paper>
	);
};

export default ArticleCard;

if (process.env.NODE_ENV === "development") {
	ArticleCard.displayName = "ArticleCard";
}

const ArticleCardLinked = ({ title_full, title_short, issued_at, category, slug, teaser, main_image }: News) => {
	const href = `/articles/${category?.slug}/${slug}`;

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
					<Link href={`/articles/${category?.slug}`} title={category?.title_full} style={{ textDecoration: "none" }}>
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
					<Title
						order={5}
						sx={(theme) => ({
							color: theme.colors.brand?.[4],
							lineHeight: "20px",
						})}
					>
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
	ArticleCardLinked.displayName = "ArticleCardLinked";
}

ArticleCard.Linked = ArticleCardLinked;

const ArticleCardSkeleton = () => {
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
	ArticleCardSkeleton.displayName = "ArticleCardSkeleton";
}

ArticleCard.Skeleton = ArticleCardSkeleton;
