import { createContext, useContext } from "react";

export const search = {};
export const isOpen = false;
export const handleToggle = (isOpen: boolean) => { };
export const isCalled = false;

export const SearchContext = createContext({
	search,
	handleToggle
});

SearchContext.displayName = "SearchContext";

export const SearchContextProvider = SearchContext.Provider;
export const SearchConsumer = SearchContext.Consumer;
export const useSearch = () => {
	return useContext(SearchContext);
};
