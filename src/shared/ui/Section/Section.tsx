import type { ReactElement, ReactNode } from 'react';
import { useId, useMemo } from 'react';
import { Box, Flex, Stack, Text, Title } from '@mantine/core';

type Variant = 'default' | 'small' | 'large' | 'medium';

type SectionProps = {
	title?: string | ReactNode;
	titleProps?: Record<string, unknown>;
	children?: ReactNode;
	variant?: Variant;
	collapsed?: boolean;
	suffix?: string;
	anchor?: string;
	spacing?: number;
	extra?: ReactElement;
};

// TODO: use title like React element
const Section = ({ title, titleProps = {}, children, variant, suffix, anchor, spacing = 8, extra }: SectionProps) => {
	const localId = useId();

	const section = useMemo(() => {
		switch (variant) {
			case 'small':
				return (
					<Stack gap={spacing}>
						{!!title && (
							<Flex justify={'space-between'}>
								<Text
									fw={600} fz={14}
									lh={'20px'} span>
									{title}
								</Text>

								{suffix && (
									<Text
										c={'#95A0B3'} fw={400}
										fz={14} lh={'20px'}>
										{suffix}
									</Text>
								)}

								{extra}
							</Flex>
						)}

						<Box>{children}</Box>
					</Stack>
				);
			case 'medium':
				return (
					<Stack gap={spacing}>
						{!!title && (
							<Flex justify={'space-between'}>
								<Text
									fw={600} lh={'24px'}
									span>
									{title}
								</Text>

								{suffix && (
									<Text
										c={'#95A0B3'} fw={400}
										fz={14} lh={'20px'}>
										{suffix}
									</Text>
								)}

								{extra}
							</Flex>
						)}

						<Box>{children}</Box>
					</Stack>
				);
			default:
				return (
					<Stack gap={16}>
						{
							!!title && (
								<Flex
									direction={{ base: 'column', md: 'row' }} gap={8}
									justify={'space-between'}>
									<Title order={2} {...titleProps}>
										{title}
									</Title>

									{extra}
								</Flex>
							)
						}

						<Box>{children}</Box>
					</Stack>
				);
		}
	}, [children, spacing, suffix, title, variant]);

	return (
		<Box
			component={'section'}
			id={anchor ?? localId}
			w={'100%'}
		>
			{section}
		</Box>
	);
};

export default Section;
