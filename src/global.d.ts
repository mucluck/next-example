declare global {
	type Article = {
		title_full: string;
		title_short: string;
		issued_at: string;
		image?: Record<string, unknown>;
		type?: string;
		slug: string;
		teaser: string;
		category: {
			slug: string;
			title_full: string;
		};
		main_image: {
			src: string;
		};
	};

	type News = {
		title_full: string;
		title_short: string;
		issued_at: string;
		image?: Record<string, unknown>;
		type?: string;
		slug: string;
		teaser: string;
		category: {
			slug: string;
			title_full: string;
		};
		main_image: {
			src: string;
		};
	};

	type Breadcrumb = {
		title: string;
		href?: string;
	};

	type Banner = {
		title: string;
		link: string;
		params: {
			enabled: boolean;
			image: {
				src: string;
			};
			image_tablet: {
				src: string;
			};
			mobile_image: {
				src: string;
			};
			locations: 'mainPage' | 'orAnother';
			type: 'string';
		};
	};

	type MenuItem = {
		url?: string;
		icon?: string;
		title: string;
	};

	type Ikon = {
		slug: string;
		main_image: {
			src: string;
		};
		id?: string;
		image?: {
			src: string;
		};
		title?: string;
		title_full?: string;
		title_short?: string;
		main_image_preview?: {
			src: string;
		};
		saints: Array<Record<string, unknown>>;
	};

	type Saint = {
		slug: string;
		main_image_preview: {
			src: string;
		};
		main_image: {
			src: string;
		};
		title: string;
		ikons: Array<{
			ikon: Ikon;
		}>;
		rank: {
			short_name: string;
		};
	};

	type Gospel = {
		rus?: string;
		church?: string;
	};

	type Audio = Record<string, unknown>;

	type SourceGospels = Array<{
		text: Record<string, any>;
		kind: string;
	}>;

	type Gospels = Array<{
		kind: string;
		book: Record<string, unknown>;
		text: Gospel;
		audios: Array<Audio>;
	}>;

	type DayPageProps = {
		data: {
			saints: Array<{ saint: Saint }>;
			gospels: SourceGospels;
			parables: Array<{ text: string; title: string }>;
			name: string;
			week: {
				title: string;
			};
			date: string;
			new_date_style: string;
			old_date_style: string;
		};
	};

	type MediaItem = {
		id: string;
		src: string;
		title: string;
		video_src?: string;
	};
}

export {};
