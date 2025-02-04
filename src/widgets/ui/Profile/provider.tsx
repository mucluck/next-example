import type { ReactNode } from 'react';
import { useEffect, useReducer, useState } from 'react';
// import { HttpLink } from '@apollo/client';
// import { client } from "@/shared/graphql/client";
import config from '@/shared/config';
import {
	Box,
	Button,
	Checkbox,
	Drawer,
	Group,
	PasswordInput,
	SegmentedControl,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
	IconAt,
	IconCircleCheck,
	IconExclamationCircle,
	IconLock,
	IconPhone,
	IconUser,
} from '@tabler/icons-react';
import { useLocalStorageState, useRequest, useSessionStorageState } from 'ahooks';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { currentUser, profile, ProfileContextProvider } from './context';

const init = () => {
	return {
		profile,
		setProfile: () => { },
		isSignIn: false,
		token: config.token,
		currentUser
	};
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
		case 'SET_TOKEN':
			const currentUser = payload ? jwtDecode(payload) : null;

			return {
				...state,
				currentUser,
				token: payload,
			};
		case 'SET_USER': {
			return {
				...state,
				token: payload,
			};
		}
		case 'reset':
			return init();
		default:
			throw new Error('Not found the method or unexpected problem');
	}
};

const signIn = (body = {}) => {
	const headers = new Headers();

	headers.append('Content-Type', 'application/json');

	// @ts-ignore
	delete body.remember;

	// TODO: use Axios instance
	const request = new Request(`https://${config.apiURL}/auth/signin`, {
		method: 'POST',
		headers,
		body: JSON.stringify(body),
		mode: 'cors',
		credentials: 'include',
		redirect: 'follow',
	});

	return fetch(request).then((response) => response.json());
};

export const useRestorePassword = (options = {}) => {
	const restorePassword = (body = {}) => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const request = new Request(`https://${config.apiURL}/passwords/reset`, {
			method: 'POST',
			headers,
			body: JSON.stringify(body),
			mode: 'cors',
			credentials: 'include',
			redirect: 'follow',
		});

		return fetch(request);
	};

	return useRequest(restorePassword, options);
};

export function getToken(onSuccess = () => Function, onError = () => Function) {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');

	const request = new Request(`${process.env.GATSBY_API_ENDPOINT}/api/auth`, {
		method: 'GET',
		headers,
		mode: 'cors',
		credentials: 'include',
		redirect: 'follow',
	});

	fetch(request)
		.then((response) => response.json())
		// @ts-ignore
		.then((data) => onSuccess(data))
		// @ts-ignore
		.catch((error) => onError(error));
}

export function signOut(onSuccess = () => Function, onError = () => Function) {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	// 10.0.1.32:3000
	const request = new Request(`${config.apiURL}/api/auth`, {
		method: 'DELETE',
		headers,
		mode: 'cors',
		credentials: 'include',
		redirect: 'follow',
	});

	fetch(request)
		.then(onSuccess)
		// @ts-ignore
		.catch((error) => onError(error));
}

