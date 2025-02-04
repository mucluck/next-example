'use client';

import { ElementType, useId } from 'react';

import { MasonryItemContext } from './context';
import { MasonryProps } from './types';
import useMasonry from './useMasonry';

export const Masonry = <T extends ElementType = 'div'>(props: MasonryProps<T>) => {
	const { gap, as: Component = 'div', columnProps, columns, ref, ...rest } = props;

	const uniq = useId();
	const columnsChildren = useMasonry(props.children, columns);

	return (
		<Component
			{...rest}
			data-masonry-id={`Masonry-${uniq}`}
			ref={ref}
			style={{ display: 'flex', gap, ...rest.style }}
		>
			{
				columnsChildren.map((column, index) => {
					return (
						<Component
							data-masonry-column={index + 1}
							key={`Masonry__Column_${uniq}_${index}`}
							{...columnProps}
							style={{
								display: 'flex',
								flex: 1,
								flexDirection: 'column',
								gap,
								...columnProps?.style,
							}}
						>
							{
								column.map((child, childIndex) => {
									return (
										<MasonryItemContext
											key={`Masonry__Column_Child_${uniq}_${childIndex}`}
											value={{ column: index, position: childIndex }}
										>
											{child}
										</MasonryItemContext>
									);
								})
							}
						</Component>
					);
				})
			}
		</Component>
	);
};

export default Masonry;
