import { Children, isValidElement, ReactNode, useMemo } from 'react';

import { Columns } from './types';
import useColumnsCount from './useCoulmnsCount';

const createEmptyColumns = (count: number): Array<[]> => {
	return Array.from({ length: count }, () => []);
};

const useMasonry = (children: ReactNode, columns?: Columns): ReactNode[][] => {
	const noOfColumns = useColumnsCount(columns);

	const columnsChildren = useMemo(() => {
		const group: ReactNode[][] = createEmptyColumns(noOfColumns);

		Children.forEach(children, (child, index) => {
			if (isValidElement(child)) {
				group[index % noOfColumns].push(child);
			}
		});

		return group;
	}, [noOfColumns, children]);

	return columnsChildren;
};

export default useMasonry;
