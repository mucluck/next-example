import { useEffect, useRef, useState } from 'react';
import { Gospel } from '@/entities/Days/ui';
import { IkonCard } from '@/entities/Ikon/ui';
import { Calendar } from '@/shared/ui';
import { Slider } from '@/widgets/ui';
import { Accordion, ActionIcon, Box, Button, Divider, Flex, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCalendar } from '@tabler/icons-react';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import arrowLeft from './assets/arrowLeft.svg';
import arrowRight from './assets/arrowRight.svg';
import corner from './assets/corner.svg';

const DayPage = ({ data }: DayPageProps) => {
	const outlook = useRef<HTMLInputElement>(null);
	const router = useRouter();
	const theme = useMantineTheme();

	const [isModalOpened, setIsModalOpened] = useState(false);

	const saints = data?.saints.map(({ saint }) => ({ ...saint }));
	const ikons = saints.reduce((result, { ikons }) => {
		const ikon = ikons?.[0]?.ikon;

		if (ikon) {
			result.push(ikon);
		}

		return result;
	}, [] as Array<Ikon>);

	const gospels = data?.gospels.map(({ text, kind }) => {
		return {
			kind,
			book: text?.book,
			text: {
				rus: text?.rus,
				church: text?.church,
			},
			audios: text?.audios,
		};
	});

	const handleCopy = () => {
		outlook?.current?.select();
		outlook?.current?.setSelectionRange(0, 99999);
		document.execCommand('copy');

		notifications.show({
			title: 'Ссылка скопирована',
			message: 'Для сохранения календаря, вставье скопированную ссылку в ',
		});
	};

	const calendarItems = [
		{
			path: 'webcal://calendar.google.com/calendar/ical/',
			title: 'Добавить в календарь Apple',
		},
		{
			path: 'https://calendar.google.com/calendar/e',
			title: 'Добавить в календарь Google',
		},
		{
			title: 'Скопировать ссылку для Outlook',
			onClick() {
				handleCopy();
			},
			children: () => {
				return (
					<input
						id={'outlook-link'}
						ref={outlook}
						style={{
							position: 'absolute',
							opacity: 0,
							border: 0,
							left: 0,
							width: '1px',
						}}
						type={'text'}
						value={
							'https://calendar.google.com/calendar/'
						}
					/>
				);
			},
		},
	];

	useEffect(() => {
		const handleModalClose = () => setIsModalOpened(false);

		router.events.on('routeChangeStart', handleModalClose);

		return () => {
			router.events.off('routeChangeStart', handleModalClose);
		};
	}, [router]);

	return (
		<Box>
			<Stack gap={24}>
				<Box
					sx={(theme, fn) => ({
						border: `2px solid ${theme.colors.gold[4]}`,
						padding: 16,
						margin: 16,
						position: 'relative',
						[fn.largerThan('md')]: {
							padding: 32,
							margin: 32,
						},
					})}
				>
					<Box
						sx={(theme) => ({
							position: 'absolute',
							width: 85,
							height: 85,
							left: -24,
							top: -24,
							backgroundImage: `url(${corner.src})`,
							backgroundColor: theme.colors.white[0],
						})}
					/>
					<Box
						sx={(theme) => ({
							position: 'absolute',
							width: 85,
							height: 85,
							right: -24,
							top: -24,
							backgroundImage: `url(${corner.src})`,
							backgroundColor: theme.colors.white[0],
							transform: 'rotate(90deg)',
						})}
					/>

					<Stack key={`${data.date}-slider`}>
						{!!ikons.length && (
							<Slider<Ikon>
								breakpoints={{
									'(min-width: 768px)': {
										slides: {
											spacing: 16,
											perView: 4,
										},
									},
								}}
								dots
								items={ikons}
								origin={'auto'}
								perView={1}
								renderItem={({ image, main_image, slug, title_full }) => {
									return <IkonCard
										main_image={image ?? main_image} slug={slug}
										title={title_full} />;
								}}
								spacing={8}
							/>
						)}

						<Group
							justify={'space-between'}
							sx={(_, fn) => ({ [fn.largerThan('md')]: { display: 'none' }, margin: '0 -12px' })}
						>
							<Link
								href={`/calendar/${moment(data?.date).subtract(1, 'days').format('YYYY-MM-DD')}`}
								title={'Предыдущий день'}
							>
								<Group gap={8}>
									<Image
										alt={'Следующий день'} height={20}
										src={arrowLeft} />

									<Text span sx={(theme) => ({ color: theme.colors.gold[4], fontSize: 14 })}>
										Предыдущий день
									</Text>
								</Group>
							</Link>

							<Link
								href={`/calendar/${moment(data?.date).add(1, 'days').format('YYYY-MM-DD')}`}
								title={'Следующий день'}
							>
								<Group gap={8}>
									<Text span sx={(theme) => ({ color: theme.colors.gold[4], fontSize: 14 })}>
										Следующий день
									</Text>

									<Image
										alt={'Следующий день'} height={20}
										src={arrowRight} />
								</Group>
							</Link>
						</Group>

						<Flex justify={{ base: 'center', md: 'space-between' }} style={{ zIndex: 9 }}>
							{/* // TODO: DRY */}
							<Box
								visibleFrom="md"
							>
								<Link
									href={`/calendar/${moment(data?.date).subtract(1, 'days').format('YYYY-MM-DD')}`}
									title={'Предыдущий день'}
								>
									<Group>
										<Image
											alt={'Следующий день'} height={40}
											src={arrowLeft} />

										<Text span sx={(theme) => ({ color: theme.colors.gold[4] })}>
											Предыдущий день
										</Text>
									</Group>
								</Link>
							</Box>

							<Flex
								align={'center'} direction={{ base: 'column', md: 'row' }}
								gap={{ base: 8, md: 24 }}>
								<Stack align={'center'} gap={0}>
									<Link href={'/pages/julian-calendar'} title={'Старый стиль'}>
										<Text
											span
											sx={(theme) => ({
												color: theme.colors.gold[4],
											})}
										>
											Старый стиль
										</Text>
									</Link>

									<Divider
										color={'gold.4'}
										size={'xs'}
										sx={() => ({ width: '100%' })}
										variant={'dashed'}
									/>

									<Text
										span
										sx={(theme) => ({
											color: theme.colors.brand?.[4],
										})}
									>
										{data.old_date_style}
									</Text>
								</Stack>

								<Text
									span
									sx={(theme) => ({
										color: theme.colors.money[4],
										fontSize: 24,
										fontWeight: 600,
									})}
								>
									{data?.name}
								</Text>

								<Stack align={'center'} gap={0}>
									<Link href={'/pages/gregorian-calendar'} title={'Новый стиль'}>
										<Text
											span
											sx={(theme) => ({
												color: theme.colors.gold[4],
											})}
										>
											Новый стиль
										</Text>
									</Link>

									<Divider
										color={'gold.4'}
										size={'xs'}
										sx={() => ({ width: '100%' })}
										variant={'dashed'}
									/>

									<Text span sx={(theme) => ({ color: theme.colors.brand?.[4] })}>
										{data.new_date_style}
									</Text>
								</Stack>
							</Flex>

							{/* // TODO: DRY */}
							<Box
								visibleFrom="md"
							>
								<Link
									href={`/calendar/${moment(data?.date).add(1, 'days').format('YYYY-MM-DD')}`}
									title={'Следующий день'}
								>
									<Group>
										<Text span sx={(theme) => ({ color: theme.colors.gold[4] })}>
											Следующий день
										</Text>

										<Image
											alt={'Следующий день'} height={40}
											src={arrowRight} />
									</Group>
								</Link>
							</Box>
						</Flex>

						<Group justify={'center'}>
							<ActionIcon
								onClick={setIsModalOpened.bind(null, true)}
								sx={(theme) => ({ color: theme.colors.brand?.[4] })}
								title={'Навигация по календарю'}
								variant={'subtle'}
							>
								<IconCalendar />
							</ActionIcon>
						</Group>

						<Text
							sx={(theme) => ({ color: theme.colors.brand?.[4], fontSize: 24, fontWeight: 700 })}
							ta={'center'}
						>
							{data?.week?.title}
						</Text>

						<Flex
							direction={'row'}
							justify={{ base: 'center', md: 'flex-start' }}
							sx={() => ({ zIndex: 9 })}
							wrap={'wrap'}
						>
							{saints.map(({ rank, slug, title }) => {
								return (
									<>
										<Link href={`/saints/${slug}`} key={slug}>
											<Text
												span
												sx={(theme) => ({
													color: theme.colors.gold[4],
													fontSize: 14,
												})}
											>
												{rank?.short_name} {title}
											</Text>
										</Link>
									</>
								);
							})}
						</Flex>
					</Stack>

					<Box
						sx={(theme) => ({
							position: 'absolute',
							width: 85,
							height: 85,
							left: -24,
							bottom: -24,
							backgroundImage: `url(${corner.src})`,
							backgroundColor: theme.colors.white[0],
							transform: 'rotate(-90deg)',
						})}
					/>
					<Box
						sx={(theme) => ({
							position: 'absolute',
							width: 85,
							height: 85,
							right: -24,
							bottom: -24,
							backgroundImage: `url(${corner.src})`,
							backgroundColor: theme.colors.white[0],
							transform: 'rotate(180deg)',
						})}
					/>
				</Box>

				<Flex direction={{ base: 'column', md: 'row' }} gap={{ base: 8, md: 16 }}>
					{calendarItems.map(({ path, title, onClick, children }, idx) => (
						<>
							<Button
								component={'a'}
								href={path}
								onClick={onClick}
								sx={() => ({ flex: 1 })}
								target={'_blank'}
							>
								{title}
							</Button>
							{/* {
                  !!children && children
                } */}
						</>
					))}
				</Flex>

				{!!gospels.length && (
					<Box key={`${data.date}-gospels`}>
						<Accordion
							defaultValue={gospels?.[0]?.book.slug}
							styles={(theme) => ({
								item: {
									borderBottom: `1px solid ${theme.colors.brand?.[4]}`,
									borderRadius: 4,
									'&:lastChild': {
										borderBottom: '0',
									},
									'&[data-active]': {
										borderBottom: '0 !important',
									},
								},
								control: {
									transition: 'background-color .3s ease',
									backgroundColor: theme.colors.gold[4],
									borderRadius: 4,
									'&:lastChild': {
										borderBottom: '0',
									},
									'&:hover': {
										backgroundColor: theme.colors.gold[3],
									},
								},
								label: {
									color: theme.colors.gold[9],
								},
								chevron: {
									color: theme.colors.gold[9],
								},
							})}
						>
							{gospels.map(({ book, text, audios }) => {
								return (
									<Accordion.Item key={book?.slug} value={book?.slug}>
										<Accordion.Control>{book?.name}</Accordion.Control>
										<Accordion.Panel>
											<Stack gap={16}>
												<Gospel text={text} />

												{!!audios.length &&
													// @ts-ignore
													audios.map(({ title, url }) => {
														if (url.src) {
															return (
																<Stack gap={8} key={url.src}>
																	<Title order={6}>{title}</Title>

																	{/* TODO: DRY (radioRecords) */}
																	<audio
																		controls
																		controlsList={'nodownload'}
																		src={url.src}
																		style={{ width: '100%' }}
																	>
																		<a href={url.src} title={`Скачать ${title}`}>
																			Скачать {title}
																		</a>
																	</audio>
																</Stack>
															);
														}
													})}

												<Group gap={8}>
													<Text
														span
														sx={(theme) => ({ color: theme.colors.brand?.[4], fontSize: 14 })}
													>
														Читать всю книгу:
													</Text>

													<Link href={`/books/${book.slug}`}>
														<Text
															span
															sx={(theme) => ({
																color: theme.colors.gold[4],
																fontSize: 14,
															})}
														>
															{book.name}
														</Text>
													</Link>
												</Group>
											</Stack>
										</Accordion.Panel>
									</Accordion.Item>
								);
							})}
						</Accordion>
					</Box>
				)}

				<Box>
					{Object.keys(data?.parables).length && (
						<Box>
							<Title
								c={'brand.9'}
								order={4}
								sx={(theme) => ({
									padding: 16,
									backgroundColor: theme.colors.brand?.[4],
									borderRadius: 4,
								})}
							>
								Святитель Феофан Затворник. Мысли на каждый день года
							</Title>

							{data?.parables.map(({ text, title }, idx) => {
								return (
									<Stack key={idx}>
										<Text span>{title}</Text>
										<Text
											sx={() => ({
												'&::first-letter': {
													marginLeft: 24,
													fontSize: 24,
												},
											})}
										>
											{text}
										</Text>
									</Stack>
								);
							})}
						</Box>
					)}
				</Box>
			</Stack>

			<Modal
				centered
				onClose={setIsModalOpened.bind(null, false)}
				opened={isModalOpened}
				overlayProps={{
					opacity: 0.55,
					blur: 3,
				}}
				size={'50%'}
				title={
					<Text span sx={(theme) => ({ color: theme.colors.brand?.[4], fontSize: 24 })}>
						Календарь
					</Text>
				}
			>
				<Group justify={'center'}>
					<Calendar />
				</Group>
			</Modal>
		</Box>
	);
};

export default DayPage;
