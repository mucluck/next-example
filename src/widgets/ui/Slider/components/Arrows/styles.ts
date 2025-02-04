import { createStyles } from '@mantine/emotion';

type ArrowProps = {
	spacing: number;
	vertical: boolean;
};

const useStyles = createStyles((theme, { spacing = 16, vertical }: ArrowProps) => {
	if (vertical) {
		return {
			arrow: {
				display: 'flex',
				position: 'absolute',
				left: '50%',
				transform: 'translateX(-50%)',
				cursor: 'pointer',
				border: 'none',
				background: 'transparent',
				padding: 16,
				color: '#3F2512',
			},
			arrowPrev: {
				bottom: `calc(100% + ${spacing / 2}px)`,
				'&[disabled]': {
					visibility: 'hidden'
				}
			},
			arrowNext: {
				top: `calc(100% + ${spacing / 2}px)`,
				'&[disabled]': {
					visibility: 'hidden'
				}
			},
		};
	}

	return {
		arrow: {
			display: 'flex',
			position: 'absolute',
			top: '50%',
			transform: 'translateY(-50%)',
			cursor: 'pointer',
			border: 'none',
			background: 'transparent',
			padding: 0,
			color: '#FFF',
			'&:hover': {
				color: '#C5873E',
			},
		},
		arrowPrev: {
			right: `calc(100% + ${spacing}px)`,
			'&[disabled]': {
				visibility: 'hidden'
			}
		},
		arrowNext: {
			left: `calc(100% + ${spacing}px)`,
			'&[disabled]': {
				visibility: 'hidden'
			}
		},
	};
});

export default useStyles;
