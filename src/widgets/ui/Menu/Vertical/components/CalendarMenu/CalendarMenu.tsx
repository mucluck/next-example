import { Box, Stack, Text, Divider, Flex, SimpleGrid, Title, ScrollArea, LoadingOverlay } from "@mantine/core";
import { IkonCard } from "@/entities/Ikon/ui";
import Link from "next/link";
import moment from "moment";
import { useRequest } from "ahooks";

import corner from "@/entities/Days/ui/DayPage/assets/corner.svg";

import { client } from "@/shared/graphql/client";
// @ts-ignore
import { CURRENT_DAY } from "@/shared/graphql/queries/calendar/queries.graphql";

// TODO: DRY
const getDay = (variables: { date: string }) => {
	return client.query({
		query: CURRENT_DAY,
		variables,
	});
};

const CalendarMenu = () => {
	const currentDay = new Date();
	const date = moment(currentDay).format("YYYY-MM-DD");

	const { data: dayData, loading: dayLoading } = useRequest(() => getDay({ date }), {
		// manual: true,
		ready: !!date,
		// onBefore: handleCall,
		onSuccess: () => {
			console.log("success");
		},
	});

	const data = dayData?.data?.days?.[0] ?? {};
	// @ts-ignore
	const saints = data?.saints?.map(({ saint }) => saint);
	// @ts-ignore
	const ikons = data?.ikons?.reduce((result, { saint }) => {
		const ikon = saint?.ikons?.[0]?.ikon;

		if (ikon) {
			result.push(ikon);
		}

		return result;
	}, [] as Array<Ikon>) ?? [];

	return (
		<ScrollArea sx={() => ({ height: "100%", position: "relative" })}>
			<Box
				sx={(_, fn) => ({
					height: "100%",
					marginTop: 24,
					[fn.largerThan("md")]: {
						padding: 32,
						// margin: 24,
					},
				})}
			>
				<Box
					sx={(theme) => ({
						"&:before": {
							content: "''",
							width: "2px solid",
							position: "absolute",
						},
						position: "absolute",
						width: 85,
						height: 85,
						left: 0,
						top: 0,
						backgroundImage: `url(${corner.src})`
					})}
				/>
				<Box
					sx={(theme) => ({
						position: "absolute",
						width: 85,
						height: 85,
						right: 0,
						top: 0,
						backgroundImage: `url(${corner.src})`,
						transform: "rotate(90deg)",
					})}
				/>

				<Stack key={`${data.date}-slider`} sx={() => ({ height: "100%" })} gap={32}>
					<Link href={`/calendar/${date}`}>
						<Title ta={"center"} c={"brand.9"}>
							{moment(currentDay).format("LL")}
						</Title>
					</Link>

					<SimpleGrid cols={2}>
						{/* @ts-ignore */}
						{ikons.map(({ image, main_image, slug, title_full }) => {
							return (
								<IkonCard.Calendar main_image={image ?? main_image} slug={slug} title={title_full} />
							);
						})}
					</SimpleGrid>

					<Flex gap={{ base: 8, md: 24 }} justify={"center"} direction={{ base: "column", md: "row" }}>
						<Stack align={"center"} gap={0}>
							<Link href={"/pages/julian-calendar"} title={"Старый стиль"}>
								<Text span c={"gold.9"}>
									Старый стиль
								</Text>
							</Link>

							<Divider variant={"dashed"} size={"xs"} color={"gold.4"} sx={() => ({ width: "100%" })} />

							<Text span c={"gold.9"}>
								{data.old_date_style}
							</Text>
						</Stack>

						<Text
							span
							c={"gold.9"}
							sx={(theme) => ({
								fontSize: 24,
								fontWeight: 600,
							})}
						>
							{data?.name}
						</Text>

						<Stack align={"center"} gap={0}>
							<Link href={"/pages/gregorian-calendar"} title={"Новый стиль"}>
								<Text span c={"gold.9"}>
									Новый стиль
								</Text>
							</Link>

							<Divider variant={"dashed"} size={"xs"} color={"gold.4"} sx={() => ({ width: "100%" })} />

							<Text span c={"gold.9"}>
								{data.new_date_style}
							</Text>
						</Stack>
					</Flex>

					<Text ta={"center"} c={"gold.9"} sx={{ fontSize: 24, fontWeight: 700 }}>
						{data?.week?.title}
					</Text>

					<Flex
						sx={() => ({ zIndex: 9, marginTop: "auto" })}
						direction={"row"}
						wrap={"wrap"}
						justify={{ base: "center", md: "flex-start" }}
						gap={8}
					>
						{/* @ts-ignore */}
						{saints?.map(({ rank, slug, title }) => {
							return (
								<>
									<Link key={slug} href={`/saints/${slug}`}>
										<Text span c={"gold.9"} fz={14}>
											{rank?.short_name} {title},
										</Text>
									</Link>
								</>
							);
						})}
					</Flex>
				</Stack>

				<Box
					sx={(theme) => ({
						position: "absolute",
						width: 85,
						height: 85,
						left: 0,
						bottom: 0,
						backgroundImage: `url(${corner.src})`,
						transform: "rotate(-90deg)",
					})}
				/>
				<Box
					sx={(theme) => ({
						position: "absolute",
						width: 85,
						height: 85,
						right: 0,
						bottom: 0,
						backgroundImage: `url(${corner.src})`,
						transform: "rotate(180deg)",
					})}
				/>

				<LoadingOverlay visible={dayLoading} />
			</Box>
		</ScrollArea>
	);
};

export default CalendarMenu;
