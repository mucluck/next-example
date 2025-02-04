
import { memo } from 'react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import ReactPlayer from 'react-player';
import { Markdown, Section } from '@/shared/ui';
import { Slider } from '@/widgets/ui';
import { Box, Button, Flex, Paper, Spoiler, Text } from '@mantine/core';
import { IconBook2, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import cx from 'classnames';
import Image from 'next/image';

import { ImageGallery } from './ImageGallery';

export type ContentBlockProps = {
	title: string;
	body: string;
	media: {
		type: string;
		items: Array<MediaItem>;
		files: Array<any>;
		video_src?: string;
	};
	type?: string;
	index?: number;
};

const contentHeight = 650;

const ContentBlock = ({ title, body, media, index = 0 }: ContentBlockProps) => {
	const isMediaItems = !!media?.items?.length;
	const hasFiles = !!media?.files?.length;
	const even = !(index % 2);

	switch (media?.type) {
		case 'Gallery':
			return (
				<Section title={title}>
					<Flex direction={even ? 'column' : 'column-reverse'} gap={{ base: 16, md: 24 }}>
						{!!body && (
							<Box>
								<Markdown markdown={body} />
							</Box>
						)}

						{isMediaItems && (
							<ImageGallery
								id={`cb-${media?.type}-${even}-${index}`}
								items={media.items?.map(({ id, src, title }) => ({
									id,
									url: src,
									alt: title ?? id,
								}))}
							/>
						)}
						{/* <SimpleGrid
							cols={1}
							breakpoints={[
								{
									minWidth: 'sm',
									cols: 2
								},
								{
									minWidth: 'md',
									cols: 3
								},
								{
									minWidth: 'lg',
									cols: 4
								},
							]}
						>
							{
								media.items.map(({ id, title, src }) => {
									return (
										<Paper key={id} sx={() => ({ overflow: "hidden" })}>
												<Image
													unoptimized
													src={src}
													alt={title}
													width={500}
													height={500}
													style={{
															width: "100%",
															height: "100%",
															objectFit: 'cover'
													}}
													priority
											/>
										</Paper>
									)
								})
							}
						</SimpleGrid> */}
					</Flex>
				</Section>
			);

		case 'Video':
			return (
				<Flex direction={'column'} gap={{ base: 16, md: 24 }}>
					<Box>
						{/* @ts-ignore */}
						<ReactPlayer
							height={500} url={media?.video_src}
							width={'100%'} />
					</Box>

					{!!body && (
						<Box>
							<Markdown markdown={body} />
						</Box>
					)}
				</Flex>
			);

		case 'WideImage':
			return (
				<Section title={title}>
					<Flex direction={'column'} gap={{ base: 16, md: 24 }}>
						{
							!!body && (
								<Box>
									<Markdown markdown={body} />
								</Box>
							)
						}

						{
							isMediaItems && (
								<Box>
									<Slider<MediaItem>
										arrows
										items={media.items}
										origin={'auto'}
										perView={1}
										renderItem={({ src, title, id }) => {
											const isSplit = Array.isArray(src);

											return (
												<Paper
													sx={(_, fn) => ({
														overflow: 'hidden',
														maxHeight: contentHeight - 100,
														[fn.largerThan('md')]: {
															maxHeight: 'auto',
															height: contentHeight - 100,
														},
													})}
												>
													{
														isSplit && (
															<ReactCompareSlider
																boundsPadding={0}
																itemOne={<ReactCompareSliderImage alt={title} src={src[0]} />}
																itemTwo={<ReactCompareSliderImage alt={title} src={src[1]} />}
																position={50}
																style={{
																	height: '100%',
																	width: '100%',
																}}
															/>
														)
													}

													{
														!isSplit && (
															<Flex direction={'column'} gap={16}>
																<Image
																	alt={title ?? id}
																	height={500}
																	priority
																	src={src}
																	style={{
																		width: '100%',
																		objectFit: 'cover',
																		height: 'auto'
																	}}
																	unoptimized
																	width={500}
																/>
																{
																	!!title && (
																		<Text
																			c={'gold.4'} fw={'600'}
																			span ta="center">
																			{title}
																		</Text>
																	)
																}
															</Flex>
														)
													}
												</Paper>
											);
										}}
										spacing={8}
									/>
								</Box>
							)
						}
					</Flex>
				</Section>
			);

		default:
			return (
				<Section key={`${media?.type}-${index}`} title={title}>
					<Spoiler
						hideLabel={
							<Button
								mt={8}
								rightSection={<IconChevronUp />}
							>
								Свернуть
							</Button>
						}
						maxHeight={contentHeight * 2}
						showLabel={
							<Button
								mt={8}
								rightSection={<IconChevronDown />}
							>
								Читать далее
							</Button>
						}
						styles={{
							control: { float: 'inherit' },
							content: {
								position: 'relative',
								'&::after': {
									content: "''",
									height: 16,
									width: '100%',
									background:
										'linear-gradient(to top,  rgba(255,255,255,1) 0%, rgba(125,185,232,0) 100%)',
									position: 'absolute',
									bottom: 0,
									userSelect: 'none',
									pointerEvents: 'none',
								},
							},
						}}
					>
						<Box
							sx={(_, fn) => ({
								textAlign: 'justify',
								order: +!even,
								[fn.smallerThan('md')]: {
									order: 1,
								},
							})}
						>
							<Markdown markdown={body}>
								<>
									{
										isMediaItems && (
											<Box
												sx={(_, fn) => {
													return {
														[fn.largerThan('md')]: {
															width: '50%',
															marginLeft: even ? 16 : 0,
															marginRight: !even ? 16 : 0,
															float: cx({
																'right': even,
																'left': !even
															}) as 'right' | 'left'
														}
													}
												}}
											>
												<Slider<MediaItem>
													arrows
													items={media.items}
													origin={'auto'}
													perView={1}
													renderItem={({ src, title, id }) => {
														const isSplit = Array.isArray(src);

														return (
															<Paper
																h={{ base: 400, md: 600 }}
																key={src}
																sx={(_, fn) => ({
																	overflow: 'hidden',
																	[fn.largerThan('md')]: {
																		maxHeight: 'auto',
																	},
																})}
															>
																{
																	isSplit && (
																		<ReactCompareSlider
																			boundsPadding={0}
																			itemOne={<ReactCompareSliderImage alt={title} src={src[0]} />}
																			itemTwo={<ReactCompareSliderImage alt={title} src={src[1]} />}
																			position={50}
																			style={{
																				height: '100%',
																				width: '100%',
																			}}
																		/>
																	)
																}

																{
																	!isSplit && (
																		<Flex
																			direction={'column'}
																			gap={16}
																			h={'100%'}
																		>
																			<Box
																				h={'100%'}
																				sx={{ position: 'relative' }}
																			>
																				<Image
																					alt={title ?? id}
																					fill
																					objectFit={'cover'}
																					priority
																					src={src}
																					unoptimized
																				/>
																			</Box>

																			{
																				!!title && (
																					<Text
																						c={'gold.4'}
																						fw={'600'}
																						fz={16}
																						span
																						ta="center"
																					>
																						{title}
																					</Text>
																				)
																			}
																		</Flex>
																	)
																}
															</Paper>
														);
													}}
													spacing={8}
												/>
											</Box>
										)
									}
								</>
							</Markdown>
						</Box>
					</Spoiler>

					{
						hasFiles && media.files.map(({ title, src }) => (
							<Button
								component={'a'}
								href={src}
								key={src}
								leftSection={<IconBook2 size={16} />}
								sx={(_, fn) => ({
									[fn.smallerThan('lg')]: {
										width: '100%',
									},
								})}
								target={'_blank'}
							>
								{title ?? 'Ознакомительный фрагмент'}
							</Button>
						))
					}
				</Section>
			);
	}
};

const List = memo(({ sections }: { sections: Array<ContentBlockProps> }) => {
	if (!sections?.length) {
		return null;
	}

	return (
		<Flex gap={{ base: 24, md: 32 }} wrap={'wrap'}>
			{
				sections.map((section, idx) => {
					if (!section) {
						return null;
					}

					const { body, type, title, media } = section;

					return (
						<ContentBlock
							body={body}
							index={idx}
							key={`${type}-${idx}`}
							media={media}
							title={title}
						/>
					)
				})
			}
		</Flex>
	)
});

if (process.env.NODE_ENV === 'development') {
	List.displayName = 'ContentBlock.List';
}

export default ContentBlock;

if (process.env.NODE_ENV === 'development') {
	ContentBlock.displayName = 'ContentBlock';
}

ContentBlock.List = List;
