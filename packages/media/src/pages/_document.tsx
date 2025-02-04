import { emotionCache } from '@/cache/cache';
import createEmotionServer from '@emotion/server/create-instance';
import { ColorSchemeScript } from '@mantine/core';
import { createGetInitialProps } from '@mantine/emotion';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';

const stylesServer = createEmotionServer(emotionCache);

export default function Document() {
	return (
		<Html lang="ru">
			<Head>
				<ColorSchemeScript />

				<link href={'/favicon.svg'} rel={'shortcut icon'} />
				<link href={'/manifest.webmanifest'} rel={'manifest'} />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

Document.getInitialProps = createGetInitialProps(
	NextDocument,
	stylesServer
);
