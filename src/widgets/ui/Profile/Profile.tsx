import { Button, Menu } from '@mantine/core';
import { IconLogin2, IconLogout,IconUser, IconUserPlus, IconWallet } from '@tabler/icons-react';
import { useRouter } from 'next/router';

import { useProfile } from '.';

const Profile = ({ size = 24 }: { size?: number }) => {
	const router = useRouter();

	const { handleToggleSignIn, handleToggleSignUp, logOut, token } = useProfile();

	return (
		<Menu
			shadow={'md'} transitionProps={{ transition: 'rotate-left', duration: 150 }}
			withArrow withinPortal>
			<Menu.Target>
				<Button
					aria-label={'profile'}
					px={8}
					styles={(theme) => ({
						root: {
							'&:hover': {
								color: theme.colors.brand?.[9],
								backgroundColor: theme.colors.brand?.[4],
							},
						},
					})}
					title={'Личный кабинет'}
					variant={'subtle'}
				>
					<IconUser size={size} stroke={1} />
				</Button>
			</Menu.Target>

			<Menu.Dropdown>
				<Menu.Label>Личный кабинет</Menu.Label>

				<Menu.Divider />

				<Menu.Item
					leftSection={<IconWallet size={20} stroke={1} />}
					onClick={() => router.push('/profile/actions')}
				>
					Мои действия
				</Menu.Item>

				{!token && (
					<>
						<Menu.Item
							leftSection={<IconLogin2 size={20} stroke={1} />}
							onClick={handleToggleSignIn.bind(null, true)}
						>
							Войти
						</Menu.Item>

						<Menu.Item
							leftSection={<IconUserPlus size={20} stroke={1} />}
							onClick={handleToggleSignUp.bind(null, true)}
						>
							Регистрация
						</Menu.Item>
					</>
				)}

				{
					token && (
						<>
							<Menu.Item
								leftSection={<IconUser size={20} stroke={1} />}
								onClick={() => router.push('/profile')}
							>
								Профиль
							</Menu.Item>

							<Menu.Item
								leftSection={<IconLogout size={20} stroke={1} />}
								onClick={logOut}
							>
								Выйти
							</Menu.Item>
						</>
					)
				}
			</Menu.Dropdown>
		</Menu>
	);
};

export default Profile;

if (process.env.NODE_ENV === 'development') {
	Profile.displayName = 'Profile';
}
