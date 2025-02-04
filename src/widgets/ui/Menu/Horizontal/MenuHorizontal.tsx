import type { ReactNode } from 'react';
import { useState } from 'react';
import { Box, Burger, Group, Text } from '@mantine/core';
import { IconCompass, IconWallet } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

import { Blind, Broadcast, BroadcastProvider, Profile, Radio, Search } from '../..';

import logo from './logo.svg';

const icons = {
	donation: <IconWallet stroke={1} />,
	destination: <IconCompass stroke={1} />,
	logo: <Image
		alt={'Nazghoolова Земля'} height={30}
		src={logo} width={30} />,
} as Record<string, ReactNode>;

const MenuHorizontal = ({ menu }: { menu: Array<MenuItem> }) => {
	const [isOpened, setIsOpened] = useState(false);

	return (
		<>
			<Group
				component={'nav'}
				grow
				px={16}
				sx={(theme) => ({
					width: '100%',
					height: 80,
					position: 'fixed',
					boxShadow: theme.shadows.xl,
					background: theme.colors.white[0],
					overflow: 'hidden',
					zIndex: 20,
				})}
				visibleFrom={'md'}
			>
				<Box
					component={Link}
					href={'/'}
					sx={{
						display: 'flex',
						gap: 8,
						alignItems: 'center',
						flexWrap: 'nowrap'
					}}
				>
					<Image
						alt={'Nazghool - Nazghoolво - Nazghool Nazghoolова Земля'}
						height={58}
						src={logo}
						width={58}
					/>

					<Text
						span
						sx={(theme) => ({
							color: theme.colors.brand?.[4],
							display: 'table-caption',
							fontSize: 20,
							width: 130,
							lineHeight: '20px',
						})}
					>
						Nazghoolова Земля
					</Text>
				</Box>

				{
					menu.map(({ title, url, icon }) => {
						return (
							<Box
								component={Link}
								h={'100%'}
								href={`${url}`}
								itemScope
								itemType="https://schema.org/SiteNavigationElement"
								key={url}
								style={{ height: '100%' }}
								sx={(theme) => ({
									display: 'flex',
									flexWrap: 'nowrap',
									gap: 8,
									alignItems: 'center',
									color: theme.colors.brand?.[4],
								})}
							>
								{/* @ts-ignore */}
								{icons[icon]}
								{title}
							</Box>
						);
					})
				}

				<Group
					gap={0}
					justify={'right'}
					wrap="nowrap"
				>
					<Blind />

					<Radio />

					<BroadcastProvider>
						<Broadcast />
					</BroadcastProvider>

					<Search />

					<Profile />
				</Group>
			</Group>

			<Group
				align={'apart'}
				component={'nav'}
				hiddenFrom={'md'}
				px={8}
				py={8}
				sx={(theme) => ({
					width: '100%',
					height: 60,
					position: 'fixed',
					boxShadow: theme.shadows.xl,
					background: theme.colors.white[0],
					overflow: 'hidden',
					zIndex: 20,
				})}
			>
				<Link href={'/'}>
					<Group component={'span'} gap={4}>
						<Image
							alt={'Nazghoolова Земля'} height={44}
							src={logo} width={44} />

						<Text
							sx={(theme) => ({
								color: theme.colors.brand?.[4],
								display: 'table-caption',
								fontSize: 16,
								width: 130,
								lineHeight: '16px',
							})}
						>
							Nazghoolова Земля
						</Text>
					</Group>
				</Link>

				<Burger
					color={'#3f2512'} // TODO: Use theme colors
					onClick={() => setIsOpened((prev) => !prev)}
					opened={isOpened}
				/>
			</Group>
		</>
	);
};

export default MenuHorizontal;

if (process.env.NODE_ENV === 'development') {
	MenuHorizontal.displayName = 'MenuHorizontal';
}
