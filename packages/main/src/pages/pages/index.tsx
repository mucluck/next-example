import { client } from '@/shared/graphql/client';
// @ts-ignore
import { PAGES } from '@/shared/graphql/queries/pages/queries.graphql';
import { Container, Flex,Text } from '@mantine/core';
import type { GetStaticProps } from 'next';
import Link from 'next/link';

const PagesPage = ({ data: { items } }: { data: { items: Array<any> } }) => {
	return (
		<Container>
			<Flex direction={'column'} gap={{ base: 8, md: 16 }}>
				{items.map(({ title_short, title_full, slug }) => {
					const title = title_short ?? title_full;

					return (
						<Link
							href={`/pages/${slug}`} key={slug}
							title={title}>
							<Text c={'gold.4'} span>
								{title}
							</Text>
						</Link>
					);
				})}
			</Flex>
		</Container>
	);
};

export default PagesPage;

if (process.env.NODE_ENV === 'development') {
	PagesPage.displayName = 'PagesPage';
}

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async () => {
	const {
		data: { pages },
	} = await client.query({
		query: PAGES,
		variables: {
			limit: 56,
			offset: 0,
		},
	});
	const title = 'Страницы';

	return {
		props: {
			data: {
				items: pages,
			},
			layout: {
				title,
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						title,
					},
				],
			},
		},
	};
};
