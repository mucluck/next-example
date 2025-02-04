import { Box, Stack, Text } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

import { Slider } from "@/widgets/ui";
import { IkonCard } from "@/entities/Ikon/ui";

import ikonPlug from "@/entities/Ikon/ui/IkonCard/assets/iconPlug.webp";

const SaintCard = ({ main_image, title, slug, ikons, variant = "default" }: Saint & { variant: string }) => {
	// NOTE: Need for icon plug
	const icos = ikons.length ? ikons : [{ ikon: { main_image: { src: ikonPlug.src }, title: "Икона", slug } }];

	return (
		// TODO: Need to implements ikons gallery
		<Box component={"article"} itemScope itemType={"https://schema.org/Article"}>
			<Stack gap={8}>
				{variant === "gallery" && (
					<Slider<Ikon>
						dots
						origin={"auto"}
						// @ts-ignore
						items={icos.map(({ ikon }) => ({ ...ikon }))}
						perView={1}
						renderItem={({ image, main_image }) => {
							return (
								<IkonCard
									main_image={image ?? main_image}
									slug={slug} // TODO: fix url to saint
								/>
							);
						}}
						gap={8}
						breakpoints={{
							"(min-width: 768px)": {
								// @ts-ignore
								dots: false,
								arrows: true,
							},
						}}
					/>
				)}

				{variant === "default" && (
					<Image
						unoptimized
						src={main_image?.src}
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
				)}

				<Link href={`/saints/${slug}`} title={title} style={{ textAlign: "center" }}>
					{!!title && (
						<Text
							span
							sx={(theme) => ({
								fontSize: 14,
								lineHeight: "16px",
								color: theme.colors.gold[4]
							})}
						>
							{title}
						</Text>
					)}
				</Link>
			</Stack>
		</Box>
	);
};

export default SaintCard;

if (process.env.NODE_ENV === "development") {
	SaintCard.displayName = "SaintCard";
}
