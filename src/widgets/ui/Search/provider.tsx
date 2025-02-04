import type { ReactNode } from 'react';
import { useEffect, useReducer } from 'react';
import { SearchCard } from '@/entities/Search/ui';
import { client } from '@/shared/graphql/client';
// @ts-ignore
import { SEARCH } from '@/shared/graphql/queries/search/queries.graphql';
import { ActionIcon, Box, Divider, Drawer, Group, Loader, ScrollArea, Stack, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconChevronLeft, IconSearch } from '@tabler/icons-react';
import { useRequest } from 'ahooks';
import { useRouter } from 'next/router';

import { handleToggle, isCalled, isOpen, search, SearchContextProvider } from './context';

const init = () => {
	return {
		search,
		isOpen,
		isCalled,
		handleToggle,
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
		case 'CALL':
			return {
				...state,
				isCalled: true,
			};
		case 'reset':
			return init();
		default:
			throw new Error('Not found the method or unexpected problem');
	}
};

const getSearch = (variables: { query: string; types: Array<string> }) => {
	return client.query({
		query: SEARCH,
		variables,
	});
};

const SearchProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, {}, init);

	const router = useRouter();

	const form = useForm({
		initialValues: {
			search: '',
		},
	});

	const handleToggle = (isOpen: boolean) => {
		dispatch({
			type: 'TOGGLE',
			payload: isOpen,
		});
	};

	const handleCall = () => {
		dispatch({
			type: 'CALL',
			payload: '',
		});
	};

	const {
		data: searchData,
		loading: searchLoading,
		run: handleSearch,
		cancel: searchCancel,
	} = useRequest(getSearch, {
		manual: true,
		debounceWait: 300,
		onBefore: handleCall,
		onSuccess: () => {
			console.log('success');
		},
	});

	useEffect(() => {
		const handleModalClose = () => handleToggle(false);

		router.events.on('routeChangeStart', handleModalClose);

		return () => {
			router.events.off('routeChangeStart', handleModalClose);
		};
	}, [router]);

	const items = searchData?.data?.search ?? [];

	return (
		<>
			<SearchContextProvider value={{ search, handleToggle }}>{children}</SearchContextProvider>

			<Drawer
				closeButtonProps={{
					color: "brand.4",
					iconSize: 32,
				}}
				onClose={handleToggle.bind(null, false)}
				opened={state.isOpen}
				position={"right"}
				size={350}
				title={
					<Group
						wrap="nowrap"
						justify={"space-between"}
					>
						<ActionIcon onClick={handleToggle.bind(null, false)}>
							<IconChevronLeft size={24} />
						</ActionIcon>

						<Title order={5} c={"brand.4"}>
							{"Поиск"}
						</Title>
					</Group>
				}
				withCloseButton={false}
				scrollAreaComponent={ScrollArea.Autosize}
			// styles={(theme, fn) => ({
			// 	close: {
			// 		"&:hover": {
			// 			color: theme.colors.brand?.[9],
			// 		},
			// 	},
			// 	content: {
			// 		[fn.smallerThan("lg")]: {
			// 			height: "auto",
			// 			borderRadius: "4px 0 0 4px",
			// 		},
			// 	},
			// })}
			>
				<Stack gap={32}>
					<Box
						component={'form'}
						onChange={(event) =>
							// NOTE: When single input use target.value
							handleSearch({
								// @ts-ignore
								query: event.target?.value,
								types: ['news', 'articles'],
							})
						}
					>
						<TextInput
							leftSection={<IconSearch size={16} stroke={1} />}
							name={'search'}
							placeholder={'Введите запрос'}
							rightSection={searchLoading && <Loader size={16} />}
							{...form.getInputProps('search')}
						/>
					</Box>

					{/* TODO: Use scroll area */}
					<Stack gap={16}>
						{
							searchLoading && (
								<>
									<SearchCard.Skeleton />
									<SearchCard.Skeleton />
									<SearchCard.Skeleton />
									<SearchCard.Skeleton />
									<SearchCard.Skeleton />
								</>
							)
						}

						{
							!searchLoading && !!items.length && (
								<>
									{
										items.map(
											({ title_short, title_full, slug, category, type, mainImage }: any, idx: number) => {
												const title = title_short ?? title_full;
												const link = `/${type}/${category}/${slug}`;
												let image = { src: '' };

												try {
													image = JSON.parse(mainImage);
												} catch (error) {
													console.error('Image parse error', { error });
												}

												return (
													<>
														<SearchCard
															image={image}
															key={link}
															link={link}
															title={title}
															type={type}
														/>

														{idx !== items.length - 1 && <Divider />}
													</>
												);
											}
										)
									}
								</>
							)
						}

						{!searchLoading && !items.length && form.isDirty('search') && state.isCalled && 'Поиск не дал результатов'}

						{!searchLoading && !items.length && !form.isDirty('search') && 'Введите запрос.'}
					</Stack>
				</Stack>
			</Drawer>
		</>
	);
};

export { SearchProvider };

if (process.env.NODE_ENV === 'development') {
	SearchProvider.displayName = 'SearchProvider';
}
