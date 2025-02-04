import { MouseEvent, ReactElement, useId } from 'react';
import { memo } from 'react';
import cx from 'classnames';

import type { SliderInstance } from '../../Slider';

import useStyles from './styles';

type ArrowsProps = {
	instance: SliderInstance;
	vertical: boolean;
	prevIcon?: ReactElement;
	nextIcon?: ReactElement;
	currentSlide: number;
	slides: number;
};

const Arrows = ({ instance, vertical, prevIcon, nextIcon, currentSlide, slides }: ArrowsProps) => {
	const id = useId();

	const { classes } = useStyles({ spacing: -38, vertical });

	const handleNext = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		instance.current?.next();
	};

	const handlePrev = (event: MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();

		instance.current?.prev();
	};

	return (
		<>
			<button
				className={cx(classes.arrow, classes.arrowPrev)}
				disabled={currentSlide === 0}
				onClick={handlePrev}
			>
				{
					prevIcon ?? (
						<svg
							fill="none" height="68"
							viewBox="0 0 38 68" width="38"
							xmlns="http://www.w3.org/2000/svg">
							<g clip-path={`url(#clip-prev-${id})`}>
								<path d="M0 0L1.5 0C15.167 0 27.333 11.333 38 34C27.333 56.66 15.167 67.993 1.5 68L0 67.99L0 0Z" fill="white" />
								<g clip-path={`url(#clip-prev-chevron-${id})`}>
									<path d="M17.6471 27.211C17.6006 27.1644 17.5454 27.1275 17.4847 27.1023C17.424 27.0771 17.3588 27.0641 17.2931 27.0641C17.2273 27.0641 17.1622 27.0771 17.1014 27.1023C17.0407 27.1275 16.9855 27.1644 16.9391 27.211L10.5751 33.575C10.4813 33.6689 10.4287 33.7962 10.4288 33.9288C10.4289 34.0615 10.4817 34.1887 10.5756 34.2825C10.6695 34.3762 10.7967 34.4289 10.9294 34.4288C11.0621 34.4287 11.1893 34.3759 11.2831 34.282L17.6471 27.918C17.7408 27.8242 17.7935 27.6971 17.7935 27.5645C17.7935 27.4319 17.7408 27.3048 17.6471 27.211Z" fill="#3e2512" />
									<path d="M10.5749 33.575C10.5284 33.6214 10.4914 33.6766 10.4662 33.7374C10.441 33.7981 10.428 33.8632 10.428 33.929C10.428 33.9948 10.441 34.0599 10.4662 34.1206C10.4914 34.1814 10.5284 34.2366 10.5749 34.283L16.9399 40.647C17.0338 40.7407 17.1611 40.7934 17.2938 40.7933C17.4265 40.7932 17.5537 40.7404 17.6474 40.6465C17.7412 40.5526 17.7938 40.4253 17.7937 40.2926C17.7936 40.16 17.7408 40.0327 17.6469 39.939L11.2829 33.575C11.1892 33.4813 11.062 33.4286 10.9294 33.4286C10.7968 33.4286 10.6697 33.4813 10.5759 33.575H10.5749Z" fill="#3e2512" />
								</g>
							</g>
							<defs>
								<clipPath id={`url(#clip-prev-${id})`}>
									<rect
										fill="white" height="68"
										width="38" />
								</clipPath>
								<clipPath id={`clip-prev-chevron-${id}`}>
									<rect
										fill="white" height="14"
										transform="matrix(-1 0 0 -1 18 41)" width="8" />
								</clipPath>
							</defs>
						</svg>
					)
				}
			</button>

			<button
				className={cx(classes.arrow, classes.arrowNext)}
				disabled={currentSlide === slides}
				onClick={handleNext}
			>
				{
					nextIcon ?? (
						<svg
							fill="none" height="68"
							viewBox="0 0 38 68" width="38"
							xmlns="http://www.w3.org/2000/svg">
							<g clip-path={`url(#clip-next-${id})`}>
								<path d="M38 68H36.5C22.833 68 10.667 56.667 0 34C10.667 11.34 22.833 0.007 36.5 0L38 0.0100021L38 68Z" fill="white" />
								<g clip-path={`url(#clip-next-chevron-${id})`}>
									<path d="M20.3529 40.789C20.3994 40.8356 20.4546 40.8725 20.5153 40.8977C20.576 40.9229 20.6412 40.9359 20.7069 40.9359C20.7727 40.9359 20.8378 40.9229 20.8986 40.8977C20.9593 40.8725 21.0145 40.8356 21.0609 40.789L27.4249 34.425C27.5187 34.3311 27.5713 34.2038 27.5712 34.0712C27.5711 33.9385 27.5183 33.8113 27.4244 33.7175C27.3305 33.6238 27.2033 33.5711 27.0706 33.5712C26.9379 33.5713 26.8107 33.6241 26.7169 33.718L20.3529 40.082C20.2592 40.1758 20.2065 40.3029 20.2065 40.4355C20.2065 40.5681 20.2592 40.6952 20.3529 40.789Z" fill="#3e2512" />
									<path d="M27.4251 34.425C27.4716 34.3786 27.5086 34.3234 27.5338 34.2626C27.559 34.2019 27.572 34.1368 27.572 34.071C27.572 34.0052 27.559 33.9401 27.5338 33.8794C27.5086 33.8186 27.4716 33.7634 27.4251 33.717L21.0601 27.353C20.9662 27.2593 20.8389 27.2066 20.7062 27.2067C20.5735 27.2068 20.4463 27.2596 20.3526 27.3535C20.2588 27.4474 20.2062 27.5747 20.2063 27.7074C20.2064 27.84 20.2592 27.9673 20.3531 28.061L26.7171 34.425C26.8108 34.5187 26.938 34.5714 27.0706 34.5714C27.2032 34.5714 27.3303 34.5187 27.4241 34.425H27.4251Z" fill="#3e2512" />
								</g>
							</g>
							<defs>
								<clipPath id={`clip-next-${id}`}>
									<rect
										fill="white" height="68"
										transform="matrix(-1 0 0 -1 38 68)" width="38" />
								</clipPath>
								<clipPath id={`clip-next-chevron-${id}`}>
									<rect
										fill="white" height="14"
										transform="translate(20 27)" width="8" />
								</clipPath>
							</defs>
						</svg>
					)
				}
			</button>
		</>
	);
};

export default memo(Arrows);
