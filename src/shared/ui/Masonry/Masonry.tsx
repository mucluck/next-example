import type { ReactElement } from 'react';
import RMasonry from '@/shared/libs/Masonry';

// {
// 	xs: 540,
// 	sm: 720,
// 	md: 1200,
// 	lg: 1400,
// 	xl: 1600,
// 	xxl: 2000,
// }

type MasonryProps<T> = {
	items: Array<T>;
	renderItem: (item: T, idx: number) => ReactElement;
};

const Masonry = <T,>({ items, renderItem }: MasonryProps<T>) => {
	if (!items.length) {
		return null;
	}

	return (
		<RMasonry
			columns={{ 540: 1, 720: 2, 1200: 3, 1400: 4, 1600: 4, 2000: 5 }}
			gap={16}
		>
			{
				items.map((item: T, idx: number) => {
					return (
						<>
							{renderItem(item, idx)}
						</>
					)
				})
			}
		</RMasonry>
	);
};

export default Masonry;
