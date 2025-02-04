import { Box, SimpleGrid, Stack, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

const ImageMenu = ({ sub }: any) => {
	return (
		<SimpleGrid
			cols={2}
			verticalSpacing={8}
		>
			{
				sub.map(({ img, url, title }: any) => {
					return (
						<Box key={url}>
							<Link
								href={url} style={{ textDecoration: 'none' }}
								title={title}>
								<Stack gap={8}>
									<Image
										alt={title}
										height={500}
										priority
										src={img.src}
										style={{
											width: '100%',
											height: '100%',
											maxHeight: 300,
											objectFit: 'contain',
										}}
										unoptimized
										width={500}
									/>

									<Text
										c={'brand.4'}
										fz={16}
										lh={'16px'}
										span
										ta={'center'}
									>
										{title}
									</Text>
								</Stack>
							</Link>
						</Box>
					);
				})
			}
		</SimpleGrid>
	);
};

export default ImageMenu;
