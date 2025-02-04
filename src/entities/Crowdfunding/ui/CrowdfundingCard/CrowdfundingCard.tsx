import { useState, useEffect } from "react";
import { Modal, Stack, Paper, Box, Title, Text, Button, TextInput, Checkbox, NumberInput, Input } from "@mantine/core";
import { useForm, isNotEmpty, isEmail } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import Image from "next/image";
import { IconCurrencyRubel, IconAt, IconPlus, IconExclamationCircle, IconCircleCheck } from "@tabler/icons-react";
import { useRequest } from "ahooks";

import { useProfile } from "@/widgets/ui";
import { client } from "@/shared/graphql/client";
// @ts-ignore
import { UPDATE_CURRENT_ORDER } from "@/shared/graphql/queries/crowdfunding/mutations.graphql";

// TODO: load CP script after submit form
const pay = (paymentData = null) => {
	// @ts-ignore
	if (typeof cp !== "undefined" && paymentData) {
		return new Promise((resole, reject) => {
			// @ts-ignore
			const widget = new cp.CloudPayments({ language: "ru" });

			widget.charge(
				Object.assign({}, paymentData, {
					skin: "mini",
				}),
				resole,
				reject
			);
		});
	}

	return Promise.reject("CP Error or empty paymentData");
};

const crowdfundingOrder = (variables: any) => {
	return new Promise((resolve, reject) => {
		client
			.query({
				query: UPDATE_CURRENT_ORDER,
				variables: {
					rewards: ["154"],
					goals: [],
					delivery: "",
					email: "",
					firstName: "",
					paymentType: "natural",
					phone: "+7",
					...variables,
				},
			})
			.then(({ data }) => {
				const paymentData = data.order?.order?.paymentData;

				pay(paymentData).then(resolve).catch(reject);
			})
			.catch(reject);
	});
};

const CrowdfundingCard = ({ title, description, image, id, slug }: any) => {
	const [isOpened, setIsOpened] = useState(false);

	const { currentUser } = useProfile();

	const {
		loading: crowdfundingOrderLoading,
		run: makeCrowdfundingOrder,
		// cancel: searchCancel,
	} = useRequest(crowdfundingOrder, {
		manual: true,
		onSuccess: () => {
			notifications.show({
				title: "Успех!",
				message: "Платёж выполнен.",
				color: "green",
				icon: <IconCircleCheck />,
				withBorder: true,
				sx: (_, fn) => ({
					top: 60,
					[fn.largerThan("md")]: {
						top: 90,
					},
				}),
			});

			form.reset();

			// setActive(0);
		},
		onError: (error) => {
			const message = typeof error === "string" ? error : error.message;

			notifications.show({
				title: "Платёж отменён!",
				message,
				color: "red",
				icon: <IconExclamationCircle />,
				withBorder: true,
				sx: (_, fn) => ({
					top: 60,
					[fn.largerThan("md")]: {
						top: 90,
					},
				}),
			});
		},
	});

	const form = useForm({
		initialValues: {
			crowdfundingProjectId: id,
			email: "",
			anonymous: true,
			amount: 10,
			// rewards: ["154"],
		},
		validate: {
			email: (value, values) => {
				if (values?.anonymous) {
					return;
				}

				return isEmail("Некорректный E-mail")(value);
			},
			amount: isNotEmpty("Введите сумму!"),
		},
	});

	const handleAmountUpdate = (value: number) => {
		const amount = value + +form.values.amount;

		form.setFieldValue("amount", amount);
	};

	useEffect(() => {
		if (currentUser) {
			// @ts-ignore
			form.setFieldValue("email", currentUser?.user?.email ?? "");
		}
	}, [currentUser]);

	return (
		<>
			<Stack gap={16}>
				<Paper
					component={"article"}
					shadow={"xl"}
					sx={{
						overflow: "hidden",
					}}
				>
					<Link href={slug} title={title}>
						<Box sx={{ overflow: "hidden" }}>
							<Image
								unoptimized
								src={image}
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
						</Box>
					</Link>
				</Paper>

				<Stack>
					<Link href={slug} title={title}>
						<Title
							order={3}
							sx={(theme, fn) => ({
								color: theme.colors.brand?.[4],
								fontSize: 20,
								lineHeight: "22px",
								[fn.largerThan("md")]: {
									fontSize: 22,
									lineHeight: "24px",
								},
							})}
						>
							{title}
						</Title>
					</Link>

					<Text span sx={() => ({ minHeight: 50 })} lineClamp={4}>
						{description}
					</Text>
				</Stack>

				<Button onClick={setIsOpened.bind(null, true)}>Пожертвовать</Button>
			</Stack>

			<Modal
				centered
				opened={isOpened}
				onClose={setIsOpened.bind(null, false)}
				title={<Title order={4}>Сделать пожертвование для {title}</Title>}
			>
				<Box component={"form"} onSubmit={form.onSubmit(makeCrowdfundingOrder)}>
					<Input type={"hidden"} {...form.getInputProps("crowdfundingProjectId")} />

					<Stack>
						<NumberInput
							min={1}
							step={10}
							leftSection={<IconCurrencyRubel stroke={1} size={16} />}
							label={"Сумма"}
							placeholder={"Введите сумму"}
							withAsterisk
							{...form.getInputProps("amount")}
						/>

						<Button.Group>
							<Button
								variant="default"
								sx={() => ({ flex: 1 })}
								leftSection={<IconPlus stroke={1} size={16} />}
								onClick={handleAmountUpdate.bind(null, 50)}
							>
								{50}
							</Button>

							<Button
								variant="default"
								sx={() => ({ flex: 1 })}
								leftSection={<IconPlus stroke={1} size={16} />}
								onClick={handleAmountUpdate.bind(null, 100)}
							>
								{100}
							</Button>

							<Button
								variant="default"
								sx={() => ({ flex: 1 })}
								leftSection={<IconPlus stroke={1} size={16} />}
								onClick={handleAmountUpdate.bind(null, 500)}
							>
								{500}
							</Button>
						</Button.Group>

						<TextInput
							disabled={form?.values?.anonymous}
							leftSection={<IconAt stroke={1} size={16} />}
							label={"Введите E-mail"}
							placeholder={"Введите E-mail для отправки копии записки"}
							withAsterisk={!form?.values?.anonymous}
							name={"email"}
							{...form.getInputProps("email")}
						/>

						<Checkbox
							label={"Анонимное пожертвование"}
							{...form.getInputProps("anonymous", { type: "checkbox" })}
						/>

						<Button
							fullWidth
							type="submit"
							disabled={crowdfundingOrderLoading}
							loading={crowdfundingOrderLoading}
						>
							Пожертвовать
						</Button>
					</Stack>
				</Box>
			</Modal>
		</>
	);
};

export default CrowdfundingCard;
