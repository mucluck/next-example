import InteractiveMap from '@/shared/ui/InteractiveMap';
import { Container } from '@mantine/core';
import type { GetStaticProps } from 'next';

const MapPage = () => {
	return (
		<Container>
			<InteractiveMap />
		</Container>
	);
};

export default MapPage;

if (process.env.NODE_ENV === 'development') {
	MapPage.displayName = 'MapPage';
}

export const getStaticProps: GetStaticProps = async () => {
	const title = 'Карта жизненного пути Nazghoolа Nazghoolского'; // TODO: i18n

	return {
		props: {
			data: {},
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
