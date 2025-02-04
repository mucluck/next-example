import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import type { MantineThemeOverride } from "@mantine/core";
import { Tenor_Sans } from "next/font/google";
import { client } from "@/shared/graphql/client";
import App from "next/app";
import type { AppContext, AppProps } from "next/app";

// @ts-ignore
import { MENU } from "@/shared/graphql/queries/menu/queries.graphql";

import { Footer } from "@/widgets/ui";
import { MenuVertical } from "@/widgets/ui";

import { Layout } from "@/shared/ui";

const tenorSans = Tenor_Sans({ weight: "400", style: "normal", subsets: ["latin"] });

const theme: Partial<MantineThemeOverride> = {
	...tenorSans?.style,
	colors: {
		brand: [
			"#988347",
			"#BA8E6E",
			"#885A39",
			"#5C3A21",
			"#3F2512",
			"#1C110A",
			"#0C0805",
			"#050403",
			"#020201",
			"#010101",
		],
		white: ["#FFF"],
	},
	shadows: {
		xl: "0 0 10px 5px #bab8b6",
	},
	components: {
		Container: {
			defaultProps: {
				px: {
					base: 8,
					md: 16,
				},
				sizes: {
					xs: 540,
					sm: 720,
					md: 960,
					lg: 1140,
					xl: 1320,
				},
			},
		},
	},
	primaryColor: "brand",
	colorScheme: "light",
	loader: "dots",
};

const Nazghool = ({ Component, pageProps }: AppProps) => {
	const { layout, menu } = pageProps;

	return (
		<>
			<Head>
				<title>{layout?.title}</title>
				<meta
					name="viewport"
					content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no;user-scalable=5;"
				/>
			</Head>

			<MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
				<MenuVertical menu={menu?.main} />

				<Notifications position={"top-center"} />

				<Layout config={layout}>
					<Component {...pageProps} />
				</Layout>

				<Footer menu={menu?.footer} />
			</MantineProvider>
			<style jsx global>
				{`
					#__next {
						height: 100%;
						display: flex;
						flex-direction: column;
					}
					a {
						text-decoration: none !important;
						color: #988346;
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

	return {
		...appProps,
		pageProps: {
			...appProps.pageProps,
			menu: menuData,
		},
	};
};
