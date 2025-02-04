import { ArticleCard } from '@/entities/Article/ui';
import { NewsCard } from '@/entities/News/ui';
import { Contacts, ContentBlock, ContentCard, Leaflet, Section, Weather } from '@/shared/ui';
import { Share, Slider } from '@/widgets/ui';
import { Container, Flex, Group, Space, Stack, Text } from '@mantine/core';
import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ChapelDetails = ({ data }: any) => {
	const router = useRouter();

	const sections = data?.sections ?? [];
	const tours = data?.tours ?? [];
	const news = data?.news?.map(({ news }: any) => news) ?? [];
	const articles = data?.articles.map(({ media_article }: any) => media_article) ?? [];

	const address = data?.address;
	const phone = data?.telephone;
	const hours = data?.openning_hours;

	return (
		<>
			<Container>
				<Stack gap={16}>
					<Flex justify={'space-between'}>
						<Group gap={8}>
							<Link
								href={`/calendar/${moment(data?.created_at).format('YYYY-MM-DD')}`}
								title={`Перейти к ${moment(data?.created_at).locale('ru').format('DD.MM.YYYY')} в календаре`}
							>
								<Text c={'brand.4'} span>
									{moment(data?.created_at).locale('ru').format('LL')}
								</Text>
							</Link>
						</Group>

						<Group gap={8}>
							<Weather weather={data.city?.weather} />
						</Group>
					</Flex>

					<Stack gap={32}>
						{/* <Cover
							title={data?.title_short ?? data?.title_full}
							image={data?.main_image}
						/> */}

						<ContentBlock.List
							sections={sections}
						/>

						{!!tours.length && (
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
												link={`/media/3d-tours/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									spacing={8}
								/>
							</Section>
						)}

						{!!news.length && (
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
						)}

						{!!articles.length && (
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
						)}

						{
							(!!address || !!hours || !!phone) && (
								<Section
									title={'Контакты'}
								>
									<Contacts
										address={address} hours={hours}
										phone={phone} />
								</Section>
							)
						}
					</Stack>

					<Group gap={8} justify={'end'}>
						<Share
							href={router.asPath} image={data.main_image?.src}
							title={data.title_full}
						/>
					</Group>
				</Stack>
			</Container>

			<Space h={{ base: 24, md: 32 }} />

			<Container>
				<Section title={'Расположение'} />
			</Container>

			<Leaflet items={data.items} />
		</>
	);
};

export default ChapelDetails;

if (process.env.NODE_ENV === 'development') {
	ChapelDetails.displayName = 'ChapelDetails';
}
