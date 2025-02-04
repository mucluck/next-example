import { Box, Breadcrumbs as MBreadcrumbs, Text } from '@mantine/core';
import Link from 'next/link';

type BreadcrumbsProps = {
	items: Array<Breadcrumb>;
};

const Breadcrumbs = ({ items = [] }: BreadcrumbsProps) => {
	return (
		<MBreadcrumbs
			component={'nav'}
			itemScope
			itemType={'http://schema.org/BreadcrumbList'}
			separator={'/'}
			styles={theme => (
				{
					root: {
						flexWrap: 'nowrap',
					},
					separator: {
						margin: '0 4px',
						color: theme.colors.money[4],
					},
					breadcrumb: {
						display: 'flex',
						':last-child': {
							overflow: 'hidden'
						}
					}
				}
			)}
			sx={(_, fn) => {
				return {
					[fn.smallerThan('lg')]: {
						overflow: 'auto'
					}
				}
			}}
		>
			{
				items.map(({ href, title }, idx) => {
					if (!href) {
						return (
							<Box key={`no-href-item-${idx}`} miw={50}>
								<Text
									c={'gold.4'}
									fz={'14px'}
									itemProp={'itemListElement'}
									itemScope
									itemType={'http://schema.org/ListItem'}
									key={idx}
									lh={'14px'}
									span
									sx={{
										textOverflow: 'ellipsis',
										overflow: 'hidden',
									}}
								>
									{title}
								</Text>
							</Box>
						);
					}

					return (
						<Link
							href={href}
							itemProp={'itemListElement'}
							itemScope
							itemType={'http://schema.org/ListItem'}
							key={href}
							title={title}
						>
							<Text
								fz={'14px'}
								lh={'14px'}
								span
							>
								{title}
							</Text>
						</Link>
					);
				})
			}
		</MBreadcrumbs>
	);
};

export default Breadcrumbs;

if (process.env.NODE_ENV === 'development') {
	Breadcrumbs.displayName = 'Breadcrumbs';
}
