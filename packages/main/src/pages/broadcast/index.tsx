import { BroadcastDetails } from '@/entities/Broadcast/ui';
import { client } from '@/shared/graphql/client';
// @ts-ignore
import { BROADCASTS } from '@/shared/graphql/queries/broadcasts/queries.graphql';
import { BroadcastProvider } from '@/widgets/ui/Broadcast';
import { Container } from '@mantine/core';
import type { GetStaticProps } from 'next';

const BroadcastPage = ({ data }: { data: any }) => {
	return (
		<BroadcastProvider>
			<Container>
				<BroadcastDetails data={data} />
			</Container>
		</BroadcastProvider>
	);
};

export default BroadcastPage;

if (process.env.NODE_ENV === 'development') {
	BroadcastPage.displayName = 'BroadcastPage';
}

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown>; data: any }> = async ({ params }) => {
	const {
		data: { broadcasts, buildings },
	} = await client.query({
		query: BROADCASTS,
		variables: {
			slug: 'broadcast',
		},
	});

	const data = broadcasts[0] ?? {};
	const building = buildings?.[0] ?? {};
	const title = data?.title ?? '';
	const seo = data?.seo;

	return {
		props: {
			data: {
				...data,
				building,
			},
			layout: {
				title,
				seo,
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
