import { createStyles, getStylesRef } from '@mantine/emotion';
import type {
	KeenSliderOptions
} from 'keen-slider/react';

type SlideProps = {
	width: number;
	spacing: number;
	height: number | string;
} & Pick<KeenSliderOptions, 'breakpoints'>;
type TRenderStyle = (style: any) => any
type TBreakpoint = KeenSliderOptions['breakpoints'];

const getBreakPoint = (breakpoints: TBreakpoint) => {
	return (parameter: 'slides', render: TRenderStyle) => {
		if (breakpoints && parameter && render) {
			const styles = Object.entries(breakpoints).reduce((result, [breakpoint, value]) => {
				if (parameter) {
					const style = value[parameter];

					if (style) {
						// TODO: getBreakpointValue ?
						result[`@media ${breakpoint}`] = render(style);
					}
				}

				return result;
			}, {} as Record<string, any>);

			return styles;
		}

		return {};
	}
}

const useStyles = createStyles((theme, { width = 100, spacing = 16, height, breakpoints }: SlideProps, util) => {
	const breakpoint = getBreakPoint(breakpoints);

	return {
		static: {
			ref: util.ref('static'),
			[`.${getStylesRef('wrapper')}`]: {
				margin: `0 -${spacing / 2}px`,
				...breakpoint('slides', ({ spacing }) => {
					return {
						margin: `0 -${spacing / 2}px`,
					}
				})
			},
			[`.${getStylesRef('slide')}`]: {
				width: `${width}%`,
				maxWidth: `${width}%`,
				minWidth: `${width}%`,
				padding: `0 ${spacing / 2}px`,
				...breakpoint('slides', ({ perView, spacing }) => {
					return {
						width: `calc(100% / ${perView})`,
						maxWidth: `calc(100% / ${perView})`,
						minWidth: `calc(100% / ${perView})`,
						padding: `0 ${spacing / 2}px`
					}
				})
			},
			[`.${util.ref('slider')}`]: {
				overflow: 'auto',
				paddingBottom: 10,
				...breakpoint('slides', ({ spacing }) => {

					return {
						ss: spacing,
						touchAction: 'pan-x' // TODO: Take direction for Y axis
					}
				}),
			}
		},
		dynamic: {
			[`.${util.ref('slider')}`]: {
				overflow: 'hidden',
			}
		},
		slider: {
			ref: util.ref('slider'),
			height,
			'&:[data-keen-slider-disabled]': {
			},
			[`&:[data-keen-slider-disabled] .${getStylesRef('slide')}`]: {

			},
			'&:not([data-keen-slider-disabled])': {
				WebkitTouchCallout: 'none',
				WebkitTapHighlightColor: 'transparent',
				alignContent: 'flex-start',
				display: 'flex',
				position: 'relative',
				touchAction: 'pan-Y',
				userSelect: 'none',
				KhtmlUserSelect: 'none',
				maxWidth: `${width}%`,
			},
			'&:not([data-keen-slider-disabled])[data-keen-slider-reverse]': {
				flexDirection: 'row-reverse',
			},
			'&:not([data-keen-slider-disabled])[data-keen-slider-v]': {
				flexWrap: 'wrap',
			},
			[`&:not([data-keen-slider-disabled]) .${getStylesRef('slide')}`]: {
				minHeight: '100%',
				overflow: 'hidden',
				position: 'relative',
				maxWidth: `${width}%`,
			},
		},
		sliderRef: {
			ref: getStylesRef('slider'),
		},
		slideRef: {
			ref: getStylesRef('slide'),
		},
		slide: {

		},
		wrapper: {
			ref: getStylesRef('wrapper'),
			height,
			position: 'relative',
		},
		container: {
			position: 'relative',
			display: 'initial',
			height,
		},
	};
});

export default useStyles;
