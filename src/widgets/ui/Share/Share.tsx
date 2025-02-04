import { useEffect, useState } from "react";
import { Button, Menu } from "@mantine/core";
import { OKShareButton, VKShareButton, TelegramShareButton } from "react-share";
import { IconShare3, IconBrandVk, IconBrandTelegram, IconAccessible, IconCopy } from "@tabler/icons-react";
import { useClipboard } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

const Share = ({ href, title, image }: { href: string; title: string; image?: string }) => {
	const clipboard = useClipboard({ timeout: 500 });

	const [origin, setOrigin] = useState("");

	useEffect(() => {
		if (clipboard.copied) {
			notifications.show({
				title: "Скопировано.",
				message: "Ссылка скопирована в буфер обмена.",
				color: "green",
				icon: <IconCopy />,
				withBorder: true,
				sx: (_, fn) => ({
					top: 60,
					[fn.largerThan("md")]: {
						top: 90,
					},
				}),
			});
		}
	}, [clipboard]);

	useEffect(() => {
		if (window) {
			// @ts-ignore
			setOrigin(window?.location?.origin);
		}
	}, []);

	const url = `${origin}${href}`;

	return (
		<Menu withinPortal withArrow trigger="hover">
			<Menu.Target>
				<Button
					variant={"white"}
					radius={"xs"}
					size={"xs"}
					rightSection={<IconShare3 height={20} />}
					styles={() => ({
						root: {
							paddingRight: 0,
							paddingLeft: 0,
						},
						rightIcon: {
							marginLeft: 4,
						},
					})}
				>
					поделиться
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Item>
					<VKShareButton url={url} title={title} image={image}>
						<IconBrandVk color={"#0177ff"} />
					</VKShareButton>
				</Menu.Item>

				<Menu.Item>
					<TelegramShareButton url={url} title={title}>
						<IconBrandTelegram color={"#249fdb"} />
					</TelegramShareButton>
				</Menu.Item>

				<Menu.Item>
					<OKShareButton url={url} title={title} image={image}>
						<IconAccessible color={"#f70"} />
					</OKShareButton>
				</Menu.Item>

				<Menu.Item onClick={() => clipboard.copy(url)}>
					<IconCopy color={"gold"} />
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default Share;
