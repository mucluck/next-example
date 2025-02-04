import { Box, Stack, Text, Flex, SimpleGrid, Title } from "@mantine/core";
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

	const { data: dayData } = useRequest(() => getDay({ date }), {
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
	const ikons = saints?.reduce((result, { ikons }) => {
		const ikon = ikons?.[0]?.ikon;

		if (ikon) {
			result.push(ikon);
		}

		return result;
	}, [] as Array<Ikon>) ?? [];

	return (
		<Stack gap={24} sx={() => ({ height: "100%" })}>
			<Box
				sx={(_, fn) => ({
					height: "100%",
					padding: 16,
					margin: 16,
					position: "relative",
					[fn.largerThan("md")]: {
						padding: 32,
						margin: 24,
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
						left: -24,
						top: -16,
						backgroundImage: `url(${corner.src})`,
						backgroundSize: "70%",
						backgroundRepeat: "no-repeat",
						// backgroundColor: theme.colors.white,
					})}
				/>
				<Box
					sx={(theme) => ({
						position: "absolute",
						width: 85,
						height: 85,
						right: -24,
						top: -16,
						backgroundImage: `url(${corner.src})`,
						backgroundSize: "70%",
						backgroundRepeat: "no-repeat",
						transform: "rotate(90deg)",
					})}
				/>

				<Stack key={`${data.date}-slider`} sx={() => ({ height: "100%" })}>
					<Link href={`/calendar/${date}`}>
						<Title ta={"center"}>{moment(currentDay).format("LL")}</Title>
					</Link>

					<SimpleGrid cols={3}>
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
								<Text span c={"gold.4"}>
									Старый стиль
								</Text>
							</Link>

							<Text span>{data.old_date_style}</Text>
						</Stack>

						<Text ta={"center"} fz={24} fw={600} c={"money.4"}>
							{data?.name}
						</Text>

						<Stack align={"center"} gap={0}>
							<Link href={"/pages/gregorian-calendar"} title={"Новый стиль"}>
								<Text span c={"gold.4"}>
									Новый стиль
								</Text>
							</Link>

							<Text span>{data.new_date_style}</Text>
						</Stack>
					</Flex>

					<Text ta={"center"} fz={24} fw={600} c={"money.4"}>
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
										<Text span fz={14}>
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
						left: -24,
						bottom: -24,
						backgroundImage: `url(${corner.src})`,
						backgroundSize: "70%",
						backgroundRepeat: "no-repeat",
						transform: "rotate(-90deg)",
					})}
				/>
				<Box
					sx={(theme) => ({
						position: "absolute",
						width: 85,
						height: 85,
						right: -24,
						bottom: -24,
						backgroundImage: `url(${corner.src})`,
						backgroundSize: "70%",
						backgroundRepeat: "no-repeat",
						transform: "rotate(180deg)",
					})}
				/>
			</Box>
		</Stack>
	);
};

export default CalendarMenu;
