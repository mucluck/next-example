import { memo } from 'react';
import { Flex, Space } from '@mantine/core';
import cx from 'classnames';

import type { SliderInstance } from '../../Slider';

import useStyles from './styles';

type DotsTypes = {
	instance: SliderInstance;
	currentSlide: number;
};

const Dots = ({ instance, currentSlide }: DotsTypes) => {
	const { classes } = useStyles();

	const length = instance.current?.track?.details?.slides?.length ?? 0;
	const maxIdx = instance.current?.track?.details?.maxIdx ?? 0;

	return (
		<>
			<Space h={10} />
			<Flex justify={'center'}>
				{Array.from({ length }).map((_, idx) => {
					if (idx > maxIdx) {
						return;
					}

					return (
						<button
							className={cx(classes.dot, { [classes.isActive]: currentSlide === idx })}
							key={idx}
							onClick={() => {
								instance.current?.moveToIdx(idx);
							}}
						/>
					);
				})}
			</Flex>
		</>
	);
};

export default memo(Dots);
