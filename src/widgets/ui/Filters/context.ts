import { createContext, useContext } from "react";

export type TFilter = {
	value: string;
	label: string;
}

export type TFilters = {
	cities?: Array<TFilter>,
	categories?: Array<TFilter>
};
export type TSelected = {
	city?: string;
	category?: string;
}

export const filters: TFilters = {};
export const handleSelect = (selected: any) => { };
export const selected: TSelected = {};

export const FiltersContext = createContext({
	filters,
	handleSelect,
	selected
});

if (process.env.NODE_ENV === "development") {
	FiltersContext.displayName = "FiltersContext";
}

export const FiltersContextProvider = FiltersContext.Provider;
export const FiltersConsumer = FiltersContext.Consumer;
export const useFilters = () => {
	const context = useContext(FiltersContext);

	if (context === undefined) {
		throw Error('useFilters must be used within an FiltersProvider')
	}

	return context
};
