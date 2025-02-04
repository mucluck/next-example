import type { MutableRefObject, ReactElement } from 'react';
import { createElement, FunctionComponent, useEffect, useState } from 'react';
import { Box } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import cx from 'classnames';
import type {
	KeenSliderHooks,
	KeenSliderInstance,
	KeenSliderOptions,
	KeenSliderPlugin,
} from 'keen-slider/react';
import { useKeenSlider } from 'keen-slider/react';

import { Arrows, Dots } from './components';
import useStyles from './styles';

export type SliderInstance = MutableRefObject<KeenSliderInstance<unknown, unknown, KeenSliderHooks> | null>;

type SliderProps<T> = {
	perView?: number;
	spacing?: number;
	initial?: number;
	onSlideChange?: (slide: unknown) => void;
	getInstanceRef?: (ref: SliderInstance) => void;
	plugins?: Array<KeenSliderPlugin>;
	container?: FunctionComponent<HTMLDivElement> | string;
	dots?: boolean;
	arrows?: boolean;
	items: Array<T>;
	renderItem: (item: T, idx: number) => ReactElement;
	height?: number | string;
	prevIcon?: ReactElement;
	nextIcon?: ReactElement;
	onInit?: VoidFunction;
	origin?: 'center' | 'auto' | number;
} & KeenSliderOptions;

const Slider = <T,>({
	loop = false,
	vertical = false,
	perView = 1,
	spacing = 16,
	initial = 0,
	mode = 'snap',
	plugins,
	breakpoints,
	onSlideChange,
	getInstanceRef,
	container = 'div',
	dots,
	arrows,
	items = [],
	renderItem,
	height = 'auto',
	prevIcon,
	nextIcon,
	onInit,
	origin,
}: SliderProps<T>) => {
	const { classes } = useStyles({ width: 100 / perView, spacing, height, breakpoints });

	const [isLoaded, setIsLoaded] = useState(false);
	const [crutch, setCrutch] = useDebouncedState<string | boolean>('', 100);
	const [currentSlide, setCurrentSlide] = useState(initial);

	const [sliderRef, instanceRef] = useKeenSlider(
		{
			selector: `.${classes.slide}`,
			vertical,
			initial,
			loop,
			breakpoints,
			mode,
			slides: {
				perView,
				spacing,
				origin,
			},
			slideChanged(slide) {
				setCurrentSlide(slide.track?.details?.rel);

				if (onSlideChange) {
					onSlideChange(slide);
				}
			},
			created() {
				if (getInstanceRef) {
					getInstanceRef(instanceRef);
				}

				if (onInit) {
					onInit();
				}

				setIsLoaded(true);
			}
		},
		plugins
	);

	useEffect(() => {
		return () => {
			instanceRef.current?.destroy?.()
		};
	}, []);

	useEffect(() => {
		setCrutch(true);
	}, [isLoaded, setCrutch]);

	useEffect(() => {
		// NOTE: Crutch for recalculate track width
		if (isLoaded && instanceRef.current) {
			instanceRef.current?.update();
			instanceRef.current?.track?.init();
		}
	}, [crutch, instanceRef, isLoaded]);

	const childrenLength = items?.length;

	// @ts-ignore
	const currentPerView = instanceRef?.current?.options?.slides?.perView ?? 1;
	const slides = (instanceRef?.current?.track?.details?.slides?.length ?? 1) - 1;

	return (
		<>
			<Box className={cx(classes.container, { [classes.static]: !isLoaded, [classes.dynamic]: isLoaded })}>
				<Box className={cx(classes.wrapper)}>
					{
						createElement(
							container,
							{
								// eslint-disable-next-line
								// @ts-ignore
								ref: sliderRef,
								className: classes.slider,
							},
							items.map((item: T, idx) => {
								return (
									<div
										className={cx(classes.slideRef)}
										key={`slider-item-${idx}`}
									>
										{renderItem(item, idx)}
									</div>
								);
							})
						)
					}

					{arrows && isLoaded && childrenLength > currentPerView && (
						<Arrows
							currentSlide={currentSlide}
							instance={instanceRef}
							nextIcon={nextIcon}
							prevIcon={prevIcon}
							slides={slides}
							vertical={vertical}
						/>
					)}
				</Box>

				{dots && isLoaded && childrenLength > currentPerView && (
					<Dots currentSlide={currentSlide} instance={instanceRef} />
				)}
			</Box>
		</>
	);
};

export default Slider;
