import { createStyles, getStylesRef } from '@mantine/emotion';

const useStyles = createStyles(theme => {
	return {
		dot: {
			display: 'block',
			width: 20,
			height: 20,
			border: 'none',
			cursor: 'pointer',
			background: 'transparent',
			'&:before': {
				content: '""',
				display: 'inherit',
				width: 8,
				height: 8,
				borderRadius: 8,
				backgroundColor: '#dde3ed',
				transition: 'background-color 0.3s ease',
			},
			'&:hover': {
				'&:before': {
					backgroundColor: '#988347',
				},
			},
			[`&.${getStylesRef('is-active')}`]: {
				'&:before': {
					backgroundColor: '#3F2512',
				},
			},
		},
		isActive: {
			ref: getStylesRef('is-active'),
		},
	};
});

export default useStyles;
