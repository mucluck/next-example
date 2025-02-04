import { Group, Paper, Stack, Text, Grid, Divider, LoadingOverlay, Flex } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useRequest } from "ahooks";
import moment from "moment";

import { client } from "@/shared/graphql/client";

// @ts-ignore
import { CURRENT_DAY } from "@/shared/graphql/queries/calendar/queries.graphql";

const getDay = (variables: { date: string }) => {
	return client.query({
		query: CURRENT_DAY,
		variables,
	});
};

const DayCard = () => {
	const date = moment(new Date()).format("YYYY-MM-DD");

	const {
		data: dayData,
		loading: getDayLoading,
		cancel: getDayCancel,
	} = useRequest(getDay.bind(null, { date }), {
		refreshDeps: [date],
		onSuccess: () => {
			console.log("success");
		},
	});

	const day = dayData?.data?.days?.[0] ?? {};
	const ikon = day.ikons?.[0]?.saint?.ikons?.[0]?.ikon?.main_image ?? {};

	const hasIkon = !!ikon.src;

	return (
		<Paper
			component={"article"}
			shadow={"xl"}
			sx={(theme, fn) => ({
				overflow: "hidden",
				padding: 16,
				backgroundColor: theme.colors.money[4],
				[fn.largerThan("md")]: {
					transition: "transform .3s ease",
					"&:hover": {
						transform: "scale(1.01)",
					},
				},
			})}
		>
			<Paper
				shadow={"xl"}
				sx={(theme) => ({
					padding: 16,
					overflow: "hidden",
					backgroundColor: theme.colors.white[0],
					minHeight: 300,
				})}
				pos={"relative"}
			>
				{
					!getDayLoading && (
						<Stack gap={16}>
							<Grid>
								{hasIkon && (
									<Grid.Col span={6}>
										<Image
											unoptimized
											src={ikon.src}
											alt={""}
											width={500}
											height={500}
											style={{
												width: "100%",
												height: "100%",
												objectFit: "cover",
											}}
											priority
										/>
									</Grid.Col>
								)}

								<Grid.Col span={hasIkon ? 6 : 12}>
									<Stack gap={8} justify="center" sx={() => ({ height: "100%" })}>
										<Text>
											Сегодня{" "}
											<Text span c="money.4">
												{day?.name}
											</Text>
										</Text>

										<Divider />

										<Flex gap={0} direction={"column"}>
											<Text span>{day?.old_date_style} по </Text>

											<Link href={"/pages/gregorian-calendar"} title={"по старому стилю"}>
												<Text span c={"gold.4"}>
													старому стилю
												</Text>
											</Link>
										</Flex>

										<Divider />

										<Flex gap={0} direction={"column"}>
											<Text>{day?.new_date_style} по </Text>

											<Link href={"/pages/julian-calendar"} title={"по новому стилю"}>
												<Text span c={"gold.4"}>
													новому стилю
												</Text>
											</Link>
										</Flex>
									</Stack>
								</Grid.Col>
							</Grid>

							<Divider />

							<Text span ta={"center"} fz={22} lh={"24px"} fw={600} c={"brand.4"}>
								{day?.week?.title}
							</Text>

							<Divider />

							<Group gap={0}>
								{/* @ts-ignore */}
								{day.saints?.map(({ saint }) => {
									return (
										<Link key={saint?.slug} href={`/saints/${saint?.slug}`} title={saint?.title}>
											<Text span fz={14} lh={"16px"} c={"gold.4"}>{`${saint?.rank?.short_title ?? ""
												} ${saint?.title}`}</Text>
										</Link>
									);
								})}
							</Group>

							<Group justify={"right"}>
								<Link href={`/calendar/${date}`} title={day?.week?.title} className={"svg-link"}>
									<Text span fz={14}>
										<Group gap={0}>
											Подробнее

											<IconArrowRight height={16} />
										</Group>
									</Text>
								</Link>
							</Group>
						</Stack>
					)
				}

				<LoadingOverlay visible={getDayLoading} />
			</Paper>
		</Paper>
	);
};

export default DayCard;
