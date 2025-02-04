import { Box, Paper, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';

const plug =
	'https://storage.yandexcloud.net/uploads/content/2020/04/07/7482b49f0ee3e68160f2646070f2c795_98508664-3e9f-4af0-a89d-98249cdc002f_8e60fe80-3a9f-429d-bfd9-6bacc812f7be.jpg';

const ContentCard = ({ image, title, link }: Partial<any>) => {
	const alt = title ?? link ?? '';

	return (
		<Box
			component={'article'}
			itemScope
			itemType={'https://schema.org/Article'}
			sx={{ position: 'relative' }}
		>
			<Link
				href={link}
				style={{ textDecoration: 'none' }}
				title={title}
			>
				<Paper
					h={{ base: 400, md: 500 }}
					sx={(theme) => ({
						position: 'relative',
						border: `1px solid ${theme.colors.gold[4]}`,
						overflow: 'hidden',
						backgroundColor: theme.colors.gold[6],
						'&:after': {
							content: '""',
							position: 'absolute',
							display: 'block',
							background: 'hsla(0, 0%, 100%, .5)',
							height: '100%',
							width: '1.5rem',
							left: 0,
							top: 0,
							opacity: 0.5,
							filter: 'blur(30px)',
							transform: 'translateX(-400px) skewX(-35deg)',
							transition: 'transform .3s ease-in-out',
							pointerEvents: 'none'
						},
						'&:hover': {
							'&:after': {
								transform: 'translateX(500px) skewX(-35deg)'
							}
						}
					})}
				>
					<Image
						alt={alt}
						fill
						objectFit={'cover'}
						priority
						src={image?.src ?? plug}
						unoptimized
					/>
				</Paper>

				{
					!!title && (
						<Box
							px={16}
							py={16}
							sx={(_, fn) => {
								return {
									lineHeight: '18px',
									position: 'absolute',
									width: '90%',
									top: '70%',
									right: 0,
									backgroundColor: 'white',
									borderRadius: '20px 0 0 20px',
									transform: 'translateY(calc(-50% + 24px))',
									[fn.largerThan('md')]: {
										top: '75%',
									},
									'& :before': {
										content: '""',
										position: 'absolute',
										right: 0,
										width: 16,
										height: 16,
										backgroundImage: 'radial-gradient(circle at 0 0, transparent 0, transparent 1rem, #fff 0)',
										bottom: '100%'
									},
									'& :after': {
										content: '""',
										position: 'absolute',
										right: 0,
										width: 16,
										height: 16,
										backgroundImage: 'radial-gradient(circle at 0 100%, transparent 0, transparent 1rem, #fff 0);',
										top: '100%'
									}
								}
							}}
						>
							<Text
								c={'brand.4'}
								fz={16}
								lh={'16px'}
								span
								ta={'center'}
								td={'none'}
							>
								{title}
							</Text>
						</Box>
					)

				}
			</Link>
		</Box>
	);
};

export default ContentCard;

if (process.env.NODE_ENV === 'development') {
	ContentCard.displayName = 'ContentCard';
}
