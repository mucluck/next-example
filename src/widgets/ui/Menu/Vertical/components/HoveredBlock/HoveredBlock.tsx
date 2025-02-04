import { Group, Text, Flex } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import cx from "classnames";

import { useVerticalMenu } from "../../context/context";
import { ReactElement } from "react";

type THoveredBlock = {
	id: string;
	icon: ReactElement;
	title: string;
	isActive: boolean;
	onClick: VoidFunction;
}

const HoveredBlock = ({ id, icon, title, isActive, onClick }: THoveredBlock) => {
	const { menu } = useVerticalMenu();

	const isCurrent = id === menu?.id;

	return (
		<Group
			title={title}
			gap={8}
			wrap={"nowrap"}
			py={8}
			px={28}
			onClick={onClick}
			className={cx({ current: isCurrent })}
			sx={(theme) => ({
				whiteSpace: "nowrap",
				cursor: "pointer",
				transition: `background-color .3s ease`,
				color: theme.colors.brand?.[4],
				"&:hover": {
					backgroundColor: theme.colors.brand?.[5],
					color: theme.colors.brand?.[9],
				},
				"&.current": {
					backgroundColor: theme.colors.brand?.[4],
					color: theme.colors.brand?.[9],
				}
			})}
			style={{ width: "100%" }}
			justify={"start"}
		>
			<Text
				span
				c={"currentColor"}
				sx={{
					display: "flex",
					transition: "color .3s ease",
				}}
			>
				{icon}
			</Text>

			<Flex
				justify={"space-between"}
				align={"center"}
				sx={() => ({
					flex: "1 !important",
					transition: "opacity .3s ease",
					opacity: +isActive
				})}
			>
				<Text
					span
					c={"currentColor"}
					lh={"24px"}
					sx={(theme) => ({
						transition: "color .3s ease",
						color: theme.colors.brand?.[4],
					})}
				>
					{title}
				</Text>

				<Text
					span
					c={"currentColor"}
					mr={"-10%"}
					sx={{
						display: "flex",
						transition: "color .3s ease",
					}}
				>
					<IconChevronRight stroke={1.5} />
				</Text>
			</Flex>
		</Group>
	);
};

export default HoveredBlock;

if (process.env.NODE_ENV === "development") {
	HoveredBlock.displayName = "HoveredBlock";
}
