import { Box, Container, Divider, Flex, Space, Text } from '@mantine/core';
import Link from 'next/link';

import { Menu } from './components';

type FooterProps = {
	menu: Array<Record<string, unknown>>;
};

const Footer = ({ menu }: FooterProps) => {
	return (
		<Box
			component={'footer'}
			itemScope
			itemType={'http://schema.org/WPFooter'}
			sx={(theme, fn) => ({
				backgroundColor: theme.colors.brand?.[4],
				marginTop: 'auto',
				paddingBottom: 16,
				[fn.largerThan('md')]: {
					paddingTop: 24,
					paddingBottom: 24,
					paddingLeft: 80 + 16,
				},
			})}
		>
			<Space h={{ base: 0, md: 24 }} />

			<Menu items={menu} />

			<Space h={{ base: 0, md: 64 }} />

			<Divider color={'#ffffff4d'} />

			<Space h={{ base: 16, md: 24 }} />

			<Container>
				<Flex
					gap={{ base: 16, md: 24 }} px={{ base: 8, md: 0 }}
					wrap={'wrap'}>
					<Flex gap={{ base: 4, md: 16 }} wrap={'wrap'}>
						<Link href={'/pages/politika-konfidencialnosti'} title={'Политика конфиденциальности'}>
							<Text c={'#FFF'} span>
								Политика конфиденциальности
							</Text>
						</Link>

						<Divider
							color={'#ffffffcc'}
							orientation="vertical"
							visibleFrom="md"
						/>

						<Link href={'/pages/polzovatelskoe-soglashenie'} title={'Пользовательское соглашение'}>
							<Text c={'#FFF'} span>
								Пользовательское соглашение
							</Text>
						</Link>

						<Divider
							color={'#ffffffcc'}
							orientation="vertical"
							visibleFrom="md"
						/>

						<Link href={'/pages/pravila-polzovaniya-cookie'} title={'Пользовательское соглашение'}>
							<Text c={'#FFF'} span>
								Правила использования Cookie
							</Text>
						</Link>
					</Flex>

					<Text
						c={'white.0'} span
						sx={() => ({ fontSize: 12 })}>
						Использовать материалы сайта без разрешения редакции запрещено. При полном или частичном
						использовании материалов сайта активная гиперссылка на Nazghool.рф обязательна.
					</Text>
				</Flex>
			</Container>
		</Box>
	);
};

export default Footer;
