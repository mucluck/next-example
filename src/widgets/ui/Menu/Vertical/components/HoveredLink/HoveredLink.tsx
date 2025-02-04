import { ReactElement } from "react";
import { Group, Text } from "@mantine/core";
import Link from "next/link";

type THoveredLink = {
	url: string;
	title: string;
	icon: ReactElement;
	isOpen: boolean;
}

const HoveredLink = ({ url, title, icon, isOpen }: THoveredLink) => {
	return (
		<Group
			// @ts-ignore
			href={url}
			component={Link}
			title={title}
			gap={8}
			wrap={"nowrap"}
			py={8}
			px={28}
			sx={(theme) => ({
				whiteSpace: "nowrap",
				transition: `background-color.3s ease`,
				color: theme.colors.brand?.[4],
				"&:hover": {
					backgroundColor: theme.colors.brand?.[5],
					color: theme.colors.brand?.[9]
				},
			})}
			style={{ width: "100%" }}
			itemScope
			itemType="https://schema.org/SiteNavigationElement"
		>
			{
				icon && (
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
				)
			}

			<Text
				span
				c={"currentColor"}
				lh={"24px"}
				sx={{
					transition: "color .3s ease, opacity .3s ease",
					textDecoration: "none !important",
					opacity: +isOpen
				}}
			>
				{title}
			</Text>
		</Group>
	);
}

export default HoveredLink;

if (process.env.NODE_ENV === 'development') {
	HoveredLink.displayName = "HoveredLink";
}
