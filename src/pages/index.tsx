import type { GetStaticProps } from "next";
import { Space } from "@mantine/core";

import { Masonry } from "@/shared/ui";
import { ArticleCard } from "@/entities/Article/ui";
import { NewsCard } from "@/entities/News/ui";
import { BannerCard } from "@/entities/Banner/ui";
import { client } from "@/shared/graphql/client";

// @ts-ignore
import { MAIN_PAGE } from "@/shared/graphql/queries/main/queries.graphql";

const HomePage = ({ data }: { data: { main_content: Array<Record<string, unknown>>; banners: Array<Banner> } }) => {
	const { main_content = [], banners = [] } = data;

	return (
		<>
			{banners.map(({ link, title, params }) => {
				return <BannerCard key={link} href={link} title={title} params={params} />;
			})}

			<Space h={{ base: 8, md: 16 }} />

			<Masonry<Article | News>
				items={main_content as Array<Article | News>}
				renderItem={(
					{ title_full, title_short, issued_at, image, category, type, slug, teaser, main_image },
					idx
				) => {
					if (type === "media_article") {
						return (
							<ArticleCard
								key={`${type}-${slug}-${idx}`}
								slug={slug}
								title_full={title_full}
								title_short={title_short}
								issued_at={issued_at}
								image={image}
								category={category}
								teaser={teaser}
								main_image={main_image}
							/>
						);
					}

					if (type === "news") {
						return (
							// @ts-ignore
							<NewsCard
								key={`${type}-${slug}`}
								slug={slug}
								title_full={title_full}
								title_short={title_short}
								issued_at={issued_at}
								image={image}
								category={category}
								teaser={teaser}
								main_image={main_image}
							/>
						);
					}

					return <></>;
				}}
			/>
		</>
	);
};

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async () => {
	const mainPageData = await client.query({
		query: MAIN_PAGE,
	});

	const { layout = [{}], ...data } = mainPageData?.data;

	return {
		props: {
			layout: {
				...layout?.[0],
				title: "",
				isMain: true,
			},
			data,
		},
	};
};

export default HomePage;
