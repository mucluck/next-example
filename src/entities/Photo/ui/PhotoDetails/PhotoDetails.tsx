import { Stack, Flex, Text, Group } from "@mantine/core";
import Link from "next/link";
import moment from "moment";
import { useRouter } from "next/router";

import { ContentBlock, Cover } from "@/shared/ui";
import { Share } from "@/widgets/ui";

const PhotoDetails = ({ data }: { data: any }) => {
	const router = useRouter();

	const sections = data?.sections ?? [];

	return (
		<Stack gap={16}>
			<Link
				href={`/calendar/${moment(data?.created_at).format("YYYY-MM-DD")}`}
				title={`Перейти к ${moment(data?.created_at).locale("ru").format("DD.MM.YYYY")} в календаре`}
			>
				<Text span >
					{moment(data?.created_at).locale("ru").format("LL")}
				</Text>
			</Link>

			<Stack gap={32}>
				{/* <Cover
					image={data?.main_image}
					title={data?.title_short ?? data?.title_full}
				/> */}

				<ContentBlock.List
					sections={sections}
				/>

				{/* <ImageGallery
					items={media.items?.map(({ id, src, title }) => ({
						id,
						url: src,
						alt: title,
					}))}
				/> */}

				<Group gap={8} justify={"end"}>
					<Share href={router.asPath} title={data.title_full} image={data.main_image?.src} />
				</Group>
			</Stack>
		</Stack>
	);
};

export default PhotoDetails;

if (process.env.NODE_ENV === "development") {
	PhotoDetails.displayName = "PhotoDetails";
}
