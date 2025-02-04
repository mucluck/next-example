import { ArticleCard } from '@/entities/Article/ui';
import { NewsCard } from '@/entities/News/ui';
import { Contacts, ContentBlock, ContentCard, Leaflet, Markdown, Section, Weather } from '@/shared/ui';
import { Share, Slider } from '@/widgets/ui';
import { Blockquote, Box, Container, Flex, Group, Space, Stack, Text } from '@mantine/core';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MonasteryDetails = ({ data }: any) => {
	const router = useRouter();

	const sections = data?.sections ?? [];
	const cathedrals = data?.cathedrals ?? [];
	const chapels = data?.chapels ?? [];
	const churches = data?.churches ?? [];
	const objects = data?.objects ?? [];
	const projects = data?.projects ?? [];
	const museums = data?.museums ?? [];
	const temples = data?.temples ?? [];
	const tours = data?.tours ?? [];
	const wells = data?.wells ?? [];
	const belltowers = data?.belltowers ?? [];
	const monasteries = data?.monasteries ?? [];
	const news = data?.news?.map(({ news }: any) => news) ?? [];
	const articles = data?.articles.map(({ media_article }: any) => media_article) ?? [];
	const audios = data?.audios ?? [];
	const books = data?.books ?? [];
	const periodics = data?.periodics ?? [];
	const photos = data?.photos ?? [];
	const videos = data?.videos ?? [];

	const appeal = data?.appeal ?? {};
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

						{!!appeal?.body && (
							<Blockquote cite={appeal?.title ? `– ${appeal?.title}` : ''} sx={{ backgroundColor: '#fcfbf7' }}>
								<Flex c={'p'} gap={16}>
									<Markdown
										markdown={appeal?.body}
									>
										<Image
											alt={appeal?.image?.alt}
											height={300}
											priority
											src={appeal?.image?.src?.src}
											style={{
												width: 400,
												float: 'left',
												marginRight: 16,
												marginBottom: 16,
												maxWidth: '100%',
												height: 'auto'
											}}
											unoptimized
											width={500}
										/>
									</Markdown>
								</Flex>
							</Blockquote>
						)}

						<ContentBlock.List
							sections={sections}
						/>

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
								items={[...cathedrals, ...chapels, ...churches, ...projects, ...temples, ...wells, ...belltowers, ...monasteries]}
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
									const link = `/${data.city.slug}/chapels/${slug}`;

									return <ContentCard
										image={img} link={link}
										title={title_full} type={type} />;
								}}
								spacing={8}
							/>
						</Section>

						{/* {!!cathedrals.length && (
							<Section
								title={"Соборы"}
							// extra={
							// 	<Link href={extra?.link} title={extra?.title}>
							// 		{extra?.title}
							// 	</Link>
							// }
							>
								<Slider<Ikon>
									dots
									origin={"auto"}
									items={cathedrals}
									perView={1}
									breakpoints={{
										"(min-width: 768px)": {
											slides: {
												spacing: 16,
												perView: 4,
											},
										},
									}}
									renderItem={({
										main_image,
										main_image_preview,
										title_full,
										type = "",
										slug,
									}: any) => {
										const img = Object.assign({}, main_image, main_image_preview);

										return (
											<ContentCard
												image={img}
												link={`/${data.city.slug}/cathedrals/${slug}`}
												title={title_full}
												type={type}
											/>
										)
									}}
									gap={8}
								/>
							</Section>
						)}

						{!!chapels.length && (
							<Section
								title={"Часовни"}
							// extra={
							// 	<Link href={extra?.link} title={extra?.title}>
							// 		{extra?.title}
							// 	</Link>
							// }
							>
								<Slider<Ikon>
									dots
									origin={"auto"}
									items={chapels}
									perView={1}
									breakpoints={{
										"(min-width: 768px)": {
											slides: {
												spacing: 16,
												perView: 4,
											},
										},
									}}
									renderItem={({
										main_image,
										main_image_preview,
										title_full,
										type = "",
										slug,
									}: any) => {
										const img = Object.assign({}, main_image, main_image_preview);

										return (
											<ContentCard
												image={img}
												link={`/${data.city.slug}/chapels/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									gap={8}
								/>
							</Section>
						)}

						{!!churches.length && (
							<Section
								title={"Церкви"}
							// extra={
							// 	<Link href={extra?.link} title={extra?.title}>
							// 		{extra?.title}
							// 	</Link>
							// }
							>
								<Slider<Ikon>
									dots
									origin={"auto"}
									items={churches}
									perView={1}
									breakpoints={{
										"(min-width: 768px)": {
											slides: {
												spacing: 16,
												perView: 4,
											},
										},
									}}
									renderItem={({
										main_image,
										main_image_preview,
										title_full,
										type = "",
										slug,
									}: any) => {
										const img = Object.assign({}, main_image, main_image_preview);

										return (
											<ContentCard
												image={img}
												link={`/${data.city.slug}/churches/${slug}`}
												title={title_full}
												type={type}
											/>
										)
									}}
									gap={8}
								/>
							</Section>
						)}

						{!!projects.length && (
							<Section
								title={"Проекты"}
							// extra={
							// 	<Link href={extra?.link} title={extra?.title}>
							// 		{extra?.title}
							// 	</Link>
							// }
							>
								<Slider<Ikon>
									dots
									origin={"auto"}
									items={projects}
									perView={1}
									breakpoints={{
										"(min-width: 768px)": {
											slides: {
												spacing: 16,
												perView: 4,
											},
										},
									}}
									renderItem={({
										main_image,
										main_image_preview,
										title_full,
										type = "",
										slug,
									}: any) => {
										const img = Object.assign({}, main_image, main_image_preview);

										return (
											<ContentCard
												image={img}
												link={`/${data.city.slug}/projects/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									gap={8}
								/>
							</Section>
						)}

						{!!temples.length && (
							<Section
								title={"Храмы"}
							// extra={
							// 	<Link href={extra?.link} title={extra?.title}>
							// 		{extra?.title}
							// 	</Link>
							// }
							>
								<Slider<Ikon>
									dots
									origin={"auto"}
									items={temples}
									perView={1}
									breakpoints={{
										"(min-width: 768px)": {
											slides: {
												spacing: 16,
												perView: 4,
											},
										},
									}}
									renderItem={({
										main_image,
										main_image_preview,
										title_full,
										type = "",
										slug,
									}: any) => {
										const img = Object.assign({}, main_image, main_image_preview);

										return (
											<ContentCard
												image={img}
												link={`/${data.city.slug}/temples/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									gap={8}
								/>
							</Section>
						)}

						{!!wells.length && (
							<Section
								title={"Святые источники"}
							// extra={
							// 	<Link href={extra?.link} title={extra?.title}>
							// 		{extra?.title}
							// 	</Link>
							// }
							>
								<Slider<Ikon>
									dots
									origin={"auto"}
									items={wells}
									perView={1}
									breakpoints={{
										"(min-width: 768px)": {
											slides: {
												spacing: 16,
												perView: 4,
											},
										},
									}}
									renderItem={({
										main_image,
										main_image_preview,
										title_full,
										type = "",
										slug,
									}: any) => {
										const img = Object.assign({}, main_image, main_image_preview);

										return (
											<ContentCard
												image={img}
												link={`/${data.city.slug}/wells/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									gap={8}
								/>
							</Section>
						)}

						{!!belltowers.length && (
							<Section
								title={"Колокольни"}
							// extra={
							// 	<Link href={extra?.link} title={extra?.title}>
							// 		{extra?.title}
							// 	</Link>
							// }
							>
								<Slider<Ikon>
									dots
									origin={"auto"}
									items={belltowers}
									perView={1}
									breakpoints={{
										"(min-width: 768px)": {
											slides: {
												spacing: 16,
												perView: 4,
											},
										},
									}}
									renderItem={({
										main_image,
										main_image_preview,
										title_full,
										type = "",
										slug,
									}: any) => {
										const img = Object.assign({}, main_image, main_image_preview);

										return (
											<ContentCard
												image={img}
												link={`/${data.city.slug}/belltowers/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									gap={8}
								/>
							</Section>
						)}

						{!!temples.length && (
							<Section
								title={"Храмы"}
							// extra={
							// 	<Link href={extra?.link} title={extra?.title}>
							// 		{extra?.title}
							// 	</Link>
							// }
							>
								<Slider<Ikon>
									dots
									origin={"auto"}
									items={temples}
									perView={1}
									breakpoints={{
										"(min-width: 768px)": {
											slides: {
												spacing: 16,
												perView: 4,
											},
										},
									}}
									renderItem={({
										main_image,
										main_image_preview,
										title_full,
										type = "",
										slug,
									}: any) => {
										const img = Object.assign({}, main_image, main_image_preview);

										return (
											<ContentCard
												image={img}
												link={`/${data.city.slug}/temples/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									gap={8}
								/>
							</Section>
						)}

						{!!monasteries.length && (
							<Section
								title={"Монастыри"}
							// extra={
							// 	<Link href={extra?.link} title={extra?.title}>
							// 		{extra?.title}
							// 	</Link>
							// }
							>
								<Slider<Ikon>
									dots
									origin={"auto"}
									items={monasteries}
									perView={1}
									breakpoints={{
										"(min-width: 768px)": {
											slides: {
												spacing: 16,
												perView: 4,
											},
										},
									}}
									renderItem={({
										main_image,
										main_image_preview,
										title_full,
										type = "",
										slug,
									}: any) => {
										const img = Object.assign({}, main_image, main_image_preview);

										return (
											<ContentCard
												image={img}
												link={`/${data.city.slug}/monasteries/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									gap={8}
								/>
							</Section>
						)} */}



						{!!museums.length && (
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
												link={`/${data.city.slug}/museums/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									spacing={8}
								/>
							</Section>
						)}

						{!!objects.length && (
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
												link={`/${data.city.slug}/objects/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									spacing={8}
								/>
							</Section>
						)}

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

						{/* Дебилизм кончается тут */}

						{!!audios.length && (
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
										const img = Object.assign({}, main_image, main_image_preview);

										return (
											<ContentCard
												image={img}
												link={`/media/audioguides/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									spacing={8}
								/>
							</Section>
						)}

						{!!books.length && (
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
												link={`/media/books/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									spacing={8}
								/>
							</Section>
						)}

						{!!periodics.length && (
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
												link={`/media/periodics/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									spacing={8}
								/>
							</Section>
						)}

						{!!photos.length && (
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
												link={`/media/photos/${slug}`}
												title={title_full}
												type={type}
											/>
										);
									}}
									spacing={8}
								/>
							</Section>
						)}

						{!!videos.length && (
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
												link={`/media/videos/${slug}`}
												title={title_full}
												type={type}
											/>
										);
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

						<Group gap={8} justify={'end'}>
							<Share
								href={router.asPath} image={data.main_image?.src}
								title={data.title_full} />
						</Group>
					</Stack>
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

export default MonasteryDetails;
