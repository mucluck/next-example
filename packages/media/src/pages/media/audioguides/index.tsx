import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	AUDIO_GUIDES_CATEGORIES,
} from '@/shared/graphql/queries/audio-guides/queries.graphql';
import { ChunkGrid, ContentCard } from '@/shared/ui';
import { Container, Stack } from '@mantine/core';
import type { GetStaticProps } from 'next';

const AudioGuidesPage = ({ data }: any) => {
	return (
		<Container>
			<Stack gap={16}>
				<ChunkGrid<Saint>
					items={data.items}
					renderItem={({ slug, main_image, title }) => {
						const link = `/media/audioguides/${slug}`;

						return (
							<ContentCard
								image={main_image} link={link}
								title={title}
							/>
						);
					}}
				/>
			</Stack>
		</Container>
	);
};

export default AudioGuidesPage;

if (process.env.NODE_ENV === 'development') {
	AudioGuidesPage.displayName = 'AudioGuidesPage';
}

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async () => {
	const {
		data: { audioGuides },
	} = await client.query({
		query: AUDIO_GUIDES_CATEGORIES,
	});

	return {
		props: {
			data: {
				items: audioGuides.map(({ category }: any) => category)
			},
			layout: {
				title: 'Аудиогиды',
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						href: '/media',
						title: 'Медиатека',
					},
					{
						title: 'Аудиогиды',
					},
				],
			},
		},
	};
};
