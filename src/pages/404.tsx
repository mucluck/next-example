import { Button, Container, Stack, Text, Title } from '@mantine/core';
import Link from 'next/link';

const Page404 = () => {
	return (
		<Container>
			<Stack
				align={'center'} justify="center"
				sx={() => ({ height: '100%' })}>
				<Title fz={64} order={1}>
					404
				</Title>
				<Text fz={32} span>
					Эта страница не найдена
				</Text>
				<Button component={Link} href={'/'}>
					На главную
				</Button>
			</Stack>
		</Container>
	);
};

export default Page404;

if (process.env.NODE_ENV === 'development') {
	Page404.displayName = 'Page404';
}
