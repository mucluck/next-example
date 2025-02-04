import { Button } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

import { useSearch } from ".";

const Search = ({ size = 24 }: { size?: number }) => {
	const { handleToggle } = useSearch();

	return (
		<Button
			title={"Поиск"}
			aria-label={"search"}
			variant={"subtle"}
			px={8}
			onClick={handleToggle.bind(null, true)}
			styles={(theme) => ({
				root: {
					"&:hover": {
						color: theme.colors.brand?.[9],
						backgroundColor: theme.colors.brand?.[4],
					},
				},
			})}
		>
			<IconSearch stroke={1} size={size} />
		</Button>
	);
};

export default Search;

if (process.env.NODE_ENV === "development") {
	Search.displayName = "Search";
}
