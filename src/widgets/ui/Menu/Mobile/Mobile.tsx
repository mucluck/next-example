import type { ReactNode } from 'react';
import { createElement, useEffect, useState } from 'react';
import {
	ActionIcon,
	Box,
	Burger,
	Drawer,
	Group,
	Portal,
	ScrollArea,
	Stack,
	Text,
	Title,
	Transition,
} from '@mantine/core';
import {
	IconBook,
	IconCalendar,
	IconCashBanknote,
	IconCast,
	IconChevronDown,
	IconChevronRight,
	IconClipboard,
	IconDeviceIpad,
	IconHeartHandshake,
	IconMedicalCross,
	IconSlideshow,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Blind, Broadcast, BroadcastProvider, Profile, Radio, Search } from '../..';
import logo from '../Horizontal/logo.svg';

import { CalendarMenu, ContentMenu, ImageMenu, InfoMenu } from './components';

type Components = 'InfoMenu' | 'ContentMenu' | 'ImageMenu' | 'CalendarMenu';

const components: Record<Components, ({ sub }: { sub: Record<string, unknown> }) => ReactNode> = {
	InfoMenu,
	ContentMenu,
	ImageMenu,
	CalendarMenu,
};

import Cross from '../Vertical/cross';
import Dome from '../Vertical/dome';

const icons = {
	flower: <IconMedicalCross size={32} stroke={1} />,
	// cross: <IconCross stroke={1} size={32} />,
	cross: <Cross stroke={1} />,
	'project-2': <IconDeviceIpad size={32} stroke={1} />,
	// dome: <IconBuildingArch stroke={1} size={32} />,
	dome: <Dome stroke={1} />,
	calendar: <IconCalendar size={32} stroke={1} />,
	sheet: <IconClipboard size={32} stroke={1} />,
	donation: <IconCashBanknote size={32} stroke={1} />,
	media: <IconCast size={32} stroke={1} />,
	'play-button': <IconSlideshow size={32} stroke={1} />,
	projects: <IconBook size={32} stroke={1} />,
	heart: <IconHeartHandshake size={32} stroke={1} />,
} as Record<string, ReactNode>;

