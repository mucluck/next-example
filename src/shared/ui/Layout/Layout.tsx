import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/shared/ui';
import { Filters } from '@/widgets/ui';
import { ActionIcon, Affix, Box, Container, Flex, Space, Title, Transition } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { IconArrowBigUpLineFilled } from '@tabler/icons-react';
import Head from 'next/head';

import { SEO } from './SEO';

type Image = { src: string };
type LayoutProps = {
	children: ReactNode;
	config: {
		cover: {
			preview: Image,
			mobile?: Image
		},
		title: string;
		breadcrumbs: Array<Breadcrumb>;
		isMain: boolean;
		seo: {
			html: {
				title: string,
				description: string,
				noindex: string,
				keywords: string
			},
			og: {
				title: string
				description: string
				image: Image
				site_name: string
			}
		}
		image: Image,
		slug: string,
		body: string,
	};
};

const Layout = ({ children, config }: LayoutProps) => {
	const [scroll, scrollTo] = useWindowScroll();

	const isMain = config?.isMain;
	const breadcrumbs = config?.breadcrumbs ?? [];
	const title = config?.seo?.html?.title || config?.title

	const preview = config?.cover?.preview?.src;
	const mobile = config?.cover?.mobile?.src;

	return (
		<>
			<Head>
				<title>
					{
						`${title} | Nazghoolова Земля`
					}
				</title>

				<SEO
					body={config?.body}
					config={config?.seo}
					image={config?.image}
					slug={config?.slug}
					title={config?.title}
				/>
			</Head>

			<Affix position={{ bottom: 40, right: 40 }}>
				<Transition mounted={scroll.y > 0} transition="slide-up">
					{(transitionStyles) => (
						<Box style={transitionStyles}>
							<ActionIcon
								onClick={() => scrollTo({ y: 0 })}
								radius={'50%'}
								size={'lg'}
								sx={theme => ({
									color: theme.colors.brand?.[9],
									transition: 'background-color .3s ease, opacity .3s ease',
									opacity: 0.5,
									backgroundColor: theme.colors.brand?.[4],
									'&:hover': {
										backgroundColor: theme.colors.gold[4],
										opacity: 1
									}
								})}
								variant="default"
							>
								<IconArrowBigUpLineFilled size={16} />
							</ActionIcon>
						</Box>
					)}
				</Transition>
			</Affix>

			<Box
				component={'main'}
				pl={{ base: 8, md: 80 + 16 }}
				pr={{ base: 8, md: 16 }}
				py={{ sm: 0 }}
			>
				<Space h={{ base: 60 + 16, md: 80 + 16 }} />

				{
					!!preview && (
						<Box
							sx={(_, fn) => ({
								position: 'relative',
								overflow: 'hidden',
								[fn.largerThan('md')]: {
									margin: '-16px -16px 16px -16px',
								},
								[fn?.smallerThan('md')]: {
									marginTop: -16,
								}
							})}
						>
							<picture>
								<source
									media="(max-width: 768px)"
									srcSet={mobile}
								/>
								<img
									alt={title}
									src={preview}
									style={{ width: '100%', animation: 'zoom 20s linear infinite' }}
								/>
							</picture>

							<Title
								c={'white.0'}
								order={1}
								sx={(_, fn) => ({
									fontSize: '2.45rem',
									textShadow: '1px 2px 2px #988347',
									position: 'absolute',
									top: '5%',
									left: 0,
									right: 0,
									textAlign: 'center',
									[fn.smallerThan('md')]: {
										fontSize: 24,
										lineHeight: '30px'
									}
								})}
							>
								{config?.title}
							</Title>
						</Box>
					)
				}

				{
					!isMain && (
						<Container>
							{!!breadcrumbs.length && (
								<>
									<Breadcrumbs items={breadcrumbs} />

									<Space h={{ base: 16, md: 32 }} />
								</>
							)}

							{!!title && !preview && (
								<Flex
									align={{ base: 'flex-start', md: 'end' }}
									direction={{ base: 'column', md: 'row' }}
									gap={16}
									justify={'space-between'}
									mb={{ base: 16, md: 24 }}
								>
									<Title
										order={1}
										sx={(theme, fn) => {
											return {
												color: theme.colors.brand?.[4],
												[fn.smallerThan('md')]: {
													fontSize: 24,
													lineHeight: '30px'
												}
											}
										}}
									>
										{config?.title}
									</Title>

									<Filters />
								</Flex>
							)}
						</Container>
					)
				}

				{children}

				<Space h={{ base: 32, md: 64 }} />
			</Box>

			<style global jsx>
				{`
					@media (min-width: 720px) {
						body ::-webkit-scrollbar,
						html ::-webkit-scrollbar {
							width: 6px;
							background-color: #f5f5f5;
						}
						body ::-webkit-scrollbar-thumb,
						html ::-webkit-scrollbar-thumb {
							background-color: #988347;
						}
						body ::-webkit-scrollbar-track,
						html ::-webkit-scrollbar-track {
							-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
							background-color: #3f2512;
						}
					}

					@keyframes zoom {
						0% {
							transform: scale(1)
						}

						50% {
							transform: scale(1.05)
						}

						to {
							transform: scale(1)
						}
					}
				`}
			</style>
		</>
	);
};

export default Layout;

if (process.env.NODE_ENV === 'development') {
	Layout.displayName = 'Layout';
}
