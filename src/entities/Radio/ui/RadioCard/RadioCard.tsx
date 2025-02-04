import { Box, Paper, Stack, Title, Text, Grid } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const RadioCard = ({ title, audio, teaser, link, image }: any) => {
	return (
		<Box>
			<Grid grow gutter={16}>
				<Grid.Col span={{ base: 12, lg: 3 }}>
					<Paper
						sx={(theme) => ({
							height: 400,
							border: `1px solid ${theme.colors.gold[4]}`,
							overflow: "hidden",
							backgroundColor: theme.colors.gold[6],
						})}
					>
						<Link href={link} title={title}>
							<Image
								unoptimized
								src={image.src}
								alt={title}
								width={500}
								height={300}
								style={{
									width: "100%",
									height: "100%",
									objectFit: "cover",
								}}
								priority
							/>
						</Link>
					</Paper>
				</Grid.Col>

				<Grid.Col span={{ base: 12, lg: 9 }}>
					<Stack gap={16}>
						<Link href={link} title={title}>
							<Title order={3} c={"brand.4"}>
								{title}
							</Title>
						</Link>

						<audio
							controls
							src={audio.src}
							style={{ width: "100%" }}
							controlsList={"nodownload"}
							itemScope
							itemType="https://schema.org/AudioObject"
						>
							<a href={audio.src} title={`Скачать ${title}`}>
								Скачать {title}
							</a>
						</audio>

						{!!teaser && <Text>{teaser}</Text>}
					</Stack>
				</Grid.Col>
			</Grid>
		</Box>
	);
};

export default RadioCard;

if (process.env.NODE_ENV === "development") {
	RadioCard.displayName = "RadioCard";
}
