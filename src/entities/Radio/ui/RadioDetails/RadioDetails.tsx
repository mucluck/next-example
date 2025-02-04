import { Stack, Flex, Text, Group } from "@mantine/core";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";

import { ContentBlock, Cover } from "@/shared/ui";
import { Share } from "@/widgets/ui";

const RadioDetails = ({ data }: { data: any }) => {
	const router = useRouter();

	const sections = data?.sections ?? [];
	const audio = data?.audio;

	return (
		<Stack gap={16}>
			<Flex justify={"space-between"}>
				<Group gap={8}>
					{/* <Link href={"/media/radio-records"} title={"Радиоэфиры"}>
						<Text span c={"gold.4"}>
							Радиоэфиры
						</Text>
					</Link>

					<Divider
						orientation="vertical"
						sx={(theme) => ({
							[theme.fn?.smallerThan("md")]: {
								display: "none",
							},
						})}
					/> */}

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

export default RadioDetails;

if (process.env.NODE_ENV === "development") {
	RadioDetails.displayName = "RadioDetails";
}
