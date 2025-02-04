
import { useMemo } from 'react';
import { NewsCard } from '@/entities/News/ui';
import { ContentBlock, Section } from '@/shared/ui';
import { Links } from '@/shared/ui';
import { Share, Slider } from '@/widgets/ui';
import { Flex, Stack } from '@mantine/core';
import { useRouter } from 'next/router';

import { ArticleCard } from '..';

const ArticleDetails = ({ data }: { data: any }) => {
	const router = useRouter();

	const sections = data?.sections ?? [];
	const age_rating = data?.age_rating ?? '';
	const category = data?.category ?? {};
	const linked = data?.linked ?? [];
	const linkedNews = data?.linkedNews ?? [];

	const Linked = useMemo(() => {
		if (!linked.length) {
			return null;
		}

		return (
			<Section title={'Ещё по этой теме'}>
				<Slider<News>
					breakpoints={{
						'(min-width: 768px)': {
							slides: {
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
							<ArticleCard.Linked
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

	const LinkedNews = useMemo(() => {
		if (!linkedNews.length) {
			return null;
		}

		return (
			<Section title={'Ещё по этой теме (новости)'}>
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
					items={linkedNews}
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
	}, [linkedNews]);

	return (
		<Stack gap={16}>
			<Links
				age={age_rating}
				category={category}
				issuedAt={data?.issued_at}
				type={data.type}
			/>

			<Stack gap={32}>
				<ContentBlock.List
					sections={sections}
				/>

				<Flex gap={8} justify={{ base: 'center', md: 'right' }}>
					<Share
						href={router.asPath}
						image={data.main_image?.src}
						title={data.title_full}
					/>
				</Flex>

				{Linked}

				{LinkedNews}
			</Stack>
		</Stack>
	);
};

export default ArticleDetails;

if (process.env.NODE_ENV === 'development') {
	ArticleDetails.displayName = 'ArticleDetails';
}
