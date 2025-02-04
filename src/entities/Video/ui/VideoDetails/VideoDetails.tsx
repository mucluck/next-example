import { Stack, Flex, Text, Group, Divider, Paper } from "@mantine/core";
import Link from "next/link";
import moment from "moment";
import ReactPlayer from "react-player/youtube";
import { useRouter } from "next/router";

import { ContentBlock, Cover } from "@/shared/ui";
import { Share } from "@/widgets/ui";

const VideoDetails = ({ data }: { data: any }) => {
	const router = useRouter();

	const sections = data?.sections ?? [];
	const category = data?.category ?? {};

	return (
		<Stack gap={16}>
			<Flex justify={"space-between"}>
				<Group gap={8}>
					{
						!!category?.title_full && (
							<>
								<Link href={`/media/videos/${category.slug}`} title={category?.title_full}>
									<Text span>
										{category?.title_full}
									</Text>
								</Link>

								<Divider orientation="vertical" />
							</>
						)
					}

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
				{/* <Cover
					image={data?.main_image}
					title={data?.title_short ?? data?.title_full}
				/> */}

				<Stack gap={16}>
					{!!data.src && (
						<Paper sx={(theme) => ({ overflow: "hidden" })}>
							<ReactPlayer url={data.src} width={"100%"} />
						</Paper>
					)}

					<ContentBlock.List
						sections={sections}
					/>
				</Stack>

				<Group gap={8} justify={"end"}>
					<Share href={router.asPath} title={data.title_full} image={data.main_image?.src} />
				</Group>
			</Stack>
		</Stack>
	);
};

export default VideoDetails;

if (process.env.NODE_ENV === "development") {
	VideoDetails.displayName = "VideoDetails";
}
