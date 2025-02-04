import { createContext, useContext } from "react";

export const menu = {} as Record<string, unknown>;
export const isOpen: boolean = false;
export const isWrapperOpen: boolean = false;
export const handleOpen: (isOpen: boolean) => void = (isOpen: boolean) => {};
export const handleToggle: (isOpen: boolean) => void = (isOpen: boolean) => {};
export const handleSetMenu: (menu: any) => void = (menu: any) => {};
export const handleWrapperToggle: (isOpen: boolean) => void = (isOpen: boolean) => {};

export const VerticalMenuContext = createContext({
	menu,
	isOpen,
	isWrapperOpen,
	handleOpen,
	handleToggle,
	handleSetMenu,
	handleWrapperToggle,
});

VerticalMenuContext.displayName = "VerticalMenuContext";

export const VerticalMenuContextProvider = VerticalMenuContext.Provider;
export const VerticalMenuConsumer = VerticalMenuContext.Consumer;
export const useVerticalMenu = () => {
	return useContext(VerticalMenuContext);
};
