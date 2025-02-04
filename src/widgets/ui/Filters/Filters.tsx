import { Flex, Select } from "@mantine/core";
import { IconBuilding, IconListSearch } from "@tabler/icons-react";
import isEmpty from "lodash/isEmpty";

import { useFilters } from "./context";

const Filters = () => {
	const { filters, handleSelect } = useFilters();

	if (isEmpty(filters)) {
		return null;
	}

	const handleChange = (selected: any) => {
		handleSelect(selected);

		// setFull(false);

		// if (value) {
		// 	run({
		// 		...variables,
		// 		category: [value],
		// 		offset: 0,
		// 	});

		// 	return;
		// }

		// run({
		// 	...variables,
		// 	category: categories,
		// 	offset: 0,
		// });
	}

	return (
		<Flex
			gap={{ base: 8, md: 16 }}
			justify={"space-between"}
			direction={{ base: "column", md: "row" }}
			w={{ base: "100%", md: "auto" }}
		>
			{
				!!filters?.categories && (
					<Select
						clearable
						label={"Рубрики"}
						placeholder={"Выберие рубрику"}
						data={filters?.categories}
						leftSection={<IconListSearch size={16} stroke={1} />}
						onChange={value => handleChange({ category: value })}
					/>
				)
			}

			{
				!!filters?.cities && (
					<Select
						clearable
						leftSection={<IconBuilding size={16} stroke={1} />}
						label={"Города"}
						placeholder={"Выберие город"}
						data={filters?.cities}
						onChange={value => handleChange({ city: value })}
					// onChange={(value: string) => {
					// 	setFull(false);

					// 	if (value) {
					// 		run({
					// 			...variables,
					// 			city: [value],
					// 			offset: 0,
					// 		});

					// 		return;
					// 	}

					// 	run({
					// 		...variables,
					// 		city: cities,
					// 		offset: 0,
					// 	});
					// }}
					/>
				)
			}
		</Flex>
	);
}

export default Filters;

if (process.env.NODE_ENV === "development") {
	Filters.displayName = "Filters";
}
