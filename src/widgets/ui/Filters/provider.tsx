import type { ReactNode } from "react";
import { useReducer } from "react";

import { filters, handleSelect, selected, FiltersContextProvider } from "./context";

const init = () => {
	return {
		filters,
		handleSelect,
		selected
	};
};

// @ts-ignore
const reducer = (state, { type, payload }) => {
	switch (type) {
		case "SELECT":
			return {
				...state,
				selected: payload,
			};
		case "reset":
			return init();
		default:
			throw new Error("Not found the method or unexpected problem");
	}
};

const FiltersProvider = ({ children, filters }: { children: ReactNode, filters: any }) => {
	const [state, dispatch] = useReducer(reducer, {}, init);

	const handleSelect = (selected: any) => {
		dispatch({
			type: "SELECT",
			payload: selected,
		});
	};

	return (
		<FiltersContextProvider
			value={{
				filters,
				handleSelect,
				selected: state.selected
			}}
		>
			{children}
		</FiltersContextProvider>
	);
};

export { FiltersProvider };

if (process.env.NODE_ENV === "development") {
	FiltersProvider.displayName = "FiltersProvider";
}
