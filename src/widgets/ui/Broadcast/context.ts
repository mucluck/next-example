import { createContext, useContext } from "react";

export const isEnabled = false;

export const BroadcastContext = createContext(
	{
		isEnabled,
	},
);

BroadcastContext.displayName = "BroadcastContext";

export const BroadcastContextProvider = BroadcastContext.Provider;
export const BroadcastConsumer = BroadcastContext.Consumer;
export const useBroadcast = () => {
    return useContext(BroadcastContext)
}
