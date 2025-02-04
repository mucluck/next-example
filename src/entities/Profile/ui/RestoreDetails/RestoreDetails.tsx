import { SimpleGrid, Box, Stack, TextInput, Button } from "@mantine/core";
import { IconUser, IconRestore, IconExclamationCircle, IconCircleCheck } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useForm, isNotEmpty } from "@mantine/form";

import { useRestorePassword } from "@/widgets/ui/Profile/provider";

const RestoreDetails = () => {
	const { loading, run } = useRestorePassword({
		manual: true,
		onSuccess: (data: any) => {
			if (+data.status === 200) {
				notifications.show({
					title: "Успех!",
					message: "Данные о восстановлении пароля высланы на указанный E-mail/Телефон.",
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

				return;
			}

			if (+data.status === 404) {
				notifications.show({
					title: "Ошибка!",
					message: "Пользователь не найден.",
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

				return;
			}

			if (+data.status === 400) {
				notifications.show({
					title: "Ошибка!",
					message: "Некорректный логин.",
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

				return;
			}

			notifications.show({
				title: "Ошибка восстановления!",
				message: "Повторите попытку позднее.",
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
		onError: (error: Error) => {
			notifications.show({
				title: "Ошибка восстановления!",
				message: "Повторие попытку позднее.",
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

			console.error("useRestorePassword", error);
		},
	});

	const form = useForm({
		initialValues: {
			login: "",
		},
		validate: {
			login: isNotEmpty("Введите E-mail или телефон!"),
		},
	});


	return (
		<SimpleGrid
			cols={{ base: 1, md: 4 }}
		>
			<Box component={"form"} onSubmit={form.onSubmit(run)}>
				<Stack>
					<TextInput
						leftSection={<IconUser stroke={1} size={16} />}
						label={"Введите E-mail или телефон"}
						placeholder={"E-mail или телефон"}
						withAsterisk
						name={"login"}
						{...form.getInputProps("login")}
						disabled={loading}
					/>

					<Button
						fullWidth
						type="submit"
						disabled={loading}
						loading={loading}
						leftSection={<IconRestore stroke={1} size={16} />}
					>
						Восстановить
					</Button>
				</Stack>
			</Box>
		</SimpleGrid>
	);
}

export default RestoreDetails;
