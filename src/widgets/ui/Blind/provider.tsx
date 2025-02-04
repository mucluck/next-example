// @ts-nocheck
import type { ReactNode } from 'react';
import { useReducer } from 'react';
import { ActionIcon, Box, Drawer, Group, Input, SegmentedControl, Stack, Title } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { hasLength, isEmail, isInRange, isNotEmpty, matches, useForm } from '@mantine/form';
import { IconChevronLeft } from '@tabler/icons-react';
import { Noto_Serif } from 'next/font/google';

import { BlindContextProvider, theme } from './context';
const handleToggle = (isOpen: boolean) => { };

const init = () => {
	return {
		theme,
		setProfile: () => { },
		handleToggle,
		isSignIn: false,
	};
};

// @ts-ignore
const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'TOGGLE':
			return {
				...state,
				isOpen: payload,
			};
		case 'reset':
			return init();
		default:
			throw new Error('Not found the method or unexpected problem');
	}
};

const notoSerif = Noto_Serif({
	weight: '400',
	style: 'normal',
	subsets: ['latin'],
});

const black = ['#0D0D0D', '#0A0A0A', '#070707', '#040404', '#000000', '#3D3D3D', '#7A7A7A', '#B7B7B7', '#F2F2F2'];
const brand = [
	'#1D1108',
	'#26160A',
	'#2F1B0C',
	'#38200E',
	'#3F2512',
	'#644E3D',
	'#897768',
	'#AEA093',
	'#D3C9BE',
	'#F9F1EB',
];
const gold = [
	'#2C2614',
	'#473D20',
	'#62542C',
	'#7D6B38',
	'#988346',
	'#AB9A68',
	'#BEB18A',
	'#D1C8AC',
	'#E4DFCE',
	'#F7F5EE',
];

const colors = {
	black: {
		brand: black,
		gold: black,
		money: black,
		white: ['#fff'],
	},
	brand: {
		brand,
		gold: brand,
		money: brand,
		white: ['#fff'],
	},
	gold: {
		brand: gold,
		gold,
		money: gold,
		white: ['#fff'],
	},
};

export const BlindProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, {}, init);

	const form = useForm({
		initialValues: {
			serif: '',
			lineHeight: '',
			fontSize: '',
			color: '',
			img: '',
		},
	});

	const handleToggle = (isOpen: boolean) => {
		dispatch({
			type: 'TOGGLE',
			payload: isOpen,
		});
	};

	return (
		<>
			<BlindContextProvider
				value={{
					theme,
					handleToggle,
				}}
			>
				{children}
				{/* <MantineProvider
					theme={{
						...(form.values.serif ? notoSerif.style : {}),
						...{ fontSize: `${form.values.fontSize} !important` },
						...{ lineHeight: `${form.values.lineHeight} !important` },
						...(form.values.color ? { colors: colors[form.values.color] } : {}),
						other: {
							color: "black !important",
							filter: "grayscale(1) !important",
							img: {
								filter: "grayscale(1) !important",
							},
							"*": {
								filter: "grayscale(1) !important",
							},
						},
					}}
					inherit
				>
					{children}
				</MantineProvider> */}
			</BlindContextProvider>

			<Drawer
				closeButtonProps={{
					color: 'brand.4',
					iconSize: 32,
				}}
				onClose={handleToggle.bind(null, false)}
				opened={state.isOpen}
				position={'right'}
				size={450}
				styles={(theme) => ({
					// content: {
					// 	[fn?.smallerThan('lg')]: {
					// 		height: 'auto',
					// 		borderRadius: '4px 0 0 4px',
					// 	},
					// },
				})}
				title={
					<Group position={'apart'} wrap={'nowrap'}>
						<ActionIcon onClick={handleToggle.bind(null, false)}>
							<IconChevronLeft size={24} />
						</ActionIcon>

						<Title
							color={'brand.4'} order={5}
							style={{ paddingRight: 0 }}>
							{'Настройка для слабовидящих'}
						</Title>
					</Group>
				}
				withCloseButton={false}
			>
				<Box
					component={'form'}
					name={'blind'}
					onChange={form.onSubmit(console.log)}
					onSubmit={form.onSubmit(console.log)}
				>
					<Stack gap={16}>
						<Input.Wrapper label={'Шрифт'}>
							<div>
								<SegmentedControl
									data={[
										{ value: '', label: 'Обычный' },
										{ value: 'serif', label: 'С засечкам' },
									]}
									fullWidth
									name={'serif'}
									transitionDuration={500}
									transitionTimingFunction={'linear'}
									{...form.getInputProps('serif')}
								/>
							</div>
						</Input.Wrapper>

						<Input.Wrapper label={'Размер шрифта'}>
							<div>
								<SegmentedControl
									data={[
										{ value: '', label: 'A' },
										{ value: '20px', label: 'A+' },
										{ value: '24px', label: 'A++' },
									]}
									fullWidth
									name={'fontSize'}
									transitionDuration={500}
									transitionTimingFunction={'linear'}
									{...form.getInputProps('fontSize')}
								/>
							</div>
						</Input.Wrapper>

						<Input.Wrapper label={'Вертикальный интервал'}>
							<div>
								<SegmentedControl
									data={[
										{ value: '', label: '1' },
										{ value: '32px', label: '1.5' },
										{ value: '48px', label: '2' },
									]}
									fullWidth
									name={'lineHeight'}
									transitionDuration={500}
									transitionTimingFunction={'linear'}
									{...form.getInputProps('lineHeight')}
								/>
							</div>
						</Input.Wrapper>

						<Input.Wrapper label={'Цвет шрифта'}>
							<div>
								<SegmentedControl
									data={[
										{ value: '', label: 'Выкл' },
										{ value: 'black', label: 'Чёрный' },
										{ value: 'brand', label: 'Основной' },
										{ value: 'gold', label: 'Акцент' },
									]}
									fullWidth
									name={'color'}
									transitionDuration={500}
									transitionTimingFunction={'linear'}
									{...form.getInputProps('color')}
								/>
							</div>
						</Input.Wrapper>

						<Input.Wrapper label={'Изображения'}>
							<div>
								<SegmentedControl
									data={[
										{ value: '', label: 'Цветные' },
										{ value: 'gray', label: 'Ч/Б' },
										{ value: 'off', label: 'Выкл' },
									]}
									fullWidth
									name={'img'}
									transitionDuration={500}
									transitionTimingFunction={'linear'}
									{...form.getInputProps('img')}
								/>
							</div>
						</Input.Wrapper>
					</Stack>
				</Box>
			</Drawer>

			<style global jsx>
				{`
					img {
						${form.values?.img === 'gray' ? 'filter: grayscale(1) !important;' : ''}
						${form.values?.img === 'off' ? 'opacity: 0 !important;' : ''}
					}

					* {
						${form.values?.fontSize ? `font-size: ${form.values?.fontSize} !important;` : ''}
					}
				`}
			</style>
		</>
	);
};

if (process.env.NODE_ENV === 'development') {
	BlindProvider.displayName = 'BlindProvider';
}
