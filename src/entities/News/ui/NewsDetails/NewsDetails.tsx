import { useMemo } from 'react';
import { ContentBlock, Section } from '@/shared/ui';
import { Links } from '@/shared/ui';
import { Rate, Share, Slider } from '@/widgets/ui';
import { Container, Flex, Stack } from '@mantine/core';
import { useRouter } from 'next/router';

import { NewsCard } from '..';

const NewsDetails = ({ data }: { data: any }) => {
	const router = useRouter();

	const sections = data?.sections ?? [];
	const age_rating = data?.age_rating ?? '';
	const linked = data?.linked ?? [];
	const category = data?.category ?? {};

	// const media = sections?.map(({ media }: { media: any }) => media);
	// const mediaType = media?.reduce((result: string, { type }: { type: string }) => {
	// 	if (type) {
	// 		result = type;
	// 	}

	// 	return result;
	// }, "");

	const Linked = useMemo(() => {
		if (!linked?.length) {
			return null;
		}

		return (
			<Section title={'Ещё по этой теме'}>
				<Slider<News>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
								spacing: 16,
								perView: 3,
							},
						},
					}}
					dots
					items={linked}
					origin={'auto'}
					perView={1}
					renderItem={({
						title_full,
						title_short,
						issued_at,
						category,
						slug,
						teaser,
						main_image,
					}) => {
						return (
							<NewsCard.Linked
								category={category}
								issued_at={issued_at}
								main_image={main_image}
								slug={slug}
								teaser={teaser}
								title_full={title_full}
								title_short={title_short}
							/>
						);
					}}
					spacing={16}
				/>
			</Section>
		)
	}, [linked]);

	return (
		<Container>
			<Stack gap={16}>
				<Links
					age={age_rating}
					category={category}
					issuedAt={data.issued_at}
					type={data.type}
				/>

				<Stack gap={32}>
					{/* <Cover
						image={data?.main_image}
						title={data?.title_short ?? data?.title_full}
					/> */}

					<ContentBlock.List
						sections={sections}
					/>

					{Linked}

					<Flex
						align={'center'}
						direction={{ base: 'column', md: 'row' }}
						gap={8}
						justify={{ base: 'center', md: 'end' }}
					>
						<Rate contentId={data?.id} />

						<Share
							href={router.asPath} image={data.main_image?.src}
							title={data.title_full} />
					</Flex>
				</Stack>
			</Stack>
		</Container>
	);
};

export default NewsDetails;

if (process.env.NODE_ENV === 'development') {
	NewsDetails.displayName = 'NewsDetails';
}