const signUp = (body = {}) => {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');

	const request = new Request(`https://${config.apiURL}/auth/signup`, {
		method: 'POST',
		headers,
		body: JSON.stringify(body),
		mode: 'cors',
		credentials: 'include',
		redirect: 'follow',
	});

	return fetch(request).then((response) => response.json());
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
	const router = useRouter();

	const [state, dispatch] = useReducer(reducer, {}, init);

	const [localToken, setLocalToken] = useLocalStorageState<string | undefined>('token', {
		defaultValue: '',
	});
	const [sessionToken, setSessionToken] = useSessionStorageState<string | undefined>('token', {
		defaultValue: '',
	});

	const handleToggleSignIn = (isSignIn: boolean) => {
		dispatch({
			type: 'SIGN_IN',
			payload: isSignIn,
		});
	};

	const handleToggleSignUp = (isSignIn: boolean) => {
		dispatch({
			type: 'SIGN_UP',
			payload: isSignIn,
		});
	};

	const logOut = () => {
		setLocalToken('');
		setSessionToken('');

		dispatch({
			type: 'SET_TOKEN',
			payload: '',
		});
	};

	const authForm = useForm({
		name: 'auth-form',
		initialValues: {
			login: '',
			password: '',
			remember: false,
		},
		validate: {
			login: isNotEmpty('Введите логин!'),
			password: isNotEmpty('Введите пароль!'),
		},
	});

	const registerForm = useForm({
		name: 'register-form',
		initialValues: {
			login: '',
			password: '',
			password_confirmation: '',
			confirm: false,
			type: 'email'
		},
		validate: {
			login: (value, values) => {
				if (values.type === 'phone') {
					return isNotEmpty('Введите номер телефона!')(value);
				}

				return isEmail('Некорректный E-mail!')(value);
			},
			password: isNotEmpty('Введите пароль!'),
			password_confirmation: (value, values) => (value !== values.password ? 'Пароли не совпадают' : null),
		},
		onValuesChange(values, previous) {
			if (values?.type !== previous?.type) {
				registerForm.setFieldValue('login', '');
			}
		},
	});

	const { loading: isLoggedIn, run: auth } = useRequest(signIn, {
		manual: true,
		onSuccess: ({ data }: any) => {
			const token = data?.token ?? '';

			// const link = client.link;
			// const HTTPLink = new HttpLink({
			// 	headers: {
			// 		"Authorization": `Bearer ${token}`,
			// 	},
			// });

			// client.setLink(link.concat(HTTPLink))

			if (token) {
				if (authForm.values?.remember) {
					setLocalToken(token);
				} else {
					setSessionToken(token);
				}

				authForm.reset();

				notifications.show({
					title: 'Авторизация прошла успешно!',
					message: 'Приятного просмотра.',
					color: 'green',
					icon: <IconCircleCheck />,
					withBorder: true,
					sx: (_, fn) => ({
						top: 60,
						[fn.largerThan('md')]: {
							top: 90,
						},
					}),
				});

				handleToggleSignIn(false);

				return;
			}

			notifications.show({
				title: 'Ошибка авторизации.',
				message: data.title,
				color: 'red',
				icon: <IconExclamationCircle />,
				withBorder: true,
				sx: (_, fn) => ({
					top: 60,
					[fn.largerThan('md')]: {
						top: 90,
					},
				}),
			});
		},
		onError: (error) => {
			notifications.show({
				title: 'Ошибка авторизации.',
				message: 'Повторите попытку позже.',
				color: 'red',
				icon: <IconExclamationCircle />,
				withBorder: true,
				sx: (_, fn) => ({
					top: 60,
					[fn.largerThan('md')]: {
						top: 90,
					},
				}),
			});

			console.error('signIn', { error });
		},
	});

	const { loading: registerLoading, run: register } = useRequest(signUp, {
		manual: true,
		onSuccess: (data: any) => {
			if (+data.status === 200) {
				notifications.show({
					title: 'Регистрация прошла успешно!',
					message: 'Следуйе иснструкциям по указанному Вами телефону или E-mail.',
					color: 'green',
					icon: <IconCircleCheck />,
					withBorder: true,
					sx: (_, fn) => ({
						top: 60,
						[fn.largerThan('md')]: {
							top: 90,
						},
					}),
				});

				registerForm.reset();

				handleToggleSignIn(false);

				return;
			}

			notifications.show({
				title: 'Ошибка регистрации.',
				message: `${data?.data?.title}.`,
				color: 'red',
				icon: <IconExclamationCircle />,
				withBorder: true,
				sx: (_, fn) => ({
					top: 60,
					[fn.largerThan('md')]: {
						top: 90,
					},
				}),
			});
		},
		onError: (error) => {
			notifications.show({
				title: 'Ошибка регистрации.',
				message: 'Повторите попытку позже.',
				color: 'red',
				icon: <IconExclamationCircle />,
				withBorder: true,
				sx: (_, fn) => ({
					top: 60,
					[fn.largerThan('md')]: {
						top: 90,
					},
				}),
			});

			console.error('signUp', { error });
		},
	});

	useEffect(() => {
		const token = localToken || sessionToken || '';

		dispatch({
			type: 'SET_TOKEN',
			payload: token,
		});
	}, [localToken, sessionToken]);

	useEffect(() => {
		const handleModalClose = () => {
			handleToggleSignUp(false);
			handleToggleSignIn(false);
		};

		router.events.on('routeChangeStart', handleModalClose);

		return () => {
			router.events.off('routeChangeStart', handleModalClose);
		};
	}, [router]);

	useEffect(() => {
		registerForm.clearErrors();
	}, [registerForm.values.type]);

	return (
		<>
			<ProfileContextProvider
				value={{
					profile,
					setProfile: () => { },
					handleToggleSignIn,
					handleToggleSignUp,
					logOut,
					isSignIn: state.isSignIn,
					isSignUp: state.isSignUp,
					token: state.token,
					currentUser: state.currentUser
				}}
			>
				{children}
			</ProfileContextProvider>

			<Drawer
				closeButtonProps={{
					c: 'brand.4',
					iconSize: 32,
					styles: (theme) => {
						return {
							'&:hover': {
								color: theme.colors.brand[9]
							}
						}
					}
				}}
				onClose={handleToggleSignIn.bind(null, false)}
				opened={state.isSignIn}
				position={'right'}
				size={350}
				title={<Title order={4}>{'Войти'}</Title>}
			>
				<Box component={'form'} onSubmit={authForm.onSubmit(auth)}>
					<Stack>
						<TextInput
							label={'Введите логин'}
							leftSection={<IconUser size={16} stroke={1} />}
							name={'login'}
							placeholder={'Логин'}
							withAsterisk
							{...authForm.getInputProps('login')}
							disabled={isLoggedIn}
						/>

						<PasswordInput
							label={'Введите пароль'}
							leftSection={<IconLock size={16} stroke={1} />}
							name={'password'}
							placeholder={'Пароль'}
							withAsterisk
							{...authForm.getInputProps('password')}
							disabled={isLoggedIn}
						/>

						<Button
							disabled={isLoggedIn}
							fullWidth
							loading={isLoggedIn}
							type="submit"
						>
							Войти
						</Button>

						<Checkbox
							label={<Text fz={16} span>Запомнить меня</Text>}
							{...authForm.getInputProps('remember', { type: 'checkbox' })}
						/>

						<Link href={'/profile/restore-password'} title={'Восстановить пароль'}>
							<Text c={'gold.4'} span>Восстановить пароль</Text>
						</Link>

					</Stack>
				</Box>
			</Drawer>

			<Drawer
				closeButtonProps={{
					color: 'brand.4',
					iconSize: 32
				}}
				keepMounted={false}
				onClose={() => {
					handleToggleSignUp(false);

					registerForm.reset();
				}}
				opened={state.isSignUp}
				position={'right'}
				size={350}
				title={<Title order={4}>{'Регистрация'}</Title>}
			>
				<Box component={'form'} onSubmit={registerForm.onSubmit(register)}>
					<Stack>
						<SegmentedControl
							data={[
								{ label: 'E-mail', value: 'email' },
								{ label: 'Телефон', value: 'phone' },
							]}
							name={'type'}
							{...registerForm.getInputProps('type')}
						/>

						{registerForm.values.type === 'email' && (
							<TextInput
								label={'Введите E-mail'}
								leftSection={<IconAt size={16} stroke={1} />}
								name={'login'}
								placeholder={'E-mail'}
								type={'email'}
								withAsterisk
								{...registerForm.getInputProps('login')}
							/>
						)}

						{registerForm.values.type === 'phone' && (
							<TextInput
								label={'Введите номер телефона'}
								leftSection={<IconPhone size={16} stroke={1} />}
								name={'login'}
								placeholder={'Номер телефона'}
								type={'tel'}
								withAsterisk
								{...registerForm.getInputProps('login')}
							/>
						)}

						<PasswordInput
							label={'Придумайте пароль'}
							leftSection={<IconLock size={16} stroke={1} />}
							name={'password'}
							placeholder={'Пароль'}
							withAsterisk
							{...registerForm.getInputProps('password')}
						/>

						<PasswordInput
							label={'Повторите пароль'}
							leftSection={<IconLock size={16} stroke={1} />}
							name={'password_confirmation'}
							placeholder={'Повтор пароля'}
							withAsterisk
							{...registerForm.getInputProps('password_confirmation')}
						/>

						<Button
							disabled={!registerForm.values?.confirm || registerLoading}
							fullWidth
							loading={registerLoading}
							type="submit"
						>
							Зарегистрироваться
						</Button>

						<Checkbox
							label={
								<Group gap={0}>
									<Text fz={16} span>Я принимаю условия</Text>

									<Link href="/pages/polzovatelskoe-soglashenie" target={'_blank'}>
										<Text fz={16} span>
											Пользовательского соглашения
										</Text>
									</Link>

									<Text fz={16} span>
										и даю своё согласие Nazghool.рф на обработку моей персональной информации на
										условиях, определенных
									</Text>

									<Link href="/pages/politika-konfidencialnosti" target="_blank">
										<Text fz={16} span>
											Политикой конфиденциальности
										</Text>
									</Link>.
								</Group>
							}
							{...registerForm.getInputProps('confirm')}
						/>
					</Stack>
				</Box>
			</Drawer>
		</>
	);
};

if (process.env.NODE_ENV === 'development') {
	ProfileProvider.displayName = 'ProfileProvider';
}
