import { Button } from '@mantine/core';
import { IconEye } from '@tabler/icons-react';

import { useBlind } from '.';

const Blind = ({ size = 24 }: { size?: number }) => {
	const { handleToggle } = useBlind();

	return (
		<Button
			aria-label={'accessibility'}
			onClick={handleToggle.bind(null, true)}
			px={8}
			styles={(theme) => {
				return {
					root: {
						'&:hover': {
							color: theme.colors.brand?.[9],
							backgroundColor: theme.colors.brand?.[4],
						},
					},
				}
			}}
			title={'Режим для слабовидящих'}
			variant={'subtle'}
		>
			<IconEye size={size} stroke={1} />
		</Button>
	);
};

export default Blind;
