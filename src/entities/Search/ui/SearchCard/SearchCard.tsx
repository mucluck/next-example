import { Paper, Text, Grid, Skeleton, Stack, Group, Box } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const types = {
	news: {
		title: "Новости",
		link: "/news",
	},
	articles: {
		title: "Статьи",
		link: "/articles",
	},
};

const SearchCard = ({ image, title, link, type }: any) => {
	// @ts-ignore
	const typed = types[type] ?? {};

	return (
		<Grid grow gutter={8}>
			<Grid.Col span={4}>
				<Paper
					h={"100%"}
					component={Link}
					sx={{ overflow: "hidden" }}
					href={link}
					title={title}
				>
					<Image
						unoptimized
						src={image?.src}
						alt={title}
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
			</Grid.Col>

			<Grid.Col span={8}>
				<Stack gap={8}>
					<Group gap={4}>
						<Text
							span
							fz={14}
							lh={"14px"}
							c={"money.4"}
						>
							Раздел:
						</Text>

						<Link href={typed?.link} title={typed?.title}>
							<Text
								span
								fz={14}
								lh={"14px"}
								c={"gold.4"}
							>
								{typed?.title}
							</Text>
						</Link>
					</Group>

					<Link
						href={link}
						title={title}
						style={{ display: 'flex' }}
					>
						<Text
							span
							c={"brand.4"}
							fz={14}
							lh={"14px"}
						>
							{title}
						</Text>
					</Link>
				</Stack>
			</Grid.Col>
		</Grid>
	);
};

const SearchCardSkeleton = () => {
	return (
		<Grid grow gutter={8}>
			<Grid.Col span={4}>
				<Skeleton height={110} />
			</Grid.Col>

			<Grid.Col span={8}>
				<Stack gap={8}>
					<Skeleton height={12} width="40%" radius="xl" />
					<Skeleton height={12} radius="xl" />
					<Skeleton height={12} radius="xl" />
					<Skeleton height={12} width="70%" radius="xl" />
				</Stack>
			</Grid.Col>
		</Grid>
	);
};

if (process.env.NODE_ENV === 'development') {
	SearchCardSkeleton.displayName = "SearchCardSkeleton";
}

SearchCard.Skeleton = SearchCardSkeleton;

export default SearchCard;
