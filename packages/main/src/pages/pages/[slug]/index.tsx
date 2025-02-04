import { client } from '@/shared/graphql/client';
import {
	// @ts-ignore
	PAGE_BY_SLUG,
	// @ts-ignore
	PAGES_PATHS,
} from '@/shared/graphql/queries/pages/queries.graphql';
import { ContentBlock, Cover } from '@/shared/ui';
import { Container, Stack } from '@mantine/core';
import type { GetStaticPaths,GetStaticProps } from 'next';

const StaticPage = ({ data }: { data: any }) => {
	const sections = data?.sections;

	return (
		<Container>
			<Stack gap={32}>
				{/* <Cover
					title={data?.title_short ?? data?.title_full}
					image={data?.main_image}
				/> */}

				<ContentBlock.List
					sections={sections}
				/>
			</Stack>
		</Container>
	);
};

export default StaticPage;

if (process.env.NODE_ENV === 'development') {
	StaticPage.displayName = 'StaticPage';
}

export const getStaticPaths: GetStaticPaths = async () => {
	const { data } = await client.query({
		query: PAGES_PATHS,
	});

	const pagesPaths = data?.pages.map(({ slug }: { slug: string }) => {
		return {
			params: {
				slug,
			},
		};
	});

	return {
		paths: pagesPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{
	layout: Record<string, unknown>;
}> = async ({ params }) => {
	if (!params?.slug) {
		console.error('Error while fetching pages');

		return {
			notFound: true,
		};
	}

	const {
		data: { pages },
	} = await client.query({
		query: PAGE_BY_SLUG,
		variables: { slug: params?.slug },
	});

	return {
		props: {
			data: {
				...pages?.[0],
			},
			layout: {
				title: pages?.[0]?.title_full,
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						title: 'Страницы',
						href: '/pages',
					},
					{
						title: pages?.[0]?.title_short ?? pages?.[0]?.title_full,
					},
				],
			},
		},
	};
};
