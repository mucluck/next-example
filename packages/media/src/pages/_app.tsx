import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'photoswipe/dist/photoswipe.css';
import 'dayjs/locale/ru';
import { emotionCache } from '@/cache/cache';
import { client } from '@/shared/graphql/client';
// @ts-ignore
import { MENU } from '@/shared/graphql/queries/menu/queries.graphql';
// @ts-ignore
import { RADIO } from '@/shared/graphql/queries/radio/queries.graphql';
import { theme } from '@/shared/themes';
import { Layout } from '@/shared/ui';
import {
	BlindProvider,
	FiltersProvider,
	Footer,
	MenuHorizontal,
	MenuMobile,
	MenuVertical,
	ProfileProvider,
	RadioProvider,
	SearchProvider
} from '@/widgets/ui';
import { MantineProvider } from '@mantine/core';
import { DatesProvider } from '@mantine/dates';
import { emotionTransform, MantineEmotionProvider } from '@mantine/emotion';
import { Notifications } from '@mantine/notifications';
import type { AppContext, AppProps } from 'next/app';
import App from 'next/app';
import Head from 'next/head';

const Nazghool = ({ Component, pageProps }: AppProps) => {
	const { layout, menu, radio, filters, ...props } = pageProps;

	return (
		<>
			<MantineEmotionProvider cache={emotionCache}>
				<MantineProvider
					defaultColorScheme={'light'}
					forceColorScheme={'light'}
					stylesTransform={emotionTransform}
					theme={theme}
				>
					<Notifications
						position={'top-center'}
					/>

					<Head>
						<meta
							content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=5;"
							name="viewport"
						/>
						<meta content="#3e2512" name="theme-color"></meta>

						<link
							crossOrigin=""
							href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
							integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
							rel="stylesheet"
						/>
					</Head>

					<DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 1, weekendDays: [0, 6] }}>
						<RadioProvider radio={radio?.radio ?? []}>
							<ProfileProvider>
								<SearchProvider>
									<FiltersProvider filters={filters}>
										<MenuHorizontal menu={menu?.top} />

										<MenuMobile menu={menu?.main} />
										<MenuVertical menu={menu?.main} />

										<Layout config={layout}>
											<Component {...props} />
										</Layout>

										<Footer menu={menu?.footer} />
									</FiltersProvider>
								</SearchProvider>
							</ProfileProvider>
						</RadioProvider>
					</DatesProvider>

					{/* <BlindProvider>

					</BlindProvider> */}
				</MantineProvider>
			</MantineEmotionProvider>

			<style global jsx>
				{`
					html {
						height: 100%;
					}
					body {
						height: 100%;
					}
					#__next {
						height: 100%;
						display: flex;
						flex-direction: column;
					}
					a {
						text-decoration: none;
					}

					p a {
						color: inherit;
						text-decoration: underline;
					}
					p a:hover {
						text-decoration: none !important;
					}

					.custom-map {
						width: 100%;
						height: 100%;
					}

					.custom-map__icon {
						object-fit: cover;
					}

					.leaflet-top {
						z-index: 400 !important;
					}
					.leaflet-popup-content-wrapper {
						min-width: 250px;
					}
					.leaflet-popup-content {
						font-size: step(1.80);
						text-align: center;
					}
					.leaflet-popup-content p {
						margin-top: 10px;
					}
					.map-preview-img {
						width: 100%;
						height: 110px;
						object-fit: cover;
					}
					.popup-img-wrapper:hover {
						cursor: pointer;
					}
				`}
			</style>
		</>
	);
};

export default Nazghool;

Nazghool.getInitialProps = async (appContext: AppContext) => {
	const appProps = await App.getInitialProps(appContext);

	const { data: menuData } = await client.query({
		query: MENU,
	});
	const { data: radioData } = await client.query({
		query: RADIO,
	});

	return {
		...appProps,
		pageProps: {
			...appProps.pageProps,
			menu: menuData,
			radio: radioData,
		},
	};
};
