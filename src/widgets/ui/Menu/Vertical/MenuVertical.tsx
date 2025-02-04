import { Box, Button, Overlay, Space, Stack } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import {
	IconBook,
	IconBuildingArch,
	IconCalendar,
	IconCashBanknote,
	IconCast,
	IconClipboard,
	IconHeartHandshake,
	IconMedicalCross,
	IconSlideshow,
} from '@tabler/icons-react';

import { HoveredBlock, HoveredLink } from './components';
import { VerticalMenuConsumer } from './context/context';
import { useVerticalMenu } from './context/context';
import { VerticalMenuProvider } from './context/provider';
import Cross from './cross';
import Dome from './dome';

const icons = {
	flower: <IconMedicalCross size={24} stroke={1} />,
	// cross: <IconCross stroke={1} size={24} />,
	cross: <Cross size={24} stroke={1} />,
	'project-2': <IconBuildingArch size={24} stroke={1} />,
	// dome: <IconBuildingChurch stroke={1} size={24} />,
	dome: <Dome size={24} stroke={1} />,
	calendar: <IconCalendar size={24} stroke={1} />,
	sheet: <IconClipboard size={24} stroke={1} />,
	donation: <IconCashBanknote size={24} stroke={1} />,
	media: <IconCast size={24} stroke={1} />,
	'play-button': <IconSlideshow size={24} stroke={1} />,
	projects: <IconBook size={24} stroke={1} />,
	heart: <IconHeartHandshake size={24} stroke={1} />,
} as const;

const size = {
	opened: 300,
	closed: 80,
};

const MenuVertical = ({ menu: items }: { menu: Array<MenuItem> }) => {
	const { ref, hovered } = useHover();
	const { menu } = useVerticalMenu();

	return (
		<VerticalMenuProvider>
			<VerticalMenuConsumer>
				{({ menu: subMenu, handleOpen, handleToggle, handleWrapperToggle, isOpen, isWrapperOpen }: any) => {

					return (
						<>
							{
								isWrapperOpen && subMenu?.id && (
									<Overlay
										// onClick={}
										blur={1}
										color={'brand.4'}
										fixed
										onClick={() => {
											handleToggle(false);
										}}
										opacity={0.35}
										zIndex={1}
									/>
								)
							}

							<Box
								component={'nav'}
								h={'100%'}
								onTransitionEndCapture={(event) => {
									if (event.propertyName === 'width') {
										const rect = event.currentTarget.getBoundingClientRect();

										if (rect.width === size.opened) {
											handleWrapperToggle(true);
										}

										if (rect.width === size.closed) {
											handleWrapperToggle(false);
										}
									}
								}}
								pos={'fixed'}
								ref={ref}
								style={{
									transform: 'translate3d(0, 0, 0)',
									width:
										(isWrapperOpen && subMenu?.id) || isOpen || hovered ? size.opened : size.closed,
								}}
								sx={(theme) => ({
									boxShadow: theme.shadows.xl,
									background: theme.colors.white[0],
									overflow: 'hidden',
									transition: 'width .3s ease',
									zIndex: 9,
								})}
								visibleFrom={'md'}
							>
								<Space h={80 + 16} />

								<Stack
									align={'flex-start'}
									gap={0}
								>
									{
										items.map(
											// @ts-ignore
											({ id, url, title, icon, subtitle, subDescription, sub, component }) => {
												if (!url) {
													return (
														<HoveredBlock
															isActive={hovered || (isWrapperOpen && menu?.id) || isOpen || id === menu?.id}
															key={id}
															onClick={() => {
																let button = null;

																if (component === "CalendarMenu") {
																	button = (
																		<Button
																			variant={"white"}
																			component={"a"}
																			href={"/calendar"}
																		>
																			Подробнее
																		</Button>
																	);
																}

																if (component === 'InfoMenu') {
																	button = (
																		<Button
																			variant={"white"}
																			component={"a"}
																			target={'_blank'}

																		>
																			Подробнее
																		</Button>
																	)
																}

																handleOpen({
																	id,
																	title: subtitle,
																	description: subDescription,
																	sub,
																	component,
																	button,
																});
															}}
															title={title}
															id={id}
															// @ts-ignore
															icon={icons[icon]}
														/>
													);
												}

												return (
													<HoveredLink
														key={url}
														title={title}
														url={url}
														isOpen={isOpen || (isWrapperOpen && subMenu?.id) || hovered}
														// @ts-ignore
														icon={icons[icon]}
													/>
												);
											}
										)
									}
								</Stack>
							</Box>
						</>
					);
				}}
			</VerticalMenuConsumer>
		</VerticalMenuProvider>
	);
};

export default MenuVertical;

if (process.env.NODE_ENV === 'development') {
	MenuVertical.displayName = 'MenuVertical';
}
