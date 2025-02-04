import type { ReactNode } from 'react';
import { useEffect, useReducer } from 'react';
import { createElement } from 'react';
import { Box, Group, Stack, Text, Title, Transition } from '@mantine/core';
import { useRouter } from 'next/router';

import { CalendarMenu, ContentMenu, ImageMenu, InfoMenu } from '../components';

import {
	handleOpen,
	handleSetMenu,
	handleToggle,
	handleWrapperToggle,
	isOpen,
	isWrapperOpen,
	menu,
	VerticalMenuContextProvider,
} from './context';

export type SubMenu = {
	img: {
		src: string;
	};
	url: string;
	title: string;
};
type Components = 'InfoMenu' | 'ContentMenu' | 'ImageMenu' | 'CalendarMenu';

const components: Record<Components, ({ sub }: { sub: Array<SubMenu> }) => ReactNode> = {
	InfoMenu,
	ContentMenu,
	ImageMenu,
	CalendarMenu,
};

const init = () => {
	return {
		menu,
		isOpen,
		isWrapperOpen,
		handleOpen,
		handleToggle,
		handleSetMenu,
		handleWrapperToggle,
	};
};

const subMenuWidth = 300;

const toRight = {
	in: {
		width: `calc(90% - ${subMenuWidth}px)`,
	},
	out: { width: 0 },
	common: { transformOrigin: 'left' },
	transitionProperty: 'width',
};

// @ts-ignore
const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'SIGN_IN':
			return {
				...state,
				isSignIn: payload,
			};
		case 'SIGN_UP':
			return {
				...state,
				isSignUp: payload,
			};
		case 'TOGGLE':
			return {
				...state,
				isOpen: payload,
			};
		case 'WRAPPER_TOGGLE':
			return {
				...state,
				isWrapperOpen: payload,
			};
		case 'SET_MENU':
			return {
				...state,
				menu: payload,
			};
		case 'reset':
			return init();
		default:
			throw new Error('Not found the method or unexpected problem');
	}
};

const componentTitle = {
	ContentMenu: 'Nazghoolный Nazghool Nazghoolский',
	CalendarMenu: ' Церковный календарь',
} as Record<Components, string>;

export const VerticalMenuProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, {}, init);

	const router = useRouter();

	const handleOpen = (data: any) => {
		if (state.menu.title !== data.title || state.menu.component !== data.component) {
			dispatch({
				type: 'SET_MENU',
				payload: data,
			});

			dispatch({
				type: 'TOGGLE',
				payload: true,
			});
		}
	};

	const handleToggle = (opened: boolean) => {
		dispatch({
			type: 'TOGGLE',
			payload: opened,
		});
	};

	const handleSetMenu = (menu: Record<string, unknown>) => {
		dispatch({
			type: 'SET_MENU',
			payload: menu,
		});
	};

	const handleWrapperToggle = (opened: boolean) => {
		dispatch({
			type: 'WRAPPER_TOGGLE',
			payload: opened,
		});
	};

	const handleClose = () => {
		dispatch({
			type: 'TOGGLE',
			payload: false,
		});
	};

	useEffect(() => {
		const handleModalClose = () => {
			handleSetMenu({});
			handleClose();
		};

		router.events.on('routeChangeStart', handleModalClose);

		return () => {
			router.events.off('routeChangeStart', handleModalClose);
		};
	}, [router]);

	const component: Components = state.menu?.component;
	const title = state.menu?.title ?? componentTitle[component];
	const description = state.menu?.description;
	const sub = state.menu?.sub;
	const button = state.menu?.button;

	return (
		<>
			<VerticalMenuContextProvider
				value={{
					isOpen: state.isOpen,
					isWrapperOpen: state.isWrapperOpen,
					menu: state.menu,
					handleOpen,
					handleToggle,
					handleSetMenu,
					handleWrapperToggle,
				}}
			>
				{children}
			</VerticalMenuContextProvider>

			<Transition
				duration={400}
				keepMounted
				key={component}
				mounted={state.isOpen && state.isWrapperOpen}
				onExited={() => {
					handleSetMenu({});
					handleWrapperToggle(false);
				}}
				timingFunction="ease"
				transition={toRight}
			>
				{(styles) => (
					<Box
						// ref={clickOutsideRef}
						style={styles}
						sx={(theme) => ({
							position: 'fixed',
							top: 96,
							left: 300,
							backgroundColor: 'rgba(63, 37, 18, 0.95)',
							zIndex: 9,
							borderRadius: '0 4px 4px 0',
							borderTop: `1px solid ${theme.colors.gold[4]}`,
							borderRight: `1px solid ${theme.colors.gold[4]}`,
							borderBottom: `1px solid ${theme.colors.gold[4]}`,
							overflow: 'hidden',
						})}
					>
						<Box
							p={16}
							sx={{
								height: 'calc(100vh - 116px)',
								width: 'calc(90vw - 300px - 6px)',
							}}
						>
							<Stack gap={16} sx={() => ({ height: '100%' })}>
								<Group justify={'space-between'}>
									{title && (
										<Title c={'money.9'} order={2}>
											{title}
										</Title>
									)}

									{button && button}
								</Group>
								{
									description && <Text c={'money.8'}>{description}</Text>
								}

								{createElement(components[component] ?? 'div', { sub })}
							</Stack>
						</Box>
					</Box>
				)}
			</Transition>
		</>
	);
};

if (process.env.NODE_ENV === 'development') {
	VerticalMenuProvider.displayName = 'VerticalMenuProvider';
}
