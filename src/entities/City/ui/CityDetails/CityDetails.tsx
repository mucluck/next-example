// @ts-nocheck

import { useMemo } from 'react';
import { ArticleCard } from '@/entities/Article/ui';
import { NewsCard } from '@/entities/News/ui';
import { ContentBlock, ContentCard, Section, Weather } from '@/shared/ui';
import { Share, Slider } from '@/widgets/ui';
import { Flex, Paper, Stack } from '@mantine/core';
import moment from 'moment';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

moment.locale('ru');

const types = {
	radio_record: 'radio-records',
	audio_guides: 'audioguides',
	newsPhotos: 'photos',
	mediaArticlesPhotos: 'photos',
	media_video: 'videos',
	virtual_tour: '3d-tours',
};

const CityDetails = ({ data }: any) => {
	const router = useRouter();

	const citySlug = data.slug;

	const sections = data?.sections ?? [];
	const cathedrals = data?.cathedrals ?? [];
	const chapels = data?.chapels ?? [];
	const churches = data?.churches ?? [];
	const objects = data?.objects ?? [];
	const projects = data?.projects ?? [];
	const museums = data?.museums ?? [];
	const temples = data?.temples ?? [];
	const tours = data?.tours.map(({ tour }) => tour) ?? [];
	const wells = data?.wells ?? [];
	const belltowers = data?.belltowers ?? [];
	const monasteries = data?.monasteries ?? [];
	const news = data?.news.map(({ news }) => news) ?? [];
	const articles = data?.articles.map(({ article }) => article) ?? [];
	const audios = data?.audios ?? [];
	const books = data?.books ?? [];
	const periodics = data?.periodics ?? [];
	const photos = data?.photos ?? [];
	const videos = data?.videos ?? [];

	const holyPlaces = [...cathedrals, ...chapels, ...churches, ...projects, ...temples, ...wells, ...belltowers, ...monasteries];

	const HolyPlaces = useMemo(() => {
		if (!holyPlaces.length) {
			return null;
		}

		return (
			<Section
				title={'Святые места'}
			>
				<Slider<Ikon>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
								spacing: 16,
								perView: 4,
							},
						},
					}}
					dots
					items={holyPlaces}
					origin={'auto'}
					perView={1}
					renderItem={({
						image,
						main_image,
						main_image_preview,
						title_full,
						type = '',
						category = {},
						slug,
					}: any) => {
						const img = {
							...image,
							...main_image,
							...main_image_preview,
						};
						// @ts-ignore
						const link = `/${citySlug}/${type}s/${slug}`;

						return <ContentCard
							image={img} link={link}
							title={title_full} type={type} />;
					}}
					spacing={8}
				/>
			</Section>
		)
	}, [holyPlaces])

	const Museums = useMemo(() => {
		if (!museums.length) {
			return null;
		}

		return (
			<Section
				title={'Музеи'}
			// extra={
			// 	<Link href={extra?.link} title={extra?.title}>
			// 		{extra?.title}
			// 	</Link>
			// }
			>
				<Slider<Ikon>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
								spacing: 16,
								perView: 4,
							},
						},
					}}
					dots
					items={museums}
					origin={'auto'}
					perView={1}
					renderItem={({
						main_image,
						main_image_preview,
						title_full,
						type = '',
						slug,
					}: any) => {
						const img = Object.assign({}, main_image, main_image_preview);

						return (
							<ContentCard
								image={img}
								link={`/${citySlug}/museums/${slug}`}
								title={title_full}
								type={type}
							/>
						)
					}}
					spacing={8}
				/>
			</Section>
		)
	}, [museums]);

	const Objects = useMemo(() => {
		if (!objects.length) {
			return null;
		}

		return (
			<Section
				title={'Достопримечательности'}
			// extra={
			// 	<Link href={extra?.link} title={extra?.title}>
			// 		{extra?.title}
			// 	</Link>
			// }
			>
				<Slider<Ikon>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
								spacing: 16,
								perView: 4,
							},
						},
					}}
					dots
					items={objects}
					origin={'auto'}
					perView={1}
					renderItem={({
						main_image,
						main_image_preview,
						title_full,
						type = '',
						slug,
					}: any) => {
						const img = Object.assign({}, main_image, main_image_preview);

						return (
							<ContentCard
								image={img}
								link={`/${citySlug}/objects/${slug}`}
								title={title_full}
								type={type}
							/>
						)
					}}
					spacing={8}
				/>
			</Section>
		)
	}, [objects]);

	const Tours = useMemo(() => {
		if (!tours.length) {
			return null;
		}

		return (
			<Section
				title={'Виртуальные экскурсии'}
			// extra={
			// 	<Link href={extra?.link} title={extra?.title}>
			// 		{extra?.title}
			// 	</Link>
			// }
			>
				<Slider<Ikon>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
								spacing: 16,
								perView: 4,
							},
						},
					}}
					dots
					items={tours}
					origin={'auto'}
					perView={1}
					renderItem={({
						main_image,
						main_image_preview,
						title_full,
						type = '',
						slug,
					}: any) => {
						const img = Object.assign({}, main_image, main_image_preview);

						return (
							<ContentCard
								image={img}
								key={slug}
								link={`media/3d-tours/${slug}`}
								title={title_full}
								type={type}
							/>
						)
					}}
					spacing={8}
				/>
			</Section>
		)
	}, [tours]);

	const Articles = useMemo(() => {
		if (!articles.length) {
			return null;
		}

		return (
			<Section
				title={'Статьи'}
			// extra={
			// 	<Link href={extra?.link} title={extra?.title}>
			// 		{extra?.title}
			// 	</Link>
			// }
			>
				<Slider<Ikon>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
								spacing: 16,
								perView: 3,
							},
						},
					}}
					dots
					items={articles}
					origin={'auto'}
					perView={1}
					renderItem={({
						image,
						main_image,
						main_image_preview,
						title_full,
						title_short,
						category = {},
						slug,
						issued_at,
						teaser
					}: any) => {
						const img = Object.assign({}, main_image, main_image_preview);

						return (
							<ArticleCard.Linked
								category={category}
								issued_at={issued_at}
								main_image={img}
								slug={slug}
								teaser={teaser}
								title_full={title_full}
								title_short={title_short}
							/>
						)
					}}
					spacing={8}
				/>
			</Section>
		)
	}, [articles])

	const News = useMemo(() => {
		if (!news.length) {
			return null;
		}

		return (
			<Section
				title={'Новости'}
			// extra={
			// 	<Link href={extra?.link} title={extra?.title}>
			// 		{extra?.title}
			// 	</Link>
			// }
			>
				<Slider<Ikon>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
								spacing: 16,
								perView: 3,
							},
						},
					}}
					dots
					items={news}
					origin={'auto'}
					perView={1}
					renderItem={({
						main_image,
						main_image_preview,
						title_full,
						title_short,
						type = '',
						category = {},
						slug,
						teaser,
						issued_at
					}: any) => {
						const img = Object.assign({}, main_image, main_image_preview);

						return (
							<NewsCard.Linked
								category={category}
								issued_at={issued_at}
								main_image={img}
								slug={slug}
								teaser={teaser}
								title_full={title_full}
								title_short={title_short}
								type={type}
							/>
						)
					}}
					spacing={8}
				/>
			</Section>
		)
	}, [news]);

	const Audios = useMemo(() => {
		if (!audios.length) {
			return null;
		}

		return (
			<Section
				title={'Аудиогиды'}
			// extra={
			// 	<Link href={extra?.link} title={extra?.title}>
			// 		{extra?.title}
			// 	</Link>
			// }
			>
				<Slider<Ikon>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
								spacing: 16,
								perView: 4,
							},
						},
					}}
					dots
					items={audios}
					origin={'auto'}
					perView={1}
					renderItem={({
						image,
						main_image,
						main_image_preview,
						title_full,
						type = '',
						category = {},
						slug,
					}: any) => {
						const img = {
							...image,
							...main_image,
							...main_image_preview,
						};
						// @ts-ignore
						let link = `/media/audios/${slug}`;

						if (category.slug) {
							// @ts-ignore
							link = `/media/${types[type]}/${category.slug}/${slug}`;
						}

						return <ContentCard
							image={img} link={link}
							title={title_full} type={type} />;
					}}
					spacing={8}
				/>
			</Section>
		);
	}, [audios]);

	const Books = useMemo(() => {
		if (!books.length) {
			return null;
		}

		return (
			<Section
				title={'Книги'}
			// extra={
			// 	<Link href={extra?.link} title={extra?.title}>
			// 		{extra?.title}
			// 	</Link>
			// }
			>
				<Slider<Ikon>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
								spacing: 16,
								perView: 4,
							},
						},
					}}
					dots
					items={books}
					origin={'auto'}
					perView={1}
					renderItem={({
						image,
						main_image,
						main_image_preview,
						title_full,
						type = '',
						category = {},
						slug,
					}: any) => {
						const img = {
							...image,
							...main_image,
							...main_image_preview,
						};
						// @ts-ignore
						let link = `/media/${types[type]}/${slug}`;

						if (category.slug) {
							// @ts-ignore
							link = `/media/${types[type]}/${category.slug}/${slug}`;
						}

						return <ContentCard
							image={img} link={link}
							title={title_full} type={type} />;
					}}
					spacing={8}
				/>
			</Section>
		)
	}, [books]);

	const Periodics = useMemo(() => {
		if (!periodics.length) {
			return null;
		}

		return (
			<Section
				title={'Периодика'}
			// extra={
			// 	<Link href={extra?.link} title={extra?.title}>
			// 		{extra?.title}
			// 	</Link>
			// }
			>
				<Slider<Ikon>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
								spacing: 16,
								perView: 4,
							},
						},
					}}
					dots
					items={periodics}
					origin={'auto'}
					perView={1}
					renderItem={({
						image,
						main_image,
						main_image_preview,
						title_full,
						type = '',
						category = {},
						slug,
					}: any) => {
						const img = {
							...image,
							...main_image,
							...main_image_preview,
						};
						// @ts-ignore
						let link = `/media/${types[type]}/${slug}`;

						if (category.slug) {
							// @ts-ignore
							link = `/media/${types[type]}/${category.slug}/${slug}`;
						}

						return <ContentCard
							image={img} link={link}
							title={title_full} type={type} />;
					}}
					spacing={8}
				/>
			</Section>
		)
	}, [periodics]);

	const Photos = useMemo(() => {
		if (!photos.length) {
			return null;
		}

		return (
			<Section
				title={'Фото'}
			// extra={
			// 	<Link href={extra?.link} title={extra?.title}>
			// 		{extra?.title}
			// 	</Link>
			// }
			>
				<Slider<Ikon>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
								spacing: 16,
								perView: 4,
							},
						},
					}}
					dots
					items={photos}
					origin={'auto'}
					perView={1}
					renderItem={({
						image,
						main_image,
						main_image_preview,
						title_full,
						type = '',
						category = {},
						slug,
					}: any) => {
						const img = {
							...image,
							...main_image,
							...main_image_preview,
						};
						// @ts-ignore
						let link = `/media/${types[type]}/${slug}`;

						if (category.slug) {
							// @ts-ignore
							link = `/media/${types[type]}/${category.slug}/${slug}`;
						}

						return <ContentCard
							image={img} link={link}
							title={title_full} type={type} />;
					}}
					spacing={8}
				/>
			</Section>
		)
	}, [photos]);

	const Videos = useMemo(() => {
		if (!videos.length) {
			return null;
		}

		return (
			<Section
				title={'Видео'}
			// extra={
			// 	<Link href={extra?.link} title={extra?.title}>
			// 		{extra?.title}
			// 	</Link>
			// }
			>
				<Slider<Ikon>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
								spacing: 16,
								perView: 4,
							},
						},
					}}
					dots
					items={videos}
					origin={'auto'}
					perView={1}
					renderItem={({
						image,
						main_image,
						main_image_preview,
						title_full,
						type = '',
						category = {},
						slug,
					}: any) => {
						const img = {
							...image,
							...main_image,
							...main_image_preview,
						};
						// @ts-ignore
						let link = `/media/${types[type]}/${slug}`;

						if (category.slug) {
							// @ts-ignore
							link = `/media/${types[type]}/${category.slug}/${slug}`;
						}

						return <ContentCard
							image={img} link={link}
							title={title_full} type={type} />;
					}}
					spacing={8}
				/>
			</Section>
		)
	}, [videos]);

	return (
		<Stack gap={16}>
			{/* <Cover
				image={data?.main_image}
				title={data?.title_short ?? data?.title_full}
			/> */}

			<Flex justify={'end'}>
				<Weather slug={data.slug} weather={data.weather} />
			</Flex>

			<Stack gap={32}>
				{/* <Cover
					title={data?.title_short ?? data?.title_full}
					image={data?.main_image}
				/> */}

				<ContentBlock.List
					sections={sections}
				/>

				{
					citySlug === 'arzamas' && (
						<Paper sx={() => ({ overflow: 'hidden', height: 650 })}>
							<ReactPlayer
								controls
								height={'auto'}
								width={'100%'}
							/>
						</Paper>
					)
				}

				<Flex justify={'end'}>
					<Share
						href={router.asPath} image={data.main_image?.src}
						title={data.title_full}
					/>
				</Flex>

				{HolyPlaces}

				{Museums}

				{Objects}

				{Tours}

				{News}

				{Articles}

				{Audios}

				{Books}

				{Periodics}

				{Photos}

				{Videos}
			</Stack>
		</Stack>
	);
};

export default CityDetails;
