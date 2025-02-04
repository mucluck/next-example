import { Button, Menu, Avatar, Group, Slider, ActionIcon, Indicator } from "@mantine/core";
import {
	IconBuildingBroadcastTower,
	IconPlayerPlay,
	IconPlayerPause,
	IconVolume,
	IconVolumeOff,
} from "@tabler/icons-react";
import { isIOS } from "react-device-detect";

import { useRadio } from ".";

const Radio = ({ size = 24 }: { size?: number }) => {
	const { radio, volume, current, handlePlay, handleVolume, handleMute, mute }: any = useRadio();

	const currentId = current?.id;

	return (
		<Menu
			withinPortal
			withArrow
			closeOnItemClick={false}
			shadow={"md"}
			transitionProps={{ transition: "rotate-left", duration: 150 }}
		>
			<Menu.Target>
				<Button
					title={"Онлайн-радио"}
					aria-label={"radio"}
					variant={"subtle"}
					px={8}
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
						withBorder
						processing
						color={"red"}
						styles={() => ({
							indicator: {
								zIndex: 9,
								transform: "translate(0px, 0px) !important",
							},
							processing: {
								zIndex: 9,
								transform: "translate(0px, 0px) !important",
							},
						})}
						disabled={!currentId}
					>
						{currentId && <Avatar size={32} src={current?.image?.src} alt={current?.title} hiddenFrom={"md"} />}
						{currentId && <Avatar size={24} src={current?.image?.src} alt={current?.title} visibleFrom={"md"} />}
						{!currentId && <IconBuildingBroadcastTower stroke={1} size={size} />}
					</Indicator>
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Радиостанции</Menu.Label>

				<Menu.Divider />

				{
					radio.map(({ id, title, source, main_image, main_image_preview }: any) => {
						const image = { ...main_image_preview, ...main_image };
						const isPLay = id === current?.id;

						return (
							<Menu.Item
								id={id}
								key={source}
								leftSection={<Avatar src={image.src} alt={title} />}
								onClick={handlePlay.bind(null, { id, source, image })}
								title={`${isPLay ? "Остановить" : "Воспроизвести"} ${title}`}
							>
								<Group gap={16} justify={"space-between"}>
									{title}

									{isPLay && <IconPlayerPause stroke={1} size={16} />}
									{!isPLay && <IconPlayerPlay stroke={1} size={16} />}
								</Group>
							</Menu.Item>
						);
					})
				}
				{
					!radio.length && (
						<Menu.Label>
							Нет станций
						</Menu.Label>
					)
				}

				{
					!!radio.length && !isIOS && <Menu.Divider />
				}

				{
					!!radio.length && !isIOS && (
						<Menu.Label>
							<Group gap={8} justify={"space-between"}>
								<ActionIcon
									variant="default"
									onClick={handleMute.bind(null, !mute)}
									title={mute ? "Включить звук" : "Выключить звук"}
								>
									{mute && <IconVolumeOff stroke={1} size={16} />}
									{!mute && <IconVolume stroke={1} size={16} />}
								</ActionIcon>

								<Slider
									title={mute ? "" : `Уровень громкости: ${volume}`}
									value={volume}
									onChange={handleVolume}
									size={"xs"}
									style={{ flex: 1 }}
									disabled={mute}
								/>
							</Group>
						</Menu.Label>
					)
				}
			</Menu.Dropdown>
		</Menu>
	);
};

export default Radio;