const MenuMobile = ({ menu }: { menu: Array<MenuItem> }) => {
	const router = useRouter();

	const [isMain, setIsMain] = useState(false);
	const [isSlave, setIsSlave] = useState(false);
	const [sub, setSub] = useState<any>(null);

	useEffect(() => {
		const handleModalClose = () => {
			setIsMain(false);
			setIsSlave(false);
			setSub(null);
		};

		router.events.on('routeChangeStart', handleModalClose);

		return () => {
			router.events.off('routeChangeStart', handleModalClose);
		};
	}, [router]);

	return (
		<>
			<Box

			>
				<Group
					component={'nav'}
					hiddenFrom={'md'}
					justify={'space-between'}
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
					<Box
						component={Link} href={'/'}
						sx={{ display: 'flex', gap: 8, alignItems: 'center' }}>
						<Image
							alt={'Nazghoolова Земля'}
							height={44}
							src={logo}
							width={44}
						/>

						<Text
							span
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
					</Box>

					<Group gap={16}>
						<ActionIcon
							color={'brand.6'}
							onClick={(event) => {
								event.stopPropagation();
								event.preventDefault();

								setIsSlave((prev) => !prev);
								setIsMain(false);
							}}
							style={{
								transform: isSlave && !isMain ? 'rotate(-180deg)' : 'rotate(0)',
							}}
							sx={(theme) => ({
								transition: 'transform .3s ease',
								color: theme.colors.brand?.[4],
								transform: 'rotate(0)',
								'&:active': {
									color: theme.colors.brand?.[9],
									backgroundColor: theme.colors.brand?.[4],
								},
							})}
							variant={'subtle'}
						>
							<IconChevronDown />
						</ActionIcon>

						<Burger
							color={'#3f2512'} // TODO: Use theme colors
							onClick={() => {
								setIsMain((prev) => !prev);
								setIsSlave(false);
							}}
							opened={isMain && !isSlave}
						/>
					</Group>
				</Group>
			</Box>

			<Portal>
				<Transition
					duration={300}
					mounted={!isMain && isSlave}
					timingFunction="ease"
					transition={'slide-down'}
				>
					{(styles) => {
						return (
							<Group
								justify={'space-between'}
								style={styles}
								sx={(theme) => ({
									width: '100%',
									position: 'fixed',
									top: 60,
									backgroundColor: theme.colors.white[0],
									padding: 16,
									borderBottom: `1px solid ${theme.colors.brand?.[4]}`,
									zIndex: 9,
								})}
							>
								<Blind size={32} />

								<Radio size={32} />

								<BroadcastProvider>
									<Broadcast size={32} />
								</BroadcastProvider>

								<Search size={32} />

								<Profile size={32} />
							</Group>
						);
					}}
				</Transition>
			</Portal>

			<Portal>
				<Transition
					duration={200} mounted={isMain && !isSlave}
					timingFunction="ease" transition={'slide-down'}>
					{(styles) => {
						return (
							<Box
								p={16}
								style={styles}
								sx={(theme) => ({
									height: 'calc(100% - 60px)',
									width: '100%',
									position: 'fixed',
									top: 60,
									backgroundColor: theme.colors.white[0],
									zIndex: 9,
								})}
							>
								<ScrollArea h={'100%'} offsetScrollbars>
									<Stack gap={0}>
										{
											// @ts-ignore
											menu.map(({ url, title, icon, sub, subtitle, component }) => {
												if (!url) {
													return (
														<Group
															justify={'space-between'}
															key={icon}
															onClick={setSub.bind(null, {
																data: sub,
																title:
																	subtitle ??
																	(component === 'ContentMenu'
																		? 'Nazghoolный Nazghool Nazghoolский'
																		: component === 'CalendarMenu'
																			? ' Церковный календарь'
																			: ''),
																component,
															})}
														>
															<Group gap={8} py={8}>
																<Text
																	span
																	sx={(theme) => ({
																		display: 'flex',
																		color: theme.colors.brand?.[4],
																	})}
																>
																	{/* @ts-ignore */}
																	{icons[icon]}
																</Text>

																<Text
																	span
																	sx={(theme) => ({
																		display: 'flex',
																		color: theme.colors.brand?.[4],
																	})}
																>
																	{title}
																</Text>
															</Group>

															<IconChevronRight stroke={1.5} />
														</Group>
													);
												}

												return (
													<Link
														href={url}
														itemScope
														itemType="https://schema.org/SiteNavigationElement"
														key={url}
														title={title}
													>
														<Group gap={8} py={8}>
															<Text
																span
																sx={(theme) => ({
																	display: 'flex',
																	color: theme.colors.brand?.[4],
																})}
															>
																{/* @ts-ignore */}
																{icons[icon]}
															</Text>

															<Text
																span
																sx={(theme) => ({
																	display: 'flex',
																	color: theme.colors.brand?.[4],
																})}
															>
																{title}
															</Text>
														</Group>
													</Link>
												);
											})
										}
									</Stack>
								</ScrollArea>
							</Box>
						);
					}}
				</Transition>
			</Portal>

			<Drawer
				closeButtonProps={{
					c: 'brand.4',
					iconSize: 32,
				}}
				onClose={setSub.bind(null, null)}
				opened={!!sub}
				position={'right'}
				scrollAreaComponent={ScrollArea.Autosize}
				size={350}
				title={<Title c={'brand.4'} order={4}>{sub?.title}</Title>}
			>
				{/* @ts-ignore */}
				{createElement(components?.[sub?.component] ?? 'div', { sub: sub?.data })}
			</Drawer>
		</>
	);
};

export default MenuMobile;

if (process.env.NODE_ENV === 'development') {
	MenuMobile.displayName = 'MenuMobile';
}
