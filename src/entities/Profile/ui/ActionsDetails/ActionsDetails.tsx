import { useState, useEffect, ReactElement } from "react";
import { Stack, SegmentedControl, SimpleGrid, Text, Title, Group, Badge, Flex } from "@mantine/core";
import { useRequest } from "ahooks";
import { IconClipboard, IconCalendar, IconCashBanknote } from "@tabler/icons-react";
import Link from "next/link";

import { client } from "@/shared/graphql/client";

// @ts-ignore
import { ORDERS } from "@/shared/graphql/queries/orders/queries.graphql";

import { useProfile } from "@/widgets/ui";

import Dome from "@/widgets/ui/Menu/Vertical/dome";

const orders = [
	{
		state: "created",
		paymentType: null,
		id: "33232",
		email: null,
		goals: null,
		delivery: null,
		anonymous: true,
		amount: 10,
		updatedAt: "2023-11-22 03:05:25 +0300",
		trebCategory: "Заказная записка",
		trebNames: ["архидиакона Sd"],
		trebType: "life",
		paymentData: {
			accountId: 185292,
			amount: 10,
			currency: "RUB",
			description: "",
			publicId: "pk_c8af9e3490459393c176b18486bb1",
			requireEmail: true,
			invoiceId: 33232,
			email: null,
			data: {
				phone: null,
			},
		},
		payment: {
			type: null,
		},
		crowdfundingProject: {
			id: "67",
			title: "Записка о поминовении",
			description: "Записка о поминовении",
			images: [],
			kind: "treb",
		},
	},
];

const states = {
	created: <Badge color={"red"}>Не оплачено</Badge>,
	confirmed: <Badge color={"green"}>Оплачено</Badge>,
	approved: <Badge color={"gold"}>Подтверждено</Badge>,
	default: <></>,
} as Record<string, ReactElement>;

const getActions = (variables: { kind: string }, token: string) => {
	// const tokenL = JSON.parse(localStorage.getItem("token"));
	// const tokenS = JSON.parse(sessionStorage.getItem("token"));

	// if (tokenL || tokenS) {
	// 	const HTTPLink = new HttpLink({
	// 		headers: {
	// 			"Authorization": `Bearer ${tokenL || tokenS}`,
	// 		},
	// 	});
	// 	const link = client.link.concat(HTTPLink);

	// 	client.clearStore();

	// 	client.setLink(link);
	// }

	return client.query({
		query: ORDERS,
		variables,
		context: {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		},
	});
};

const ActionsDetails = () => {
	const { token } = useProfile();

	const [kind, setKind] = useState("donate");

	const {
		data: ordersData,
		loading: ordersLoading,
		run: getOrders,
		// cancel: searchCancel,
	} = useRequest(getActions, {
		manual: true,
		ready: !!token,
		debounceWait: 300,
		onSuccess: () => {
			console.log("success");
		},
	});

	useEffect(() => {
		getOrders({ kind }, token);
	}, [kind]);

	console.log({ ordersData });

	return (
		<Stack gap={16}>
			<SimpleGrid cols={{ base: 1, md: 4 }}>
				<SegmentedControl
					value={kind}
					onChange={setKind}
				/>
			</SimpleGrid>

			<SimpleGrid cols={1}>
				<Stack>
					{!!orders.length && (
						<Stack gap={32}>
							{orders.map(
								({ state, trebCategory, trebNames, updatedAt, paymentData, crowdfundingProject }) => {
									return (
										<Stack>
											<Title order={3}>{crowdfundingProject.title}</Title>

											<Flex justify={"space-between"}>
												<Stack gap={8}>
													<Text>
														<Group gap={4}>
															<IconClipboard size={24} stroke={1} />

															<Text span>{trebCategory}</Text>
														</Group>
													</Text>

													<Text>
														<Group gap={8}>
															<Dome size={24} stroke={1} wra={"nowrap"} />

															<Link href={crowdfundingProject.path}>
																<Text span>{crowdfundingProject.place}</Text>
															</Link>
														</Group>
													</Text>

													<Text>
														<Group gap={8}>
															<IconCalendar size={24} stroke={1} />

															<Text>{updatedAt}</Text>
														</Group>
													</Text>

													<Text>
														<Group gap={8}>
															<IconCashBanknote size={24} stroke={1} />
															<Text>{paymentData.amount}</Text>₽
														</Group>
													</Text>

													<Stack gap={4}>
														<Title order={5}>Имена</Title>
														{trebNames.map((name) => (
															<Text>{name}</Text>
														))}
													</Stack>
												</Stack>

												<Stack>
													{states[state]}
													<Badge>
														<Text c={"brand.9"}>№ {paymentData.invoiceId}</Text>
													</Badge>
												</Stack>
											</Flex>
										</Stack>
									);
								}
							)}
						</Stack>
					)}
				</Stack>
			</SimpleGrid>
		</Stack>
	);
};

export default ActionsDetails;
