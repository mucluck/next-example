import config from "@/shared/config";

const canonical = config.canonical;
const cyrillic = config.cyrillic;

type Image = { src: string };
type SEO = {
	config: {
		html: {
			title: string,
			description: string,
			noindex: string,
			keywords: string
		},
		og: {
			title: string
			description: string
			image: Image
			site_name: string
		}
	},
	title: string,
	body: string,
	image: Image,
	slug: string
}

const SEO = ({ config, title, body, image, slug }: SEO) => {
	const OGTitle = config?.og?.title || title || "";
	const OGDescription = config?.og?.description || "";
	const OGImage = config?.og?.image?.src || image?.src || "https://storage.yandexcloud.net/uploads/content/2020/02/06/4288d97f-7963-4fba-a55c-de6d3a56aa88.png";

	const siteName = config?.og?.site_name;
	const description = config?.html?.description;
	const noindex = config?.html?.noindex;
	const keywords = config?.html?.keywords;

	const meta = [
		{
			name: "description",
			content: description,
		},
		// {
		// 	name: "viewport",
		// 	content: getSeoConfig(entity, "seo.html.viewport", "width=device-width, initial-scale=1.0"),
		// },
		{
			name: "og:type",
			content: "website",
		},
		{
			property: "og:title",
			content: OGTitle,
		},
		{
			property: "og:image",
			content: OGImage,
		},
		{
			property: "og:image:width",
			content: "1200",
		},
		{
			property: "og:image:height",
			content: "630",
		},
		// {
		// 	name: "twitter:title",
		// 	content: get(entity, "seo.og.title", "") || title,
		// },
		// {
		// 	name: "twitter:image",
		// 	content: ogImage,
		// },
		// {
		// 	name: "twitter:card",
		// 	content: "summary_large_image",
		// },
		{
			property: "og:image:alt",
			content: OGTitle,
		},
		{
			property: "og:description",
			content: OGDescription || description,
		},
		{
			property: "og:site_name",
			content: siteName,
		},
		{
			property: "og:url",
			content: cyrillic, // TODO: Add siteMetadata
		},
	];

	if (noindex) {
		meta.push({
			property: "robots",
			content: noindex,
		});
	}

	if (keywords) {
		meta.push({
			name: "keywords",
			content: keywords,
		});
	}

	if (slug === "spaso-preobrazhenskij-monastyr") {
		meta.push({
			property: "og:image:width",
			content: "400",
		});
	}

	return (
		<>
			<link rel="canonical" href={canonical}></link>

			{meta.map(({ property, content, name }) => {
				if (name) {
					return (
						<meta key={name} name={name} content={content} />
					)
				}

				return (
					<meta key={property} property={property} content={content} />
				)
			})}
		</>
	);
}

export default SEO;
