import type { MantineThemeOverride } from '@mantine/core';
import { Blockquote, createTheme, Drawer, rem, SegmentedControl, Select } from '@mantine/core';
import { Tenor_Sans } from 'next/font/google';

const tenorSans = Tenor_Sans({
	weight: '400',
	style: 'normal',
	subsets: ['latin'],
});

const theme: MantineThemeOverride = createTheme({
	...tenorSans?.style,
	fontSizes: {
		xs: rem(14),
		sm: rem(16),
		md: rem(18),
		lg: rem(20),
		xl: rem(22),
	},
	colors: {
		// NOTE: MAIN COLOR 4th !!!!!
		brand: [
			'#1D1108',
			'#26160A',
			'#2F1B0C',
			'#38200E',
			'#3F2512',
			'#644E3D',
			'#897768',
			'#AEA093',
			'#D3C9BE',
			'#F9F1EB',
		],
		money: [
			'#372511',
			'#5A3D1C',
			'#7D5527',
			'#A06D32',
			'#C5873E',
			'#CF9D61',
			'#D9B384',
			'#E3C9A7',
			'#EDDFCA',
			'#F9F3EB',
		],
		gold: [
			'#2C2614',
			'#473D20',
			'#62542C',
			'#7D6B38',
			'#988346',
			'#AB9A68',
			'#BEB18A',
			'#D1C8AC',
			'#E4DFCE',
			'#F7F5EE',
		],
		white: ['#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF', '#FFF'],
	},
	shadows: {
		xl: '0 0 10px 5px #bab8b6',
		mapModal: '0px 0px 30px 10px #1f1f3f'
	},
	components: {
		Container: {
			defaultProps: {
				px: {
					base: '0px',
					md: 16,
				},
				sizes: {
					xs: 540,
					sm: 720,
					md: 1200,
					lg: 1400,
					xl: 1600,
					xxl: 2000,
				},
				size: 'xl'
			},
		},
		Title: {
			defaultProps: {
				c: 'brand.4',
			},
		},
		Text: {
			defaultProps: {
				c: 'brand.4',
			},
		},
		Paper: {
			styles: {
				root: {
					overflow: 'hidden',
				},
			},
		},
		TextInput: {
			defaultProps: {
				c: 'brand.4'
			},
			styles(theme: any) {
				return {
					section: {
						color: theme.colors.brand[4],
					},
					input: {
						color: theme.colors.brand[4],
						borderColor: theme.colors.brand[7],
						'&:focus': {
							borderColor: theme.colors.brand[4],
						}
					},
				}
			}
		},
		PasswordInput: {
			defaultProps: {
				c: 'brand.4'
			},
			styles(theme: any) {
				return {
					section: {
						color: theme.colors.brand[4],
					},
					input: {
						color: theme.colors.brand[4],
						borderColor: theme.colors.brand[7],
						'&:focus': {
							borderColor: theme.colors.brand[4],
						}
					},
					visibilityToggle: {
						color: theme.colors.brand[4],
						'&:focus': {
							borderColor: theme.colors.brand[7],
						}
					}
				}
			}
		},
		InputWrapper: {
			styles: {
				error: {
					color: '#ff8787 !important', // TODO: move Text styles to styles instead props
				},
			},
		},
		SegmentedControl: SegmentedControl.extend({
			vars: (theme) => {
				return {
					root: {
						'--sc-color': theme.colors.brand[4],
						'--sc-label-color': theme.colors.white[0]
					},
					innerLabel: {
						'--sc-color': theme.colors.brand[4]
					}
				}
			}
		}),
		Modal: {
			defaultProps: {
				closeButtonProps: {
					color: 'brand.4',
					iconSize: 32,
				},
			},
			styles: (theme: any) => ({
				close: {
					position: 'absolute',
					right: 16,
					top: 16,
					'&:hover': {
						color: theme.colors.brand?.[9],
					},
				},
				title: {
					paddingRight: 24,
				},
			}),
		},
		Drawer: Drawer.extend(
			{
				styles: (theme) => ({
					root: {
						display: 'flex',
						flexDirection: 'column'
					},
					close: {
						position: 'absolute',
						right: 16,
						top: 16,
						'&:hover': {
							color: theme.colors.brand?.[9],
						},
					},
					title: {
						paddingRight: 24,
					},
				}),
			}
		),
		Blockquote: Blockquote.extend(
			{
				styles: (theme) => ({
					icon: {
						color: theme.colors.money[4],
					},
					cite: {
						color: theme.colors.money[4],
					},
				}),
			}
		),
		Indicator: {
			styles: () => ({
				processing: {
					animationDuration: '1200ms',
					animationTimingFunction: 'cubic-bezier(1, 0.00, 0, 1)',
					boxShadow: '0 0 0.03125rem 0.275rem #ff8787',
					opacity: 0
				}
			})
		},
		Select: Select.extend(
			{
				defaultProps: {
					c: 'brand.4'
				},
				styles: (theme) => {
					return {
						input: {
							color: theme.colors.brand[4],
						},
						option: {
							color: theme.colors.brand[4],
						},
						section: {
							color: theme.colors.gold[4],
						}
					}
				}
			}
		),
		Menu: {
			styles: (theme: any) => {
				return {
					item: {
						color: theme.colors.brand[4],
					},
					option: {
						color: theme.colors.brand[4],
					},
					label: {
						color: theme.colors.brand[7],
					}
				}
			}
		},
		Button: {
			defaultProps: {
				loaderProps: {
					type: 'dots'
				}
			}
		}
		// Burger: {
		// 	styles: (theme) => ({
		// 		burger: {
		// 			backgroundColor: `${theme.colors.brand?.[4]}`,
		// 			"&:before": {
		// 				backgroundColor: `${theme.colors.brand?.[4]} !important`
		// 			},
		// 			"&:after": {
		// 				backgroundColor: `${theme.colors.brand?.[4]} !important`
		// 			}
		// 		}
		// 	})
		// }
	},
	primaryColor: 'brand',
	primaryShade: 4,

});

export { theme };
