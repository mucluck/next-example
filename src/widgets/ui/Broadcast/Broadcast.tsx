import { Indicator, Button, Menu, Group, ThemeIcon } from "@mantine/core";
import { IconCast } from "@tabler/icons-react";
import { useRouter } from "next/router";

import { useBroadcast } from ".";

const Broadcast = ({ size = 24 }: { size?: number }) => {
	const router = useRouter();
	const { isEnabled } = useBroadcast();

	return (
		<Menu withinPortal withArrow shadow={"md"} transitionProps={{ transition: "rotate-left", duration: 150 }}>
			<Menu.Target>
				<Button
					aria-label={"broadcast"}
					variant={"subtle"}
					px={8}
					title={"Онлайн-трансляция"}
					styles={(theme) => ({
						root: {
							"&:hover": {
								color: theme.colors.brand?.[9],
								backgroundColor: theme.colors.brand?.[4],
							},
						},
						label: {
							overflow: "visible",
						},
					})}
				>
					<Indicator
						inline
						disabled={!isEnabled}
						processing
						withBorder
						color={"red"}
						styles={() => ({
							indicator: {
								transform: "translate(0px, 0px) !important",
							},
							processing: {
								transform: "translate(0px, 0px) !important",
							},
						})}
					>
						<IconCast stroke={1} size={size} />
					</Indicator>
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Онлайн-трансляция</Menu.Label>

				<Menu.Divider />

				<Menu.Item
					// icon={<IconWallet stroke={1} size={20} />}
					onClick={() => router.push("/broadcast")}
				>
					<Group gap={8}>
						{/* @ts-ignore */}
						{isEnabled && <ThemeIcon color="red" radius="xl" size={8} />}
						Собор Александра Невского
					</Group>
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default Broadcast;
