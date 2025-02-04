import 'moment/locale/ru';
import julian, { convertToDate } from '@/shared/utils/JulianDate';
import { Box, Flex, Stack, Text } from '@mantine/core';
import { Calendar as MCalendar } from '@mantine/dates';
import moment from 'moment';
import Link from 'next/link';

moment.locale('ru');

const Calendar = () => {
	return (
		<MCalendar
			locale={'ru'}
			renderDay={(date: Date) => {
				const day = date.getDate();
				const month = date.getMonth();
				const year = date.getFullYear();
				const current = new Date();

				const isCurrent =
					day === current.getDate() && month === current.getMonth() && year === current.getFullYear();

				return (
					<Box
						component={Link}
						href={`/calendar/${moment(date).format('YYYY-MM-DD')}`}
						style={{
							width: '100%',
							height: '100%',
						}}
						title={`Перейти к ${moment(date).locale('ru').format('DD.MM.YYYY')} в календаре`}
					>
						<Stack
							gap={0}
							sx={(_, fn) => ({ [fn.largerThan('md')]: { padding: '4px 12px' } })}
						>
							<Flex
								align={'center'} gap={4}
								justify={{ base: 'center', md: 'flex-start' }}
							>
								<Text
									span
									sx={(theme) => ({
										color: theme.colors.brand?.[4],
										fontSize: 32,
										fontWeight: 700,
									})}
								>
									{day}
								</Text>

								{
									isCurrent && (
										<Flex
											direction={'column'}
											sx={(_, fn) => ({
												display: 'none',
												[fn.largerThan('md')]: { display: 'flex' },
											})}
										>
											<Text
												span
												sx={(theme) => ({
													color: theme.colors.money[4],
													fontSize: 12,
													fontWeight: 600,
												})}
											>
												{moment(date).format('MMM')}
											</Text>
											<Text
												span
												sx={(theme) => ({
													color: theme.colors.money[4],
													fontSize: 12,
												})}
											>
												cегодня
											</Text>
										</Flex>
									)
								}
							</Flex>

							<Text
								span
								sx={(theme, fn) => ({
									display: 'none',
									[fn.largerThan('md')]: { display: 'initial' },
									color: theme.colors.money[4],
									fontSize: 14,
								})}
							>
								{/* FIXME: julian date */}
								{
									// @ts-ignore
									moment(convertToDate(julian(date)))
									.subtract(13, 'days')
										.format('D MMMM')
								}
								{'\t'} по ст. c.
							</Text>
						</Stack>
					</Box>
				);
			}}
			size={'xl'}
			styles={(theme, fn) => (
				{
					calendar: {
						width: '100%',
					},
					monthLevel: {
						display: 'flex',
						flexDirection: 'column-reverse',
					},
					monthLevelGroup: {
						width: '100%',
					},
					month: {
						width: '100%',
					},
					calendarHeader: {
						maxWidth: '100%',
					},
					monthCell: {
						padding: '2px !important',
					},
					day: {
						width: '100%',
						flex: 1,
						borderRadius: 12,
						height: 'auto',
						'&[data-outside]': {
							opacity: 0.3,
						},
						border: `1px solid ${theme.colors.money[8]}`,
						'&[data-today]': {
							border: 'none',
							backgroundColor: theme.colors.money[8]
						},
						'&:hover': {
							backgroundColor: `${theme.colors.gold[7]} !important`
						}
					},
					weekday: {
						paddingBottom: 0,
						textAlign: 'left',
						paddingLeft: 16,
						fontSize: 14,
					},
				}
			)}
		/>
	);
};

export default Calendar;
