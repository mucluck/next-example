import { Button, Stack, Text, SimpleGrid } from "@mantine/core";

import { useProfile } from "@/widgets/ui";
import { IconLogin2, IconLogout } from "@tabler/icons-react";

const ProfileDetails = () => {
	const { currentUser, handleToggleSignIn, logOut } = useProfile();

	return (
		<Stack gap={16}>
			<SimpleGrid cols={{ base: 1, md: 4 }}>
				{!currentUser && (
					<Stack>
						<Text>Вы не авторизованы</Text>

						{/* @ts-ignore */}
						<Button onClick={handleToggleSignIn} leftIcon={<IconLogin2 size={16} />}>
							Войти
						</Button>
					</Stack>
				)}

				{!!currentUser && (
					<Stack>
						{/* @ts-ignore */}
						<Text>{currentUser?.user?.email}</Text>

						{/* @ts-ignore */}
						<Button onClick={logOut} rightIcon={<IconLogout size={16} />}>
							Выйти
						</Button>
					</Stack>
				)}
			</SimpleGrid>
		</Stack>
	);
};

export default ProfileDetails;
