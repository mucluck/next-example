import { Stack, Table, Grid, Text, Paper } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const data = [
	{
		date: "1 августа 1754г",
		text: "Нападение",
	},
];

const ContentMenu = ({ sub }: any) => {
	return (
		<Stack sx={() => ({ height: "100%" })}>
			<Grid gutter={16}>
				<Grid.Col span={12}>
					<Paper sx={(theme) => ({ overflow: "hidden" })}>
						<Image
							unoptimized
							src={
								"https://storage.yandexcloud.net/uploads/content/2020/12/03/71966d6b-d02e-4167-9b68-392418d01b7c.jpg"
							}
							alt={"Ануб'Арак"}
							width={500}
							height={500}
							style={{
								width: "100%",
								height: "100%",
								objectFit: "cover",
							}}
							priority
						/>
					</Paper>
				</Grid.Col>

				<Grid.Col span={12}>
					<Table
						striped
						highlightOnHover
						withColumnBorders
					>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>
									<Text c={"money.4"}>Дата</Text>
								</Table.Th>
								<Table.Th>
									<Text c={"money.4"}>Событие</Text>
								</Table.Th>
							</Table.Tr>
						</Table.Thead>

						<Table.Tbody>
							{
								data.map(({ date, text }) => {
									return (
										<Table.Tr key={date}>
											<Table.Td style={{ whiteSpace: "nowrap" }}>
												<Text c={"money.4"}>{date}</Text>
											</Table.Td>
											<Table.Td>
												<Text c={"money.4"}>{text}</Text>
											</Table.Td>
										</Table.Tr>
									);
								})
							}
						</Table.Tbody>
					</Table>
				</Grid.Col>
			</Grid>

			{!!sub?.length && (
				<Grid gutter={16} columns={12} sx={() => ({ marginTop: "auto" })}>
					{sub.map(({ img, url, title }: any) => {
						return (
							<Grid.Col key={url} span={4}>
								<Link href={url} title={title} style={{ textDecoration: "none" }}>
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
												objectFit: "cover",
											}}
											priority
										/>

										<Text ta={"center"} c={"money.4"} lh={"16px"}>
											{title}
										</Text>
									</Stack>
								</Link>
							</Grid.Col>
						);
					})}
				</Grid>
			)}
		</Stack>
	);
};

export default ContentMenu;
