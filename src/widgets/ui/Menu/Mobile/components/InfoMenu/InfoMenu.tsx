import { Leaflet } from '@/shared/ui';
import { Input, Stack } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

const InfoMenu = () => {
	return (
		<Stack gap={16}>
			<Input
				leftSection={<IconSearch size={16} stroke={1} />}
				placeholder={'Введите запрос'}
			// onChange={(event) =>
			// 	handleSearch({
			// 		query: event.target.value,
			// 		types: ["news", "articles"],
			// 	})
			// }
			// rightSection={searchLoading && <Loader size={16} />}
			/>

			<Stack gap={16}>
				<Leaflet items={[]} />
			</Stack>
		</Stack>
	);
};

export default InfoMenu;

