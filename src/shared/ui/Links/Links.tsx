import { memo } from 'react';
import { Badge, Divider, Flex, Text } from '@mantine/core';
import moment from 'moment';
import Link from 'next/link';

// TODO: Move to consts
const CONTENT_TYPE = {
	media_article: 'articles',
	news: 'news'
} as const;

type TLinks = {
	age: string;
	type: keyof typeof CONTENT_TYPE;
	category: {
		slug: string;
		title_full: string;
	};
	issuedAt: string;
}

const Links = ({ age, type, category, issuedAt }: TLinks) => {
	const momentIssuedAt = moment(issuedAt);

	return (
		<Flex
			align={'center'}
			direction={{ base: 'row' }}
			gap={8}
			justify={{ base: 'space-between', md: 'flex-start' }}
		>
			<Link
				href={`/${CONTENT_TYPE[type]}/${category?.slug}`}
				style={{ lineHeight: '16px' }}
				title={`Раздел «${category?.title_full}»`}
			>
				<Text
					fz={16}
					lh={'16px'}
					span
				>
					{category?.title_full}
				</Text>
			</Link>

			<Divider
				orientation="vertical"
				visibleFrom="md"
			/>

			<Link
				href={`/calendar/${momentIssuedAt.format('YYYY-MM-DD')}`}
				style={{ lineHeight: '16px' }}
				title={`Перейти к ${momentIssuedAt.locale('ru').format('DD.MM.YYYY')} в календаре`}
			>
				<Text
					fz={16}
					lh={'16px'}
					span
				>
					{momentIssuedAt.locale('ru').format('LL')}
				</Text>
			</Link>

			{
				!!age && (
					<>
						<Divider
							orientation="vertical"
							visibleFrom="md"
						/>

						<Badge
							color={'money.4'}
							radius="xs"
							title={`Категория ${age}`}
							variant="light"
						>
							{age}
						</Badge>
					</>
				)
			}
		</Flex>
	);
}

export default memo(Links);

if (process.env.NODE_ENV === 'development') {
	Links.displayName = 'Links';
}
