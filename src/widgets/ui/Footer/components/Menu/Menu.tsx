import { Stack, Title, Text, SimpleGrid, Accordion, Container } from "@mantine/core";
import Link from "next/link";
import { useHover } from '@mantine/hooks';

type MenuItem = Record<string, any>

type MenuProps = {
	items: Array<MenuItem>;
};

const MenuItem = ({ url, title }: MenuItem) => {
	const { hovered, ref } = useHover();

	return (
		<Link href={url} title={title}>
			<Text ref={ref} c={hovered ? "white.0" : "brand.8"} span>
				{title}
			</Text>
		</Link>
	)
}

const Menu = ({ items = [] }: MenuProps) => {
	return (
		<>
			<Container
				visibleFrom="md"
			>
				<SimpleGrid cols={{ base: 1, md: 2, lg: 4 }}>
					{
						items.map(({ url = "", title = "", sub = "" }) => {
							return (
								<Stack key={`${url}-${title}`} gap={16}>
									{!url && (
										<Title key={title} order={4} c={"brand.9"}>
											{title}
										</Title>
									)}

									{url && (
										<Link key={url} href={url} title={title}>
											<Text span fz={18} fw={600} c={"brand.9"}>
												{title}
											</Text>
										</Link>
									)}

									<Stack gap={8}>
										{
											sub.map(({ title = "", url = "" }) => {
												if (!url) {
													return (
														<Text
															key={title}
															fz={14}
															c={"brand.9"}
															span
															fw={600}
															itemScope
															itemType="https://schema.org/Organization"
														>
															{title}
														</Text>
													);
												}

												return (
													<MenuItem key={url} url={url} title={title} />
												);
											})
										}
									</Stack>
								</Stack>
							);
						})
					}
				</SimpleGrid>
			</Container>

			<Accordion
				hiddenFrom="md"
				styles={() => ({
					control: {
						paddingLeft: 8,
						paddingRight: 8,
						background: "transparent !important",
					},
					content: {
						paddingLeft: 8,
						paddingRight: 8,
						paddingTop: 0,
						paddingBottom: 16,
					},
					item: {
						borderBottom: "1px solid rgb(255 255 255 / 30%)",
						"&:lastChild": {
							borderBottom: "0",
						},
					},
					chevron: {
						color: "#FFF",
					},
				})}
			>
				{
					items.map(({ url = "", title = "", sub = "" }) => {
						return (
							<Accordion.Item key={`${url}-${title}`} value={title}>
								<Accordion.Control>
									<Text span fw={700} c={"#FFF"}>
										{title}
									</Text>
								</Accordion.Control>

								<Accordion.Panel>
									<Stack gap={8}>
										{sub.map(({ title = "", url = "" }) => {
											if (!url) {
												return (
													<Text key={title} c={"#FFF"} span>
														{title}
													</Text>
												);
											}

											return (
												<Link key={url} href={url} title={title}>
													<Text c={"#FFF"} span>
														{title}
													</Text>
												</Link>
											);
										})}
									</Stack>
								</Accordion.Panel>
							</Accordion.Item>
						);
					})
				}
			</Accordion>
		</>
	);
};

export default Menu;

if (process.env.NODE_ENV === 'development') {
	Menu.displayName = "Menu";
}
