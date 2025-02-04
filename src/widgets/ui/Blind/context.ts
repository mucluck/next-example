import { createContext, useContext } from "react";

export const theme = {};
const handleToggle = (isOpen: boolean) => { };

export const BlindContext = createContext({
	theme,
	handleToggle,
});

BlindContext.displayName = "BlindContext";

export const BlindContextProvider = BlindContext.Provider;
export const BlindConsumer = BlindContext.Consumer;
export const useBlind = () => {
	return useContext(BlindContext);
};
