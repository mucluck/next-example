import { Box } from '@mantine/core'
import Image from 'next/image';

const InfoMenu = () => {
	return (
		<Box h={'100%'} pos={'relative'}>
			<Image
				alt={'О кластере'}
				fill
			/>
		</Box>
	);
};

export default InfoMenu;
