import type { ReactNode } from 'react';
import { useReducer } from 'react';
import ReactPlayer from 'react-player'

import { radio, RadioContextProvider } from './context';

const init = () => {
	return {
		radio,
		current: null,
		volume: 100,
		mute: false
	};
}

// @ts-ignore
const reducer = (state, { type, payload }) => {
	switch (type) {
		case 'TOGGLE':
			return {
				...state,
				isOpen: payload,
			};
		case 'PLAY_STOP':
			if (payload.id === state.current?.id) {
				return {
					...state,
					current: null,
				};
			}

			return {
				...state,
				current: payload,
			};
		case 'VOLUME':
			return {
				...state,
				volume: payload,
			};
		case 'MUTE':
			return {
				...state,
				mute: payload,
			};
		case 'reset':
			return init();
		default:
			throw new Error('Not found the method or unexpected problem');
	}
}

export const RadioProvider = ({ children, radio }: { children: ReactNode, radio: any[] }) => {
	const [state, dispatch] = useReducer(reducer, {}, init);

	const handlePlay = (station: any) => {
		dispatch({
			type: 'PLAY_STOP',
			payload: station,
		});
	}

	const handleVolume = (volume: number) => {
		dispatch({
			type: 'VOLUME',
			payload: volume,
		});
	}

	const handleMute = (mute: boolean) => {
		dispatch({
			type: 'MUTE',
			payload: mute,
		});
	}

	return (
		<>

			<RadioContextProvider
				value={{
					radio,
					handlePlay,
					handleVolume,
					handleMute,
					mute: state.mute,
					current: state.current,
					volume: state.volume
				}}
			>
				{children}
			</RadioContextProvider>

			{
				state.current && (
					<ReactPlayer
						height={0}
						muted={state.mute}
						playing
						style={{ position: 'fixed', zIndex: -9999 }}
						url={state.current?.source}
						volume={state.volume / 100}
					/>
				)
			}
		</>
	);
}

if (process.env.NODE_ENV === 'development') {
	RadioProvider.displayName = 'RadioProvider';
}
