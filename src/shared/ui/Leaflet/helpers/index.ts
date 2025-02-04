// @ts-nocheck

import get from "lodash/get";
import compact from "lodash/compact";

export function formatURL(path = "", siteUrl = "") {
	if (path) {
		return `${siteUrl}/${compact(path.split("/")).join("/")}`; // TODO: Need to fix RegExp
	}

	return null;
}


export const makeUrl = {
	allArticlesBySlug({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["articles", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	allNewsBySlug({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["news", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	audioGuideCategory({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["media", "audioguides", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	belltower(entity, siteUrl) {
		if (entity) {
			const { slug, city, monastery } = entity;
			const path = compact([get(city, "slug", ""), get(monastery, "slug", ""), slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	book({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["media", "books", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	broadcast({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["broadcast", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	cathedral(entity, siteUrl) {
		if (entity) {
			const { slug, city, monastery } = entity;
			const path = compact([get(city, "slug", ""), get(monastery, "slug", ""), slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	chapel(entity, siteUrl) {
		if (entity) {
			const { slug, city, monastery } = entity;
			const path = compact([get(city, "slug", ""), get(monastery, "slug", ""), slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	church(entity, siteUrl) {
		if (entity) {
			const { slug, city, monastery } = entity;
			const path = compact([get(city, "slug", ""), get(monastery, "slug", ""), slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	city({ slug }, siteUrl) {
		if (slug) {
			return formatURL(`/${slug}/`, siteUrl);
		}

		return null;
	},

	cityObject({ slug, city }, siteUrl) {
		if (slug && city) {
			const path = compact([get(city, "slug", ""), slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	cityObjects({ slug }, siteUrl) {
		if (slug) {
			const path = compact([slug, "city-objects"]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	contentNews(entity, siteUrl) {
		if (entity) {
			const pathByType = {
				belltower: this.belltower(entity),
				city: this.city(entity),
				cathedral: this.cathedral(entity),
				church: this.church(entity),
				chapel: this.chapel(entity),
				city_object: this.cityObject(entity),
				hermitage: this.hermitage(entity),
				monastery: this.monastery(entity),
				museum: this.museum(entity),
				temple: this.temple(entity),
				well: this.well(entity),
			};
			const path = compact([pathByType[entity.type], "news"]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	contentShrines(entity, siteUrl) {
		if (entity) {
			const path = compact([this.shrine(entity), "shrines"]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	day(entity, siteUrl) {
		if (entity) {
			const { currentDay, type } = entity;
			const path = `${type}/${currentDay}`;

			return formatURL(path, siteUrl);
		}

		return null;
	},

	hermitage(entity, siteUrl) {
		if (entity) {
			const { slug, city, monastery } = entity;
			if (slug) {
				const path = compact([get(city, "slug", ""), get(monastery, "slug", ""), slug]).join("/");

				return formatURL(path, siteUrl);
			}
		}

		return null;
	},

	holiday({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["holiday", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	holyPlaces({ slug }, siteUrl) {
		if (slug) {
			const path = compact([slug, "holy-places"]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	ikon({ slug, type }, siteUrl) {
		if (slug && type) {
			const path = compact([type, slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	mediaAudio({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["media", "audios", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	mediaAudioguide({ slug, audio_category }, siteUrl) {
		const categorySlug = get(audio_category, "slug", "");
		if (slug) {
			const path = compact(["media", "audioguides", categorySlug, slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	mediaArticle({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["articles", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	mediaArticles({ slug }, siteUrl) {
		if (slug) {
			const path = compact([slug, "articles"]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	mediaBook({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["library", slug]).join("/"); // media_book => library

			return formatURL(path, siteUrl);
		}

		return null;
	},

	mediaPeriodic({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["media", "periodics", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	mediaPhoto({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["media", "photos", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	monastery({ slug, city }, siteUrl) {
		if (slug && city) {
			const path = compact([get(city, "slug", ""), slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	museum({ slug, city }, siteUrl) {
		if (slug && city) {
			const path = compact([get(city, "slug", ""), slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	museums({ slug }, siteUrl) {
		if (slug) {
			const path = compact([slug, "museums"]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	news(entity, siteUrl) {
		if (entity) {
			const { slug, category } = entity;
			const path = compact(["news", get(category, "slug", ""), slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	post(entity, siteUrl) {
		if (entity) {
			const { slug, type } = entity;
			if (slug && type) {
				const path = compact([type, slug]).join("/");

				return formatURL(path, siteUrl);
			}
		}

		return null;
	},

	radio(entity, siteUrl) {
		if (entity) {
			const { slug, type } = entity;
			const path = compact(["media", type, slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	saint(entity, siteUrl) {
		if (entity) {
			const { type, slug } = entity;
			const path = compact([type, slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	saint_book({ slug }, siteUrl) {
		if (slug) {
			const path = compact([slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	shrine(entity, siteUrl) {
		if (entity) {
			const { slug, city, monastery } = entity;
			const path = compact([get(city, "slug", ""), get(monastery, "slug", ""), slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	radioRecord(entity, siteUrl) {
		if (entity) {
			const { slug } = entity;
			const path = compact(["media", "radio-records", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	temple(entity, siteUrl) {
		if (entity) {
			const { slug, city, monastery } = entity;
			const path = compact([get(city, "slug", ""), get(monastery, "slug", ""), slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	textPage(entity, siteUrl) {
		if (entity) {
			const { slug, template } = entity;
			const path = {
				Default: compact(["pages", slug]).join("/"),
			};

			return formatURL(path[template] || path.Default, siteUrl);
		}

		return null;
	},

	tour({ slug }, siteUrl) {
		if (slug) {
			const path = `tours/${slug}`;

			return formatURL(path, siteUrl);
		}

		return null;
	},

	tv_obraz({ slug }, siteUrl) {
		if (slug) {
			const path = ["media", "tv_obraz", slug].join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	video({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["media", "videos", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	virtualTour({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["media", "3d-tours", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	voting({ slug }, siteUrl) {
		if (slug) {
			const path = compact(["votings", slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},

	well(entity, siteUrl) {
		if (entity) {
			const { slug, city, monastery } = entity;
			const path = compact([get(city, "slug", ""), get(monastery, "slug", ""), slug]).join("/");

			return formatURL(path, siteUrl);
		}

		return null;
	},
};
