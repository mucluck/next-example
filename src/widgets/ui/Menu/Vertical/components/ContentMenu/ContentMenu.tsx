import { Stack, Table, Grid, Text, Paper, ScrollArea, Box, Flex, Group } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const data = [
	{
		date: "1 августа 1954г",
		text: "Нападение",
	},
];

const ContentMenu = ({ sub }: any) => {
	return (
		<ScrollArea
			h={'100%'}
			styles={{
				viewport: {
					'& > div': {
						height: '100%'
					}
				}
			}}
		>
			<Stack h={'100%'} justify={'space-between'}>
				<Flex gap={16} justify={'space-between'}>
					<Box>
						<Table withColumnBorders>
							<Table.Thead>
								<Table.Tr>
									<Table.Th>
										<Text c={"money.8"}>Дата</Text>
									</Table.Th>
									<Table.Th>
										<Text c={"money.8"}>Событие</Text>
									</Table.Th>
								</Table.Tr>
							</Table.Thead>

							<Table.Tbody>
								{
									data.map(({ date, text }) => {
										return (
											<Table.Tr key={date}>
												<Table.Td>
													<Text c={"money.9"}>{date}</Text>
												</Table.Td>

												<Table.Td>
													<Text c={"money.9"}>{text}</Text>
												</Table.Td>
											</Table.Tr>
										);
									})
								}
							</Table.Tbody>
						</Table>
					</Box>

					<Box pos={'relative'} w={426} h={520}>
						<Image
							fill
							unoptimized
							priority
							objectFit={'cover'}
							src={
								"https://storage.yandexcloud.net/uploads/content/2020/12/03/71966d6b-d02e-4167-9b68-392418d01b7c.jpg"
							}
							alt={"Дерево Нер'Зула"}
						/>
					</Box>
				</Flex>

				{
					!!sub?.length && (
						<Flex gap={16}>
							{
								sub.map(({ img, url, title }: any) => {
									return (
										<Link href={url} title={title}>
											<Stack gap={8}>
												<Image
													unoptimized
													src={img.src}
													alt={title}
													width={500}
													height={500}
													style={{
														width: "100%",
														height: "100%",
													}}
													priority
												/>

												<Text span ta={"center"} c={"money.9"} lh={"16px"}>
													{title}
												</Text>
											</Stack>
										</Link>
									);
								})
							}
						</Flex>
					)
				}
			</Stack>
		</ScrollArea>
	);
};

export default ContentMenu;
