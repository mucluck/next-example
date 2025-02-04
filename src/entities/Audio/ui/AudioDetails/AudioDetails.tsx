import { Stack, Flex, Text, Menu, Button, Group, Divider, Paper } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";

import { ContentBlock } from "@/shared/ui";
import { Share } from "@/widgets/ui";

const AudioDetails = ({ data }: { data: any }) => {
	const router = useRouter();

	const sections = data?.sections ?? [];
	const audio = data?.audio;
	const category = data?.category ?? {};

	return (
		<Stack gap={16}>
			<Flex justify={"space-between"}>
				<Group gap={8}>
					<Link href={`/media/audioguides/${category.slug}`} title={category.title}>
						<Text span>
							{category.title}
						</Text>
					</Link>

					<Divider
						orientation="vertical"
						visibleFrom="md"
					/>

					<Link
						href={`/calendar/${moment(data?.created_at).format("YYYY-MM-DD")}`}
						title={`Перейти к ${moment(data?.created_at).locale("ru").format("DD.MM.YYYY")} в календаре`}
					>
						<Text span>
							{moment(data?.created_at).locale("ru").format("LL")}
						</Text>
					</Link>
				</Group>
			</Flex>

			<Stack gap={32}>
				{/* <Paper sx={{ overflow: "hidden" }}>
					<Image
						unoptimized
						src={data?.main_image?.src}
						alt={data?.title_short ?? data?.title_full}
						width={500}
						height={500}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							objectPosition: "center 25%",
						}}
						priority
					/>
				</Paper> */}

				{/* TODO: DRY */}
				<audio
					controls
					src={audio.src}
					style={{ width: "100%" }}
					controlsList={"nodownload"}
					itemScope
					itemType="https://schema.org/AudioObject"
				>
					<a href={audio.src} title={`Скачать ${data?.title_short ?? data?.title_full}`}>
						Скачать {data?.title_short ?? data?.title_full}
					</a>
				</audio>

				<ContentBlock.List
					sections={sections}
				/>

				<Group gap={8} justify={"end"}>
					<Share href={router.asPath} title={data.title_full} image={data.main_image?.src} />
				</Group>
			</Stack>
		</Stack>
	);
};

export default AudioDetails;

if (process.env.NODE_ENV === "development") {
	AudioDetails.displayName = "AudioDetails";
}
