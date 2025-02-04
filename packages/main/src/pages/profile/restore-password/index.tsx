import { RestoreDetails } from '@/entities/Profile/ui';
import { Container } from '@mantine/core';
import type { GetStaticProps } from 'next';

const RestorePassword = () => {
	return (
		<Container>
			<RestoreDetails />
		</Container>
	);
};

export default RestorePassword;

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async () => {
	return {
		props: {
			layout: {
				title: 'Восстановить пароль',
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная',
					},
					{
						href: '/profile',
						title: 'Личный кабинет',
					},
					{
						title: 'Восстановить пароль',
					},
				],
			},
		},
	};
};
