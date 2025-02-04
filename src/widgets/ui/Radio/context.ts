import { createContext, useContext } from "react";

export const radio: any = [];

const handlePlay = (station: any) => { };
const handleVolume = (volume: number) => { };
const handleMute = (mute: boolean) => { };

export const RadioContext = createContext(
	{
		radio,
		handlePlay,
		handleVolume,
		handleMute,
		mute: false as boolean,
		current: {} as any,
		volume: 1 as number,
	},
);

RadioContext.displayName = "RadioContext";

export const RadioContextProvider = RadioContext.Provider;
export const RadioConsumer = RadioContext.Consumer;
export const useRadio = () => {
    return useContext(RadioContext)
}
