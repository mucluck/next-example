import { useMemo } from "react";
import { Paper, Table, Stack, ScrollArea, Menu, Button, Flex } from "@mantine/core";
import ReactPlayer from "react-player/lazy";
import moment from "moment";
import { useOs } from "@mantine/hooks";
import { IconBrandApple, IconBrandGoogle, IconBrandWindows, IconCalendarPlus } from "@tabler/icons-react";

import { useBroadcast } from "@/widgets/ui";
import { Section, Countdown } from "@/shared/ui";

const BroadcastDetails = ({ data }: { data: any }) => {
	const os = useOs();
	const { isEnabled } = useBroadcast();

	const schedules = data?.schedules ?? [];
	const building = data?.building ?? {};
	const beginsAt = data?.begins_at;

	const links = useMemo(() => {
		const { building_id, building_type } = building;

		const link = `export_broadcasts_schedule.ics?id=${building_id}&type=${building_type}`;
		const path = os === "android" ? `https://${link}` : `webcal://${link}`;
		// TODO: May be use not only for android ?

		const links = [
			{
				href: path,
				title: "Apple",
				icon: <IconBrandApple size={16} />,
			},
			{
				href: path,
				title: "Google",
				icon: <IconBrandGoogle size={16} />,
			},
			{
				href: path,
				title: "Outlook",
				icon: <IconBrandWindows size={16} />,
			},
		];

		return links;
	}, [building, os]);

	const startAt = useMemo(() => {
		const futureEvents = schedules
			.map(({ begins_at }: { begins_at: string }) => begins_at)
			.filter((date: any) => new Date(date) > new Date());

		return futureEvents[0] ?? beginsAt;
	}, [schedules, beginsAt]);

	return (
		<Stack gap={32}>
			{/* {!isEnabled && (
				<Cover
					image={data?.preview}
					title={data.title}
				/>
			)} */}

			<Paper
				h={{
					base: 200,
					md: 650
				}}
				sx={() => ({
					overflow: "hidden",
				})}
			>
				{
					isEnabled && (
						<ReactPlayer
							playing
							url={

							}
							height={"100%"}
							preload={"auto"}
							width={"100%"}
						/>
					)
				}
			</Paper>

			<Section
				title={"Расписание"}
				extra={
					<Flex gap={{ base: 8, md: 16 }} direction={{ base: "column", md: "row" }}>
						<Countdown date={startAt} />

						<Menu shadow="md" width={200}>
							<Menu.Target>
								<Button size={'compact-sm'} variant={"outline"} leftSection={<IconCalendarPlus size={16} />}>
									Добавить в календарь
								</Button>
							</Menu.Target>

							<Menu.Dropdown>
								{
									links.map(({ href, title, icon }) => {
										return (
											<Menu.Item
												key={href}
												component="a"
												href={href}
												target="_blank"
												leftSection={icon}
												title={`Доабавить в ${title}`}
											>
												{title}
											</Menu.Item>
										);
									})
								}
							</Menu.Dropdown>
						</Menu>
					</Flex>
				}
			>
				<ScrollArea>
					<Table
						striped
						highlightOnHover
						withColumnBorders
						withTableBorder
						itemScope
						itemType="http://schema.org/Event"
					>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>День</Table.Th>
								<Table.Th>Время</Table.Th>
								<Table.Th>Служба</Table.Th>
								<Table.Th>Праздник</Table.Th>
							</Table.Tr>
						</Table.Thead>

						<Table.Tbody>
							{
								schedules.map(({ begins_at, data }: any) => {
									return (
										<Table.Tr key={begins_at}>
											<Table.Td style={{ whiteSpace: "nowrap" }}>
												{moment(begins_at).locale("ru").format("LL, dddd")}
											</Table.Td>
											<Table.Td align="center">{moment(begins_at).locale("ru").format("LT")}</Table.Td>
											<Table.Td>{data?.title}</Table.Td>
											<Table.Td>{data?.holiday}</Table.Td>
										</Table.Tr>
									);
								})
							}
						</Table.Tbody>
					</Table>
				</ScrollArea>
			</Section>
		</Stack>
	);
};

export default BroadcastDetails;

if (process.env.NODE_ENV === "development") {
	BroadcastDetails.displayName = "BroadcastDetails";
}
