import { Box, ScrollArea, SimpleGrid, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

import type { SubMenu } from '../../context/provider';

const ImageMenu = ({ sub }: { sub: Array<SubMenu> }) => {
	return (
		<ScrollArea sx={() => ({ height: '100%' })}>
			<SimpleGrid
				cols={3} spacing={64}
				verticalSpacing={32}
			>
				{sub.map(({ img, url, title }: SubMenu) => {
					return (
						<Box
							key={url}
							sx={() => ({
								transition: 'transform .3s ease',
								'&:hover': {
									transform: 'scale(1.05)',
								},
							})}
						>
							<Link href={url} title={title}>
								<Stack gap={8}>
									<Image
										alt={title}
										height={500}
										priority
										src={img.src}
										style={{
											width: '100%',
											height: '100%',
											maxHeight: 200,
											objectFit: 'contain',
										}}
										unoptimized
										width={500}
									/>

									<Text
										c={'money.9'} lh={'16px'}
										ta={'center'}>
										{title}
									</Text>
								</Stack>
							</Link>
						</Box>
					);
				})}
			</SimpleGrid>
		</ScrollArea>
	);
};

export default ImageMenu;
