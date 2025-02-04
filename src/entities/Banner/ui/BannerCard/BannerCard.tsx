import { Paper } from "@mantine/core";
import Image from "next/image";

import Link from "next/link";

const BannerCard = ({ href, title, params }: Omit<Banner, "link"> & { href: string }) => {
	return (
		<Paper
			component={"article"}
			sx={{ overflow: "hidden" }}
		>
			<Link href={href} title={title} style={{ display: 'flex' }}>
				<picture style={{ width: "100%" }}>
					<source srcSet={params?.mobile_image?.src} media="(max-width: 720px)" />
					<source srcSet={params?.image_tablet?.src} media="(max-width: 1200px)" />

					<Image
						unoptimized
						src={params?.image?.src}
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
				</picture>
			</Link>
		</Paper>
	);
};

export default BannerCard;

if (process.env.NODE_ENV === "development") {
	BannerCard.displayName = "BannerCard";
}
