import { useEffect, useState } from 'react';
import { useProfile } from '@/widgets/ui';
import { Rating, Tooltip } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconInfoCircleFilled, IconStarFilled } from '@tabler/icons-react';

import { useRate, useRateUpdate } from './hooks';

const Rate = ({ contentId }: { contentId: number }) => {
	const [rate, setRate] = useState(0);
	const [self, setSelf] = useState(0);

	const { currentUser } = useProfile();

	const { run: getRate } = useRate({
		manual: true,
		onSuccess: ({ data, errors }: any) => {
			const rating = data?.rate?.aggregate?.avg?.rating ?? 0;
			const self = data?.self?.[0]?.rating;

			if (errors?.length) {
				const error = errors[0] ?? { message: 'Unknown error.' };

				notifications.show({
					title: 'Ошибка!',
					message: error.message,
					color: 'red',
					icon: <IconInfoCircleFilled />,
					withBorder: true,
					sx: (_, fn) => ({
						top: 60,
						[fn.largerThan('md')]: {
							top: 90,
						},
					}),
				});

				return;
			}

			setRate(rating);
			setSelf(self);
		},
		// TODO: Use custom wrapper for useRequest
		onError: (error: Error) => {
			notifications.show({
				title: 'Ошибка!',
				message: error.message,
				color: 'red',
				icon: <IconInfoCircleFilled />,
				withBorder: true,
				sx: (_, fn) => ({
					top: 60,
					[fn.largerThan('md')]: {
						top: 90,
					},
				}),
			});

			console.error('useRateUpdate', error);
		}
	});
	const { run: updateRate } = useRateUpdate({
		manual: true,
		onSuccess: ({ data, errors }: any) => {
			const rating = data?.rate?.returning?.[0]?.rating;

			if (errors?.length) {
				const error = errors[0] ?? { message: 'Unknown error.' };

				notifications.show({
					title: 'Ошибка!',
					message: error.message,
					color: 'red',
					icon: <IconInfoCircleFilled />,
					withBorder: true,
					sx: (_, fn) => ({
						top: 60,
						[fn.largerThan('md')]: {
							top: 90,
						},
					}),
				});

				return;
			}

			notifications.show({
				title: 'Ваш голос учтён.',
				message: 'Спасибо за оценку!',
				color: 'yellow',
				icon: <IconStarFilled />,
				withBorder: true,
				sx: (_, fn) => ({
					top: 60,
					[fn.largerThan('md')]: {
						top: 90,
					},
				}),
			});

			setRate(rating);
			setSelf(rating);
		},
		onError: (error: Error) => {
			notifications.show({
				title: 'Ошибка!',
				message: error.message,
				color: 'red',
				icon: <IconInfoCircleFilled />,
				withBorder: true,
				sx: (_, fn) => ({
					top: 60,
					[fn.largerThan('md')]: {
						top: 90,
					},
				}),
			});

			console.error('useRateUpdate', error);
		}
	});

	useEffect(() => {
		getRate({
			/* @ts-ignore */
			userId: currentUser?.user?.id ?? 0,
			newsId: contentId
		})
	}, [currentUser]);

	return (
		<Tooltip
			color={'brand.4'}
			label={self ? `Ваша оценка: ${self}` : currentUser ? 'Оценить новость' : 'Войдите в аккаунт, чтобы проголосовать.'}
			withArrow
		>
			<Rating
				defaultValue={0}
				onChange={rating => {
					{/* @ts-ignore */ }
					if (rating && currentUser?.user?.id && contentId) {
						updateRate({
							rating,
							/* @ts-ignore */
							userId: currentUser?.user?.id,
							newsId: contentId
						});
					}
				}}
				readOnly={!!self || !currentUser}
				value={rate}
			/>
		</Tooltip>
	);
}

export default Rate;
