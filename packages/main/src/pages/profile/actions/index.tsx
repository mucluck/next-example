import { ActionsDetails } from '@/entities/Profile/ui';
import { Container } from '@mantine/core';
import type { GetStaticProps } from 'next';

const ProfileActions = () => {
	return (
		<Container>
			<ActionsDetails />
		</Container>
	);
}

export default ProfileActions;

if (process.env.NODE_ENV === 'development') {
	ProfileActions.displayName = 'ProfileActions';
}

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async () => {
	return {
		props: {
			layout: {
				title: 'Мои действия',
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная'
					},
					{
						title: 'Личный кабинет',
						href: '/profile',
					},
					{
						title: 'Мои действия',
					}
				]
			},
		}
	}
}
