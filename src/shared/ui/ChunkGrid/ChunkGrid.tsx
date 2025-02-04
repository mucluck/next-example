import type { ReactElement } from 'react';
import { Grid } from '@mantine/core';

type ChunkGridProps<T> = {
	items: Array<T>;
	columns?: number;
	span?: Record<string, number>;
	gutter?: number;
	renderItem: (item: T) => ReactElement;
};

const ChunkGrid = <T,>({
	items,
	columns = 12,
	span = { base: 12, md: 6, lg: 4, xl: 3 },
	gutter = 16,
	renderItem,
}: ChunkGridProps<T>) => {
	if (!items?.length) {
		return 'Нет данных';
	}

	return (
		<Grid
			columns={columns}
			gutter={gutter}
		>
			{
				items.map((item, idx) => {
					return (
						<Grid.Col
							key={`item-${idx}}`}
							span={span}
						>
							{renderItem(item)}
						</Grid.Col>
					);
				})
			}
		</Grid>
	);
};

export default ChunkGrid;
