import { ProfileDetails } from '@/entities/Profile/ui';
import { Container } from '@mantine/core';
import type { GetStaticProps } from 'next';

const ProfilePage = () => {
	return (
		<Container>
			<ProfileDetails />
		</Container>
	);
}

export default ProfilePage;

if (process.env.NODE_ENV === 'development') {
	ProfilePage.displayName = 'ProfilePage';
}

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async () => {
	return {
		props: {
			layout: {
				title: 'Личный кабинет',
				breadcrumbs: [
					{
						href: '/',
						title: 'Главная'
					},
					{
						title: 'Личный кабинет'
					},
				]
			},
		}
	}
}
