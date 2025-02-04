import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ActionIcon, Box, CopyButton, Paper, SimpleGrid, Tooltip } from '@mantine/core';
import { IconCheck, IconCopy, IconZoomIn } from '@tabler/icons-react';
import uniqueId from 'lodash/uniqueId';
import NextImage from 'next/image';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

import { ObjectPosition } from './plugins';

type ImageFile = {
	id: string;
	alt: string;
	url: string;
};
type ImageGalleryProps = {
	id: string;
	items: Array<ImageFile>;
};
type TPicture = {
	src: string;
	alt: string;
};

const Picture = memo(({ src, alt }: TPicture) => {
	const isMount = useRef(false);

	const [size, setSize] = useState([1000, 1000]);

	useLayoutEffect(() => {
		isMount.current = true;

		const img = new Image();

		img.onload = () => {
			// NOTE: Strange async logic for get image size

			if (isMount.current) {
				setSize([img.naturalWidth, img.naturalHeight]);
			}
		};

		img.src = src as string;

		return () => {
			isMount.current = false;
		}
	}, [src]);

	const [width, height] = size;

	return (
		<Paper
			h={250}
			sx={() => ({
				position: 'relative',
				overflow: 'hidden',
				cursor: 'pointer',
				'&:after': {
					content: '""',
					width: '100%',
					height: '100%',
					backgroundColor: 'rgba(0, 0, 0, .2)',
					position: 'absolute',
					left: 0,
					top: 0,
					pointerEvents: 'none',
					opacity: 1,
					transition: 'opacity .3s ease'
				},
				'&:hover': {
					'.zoom': {
						opacity: '0 !important'
					},
					'&:after': {
						opacity: 0
					}
				}
			})}
		>
			<a
				data-cropped={'true'}
				data-pswp-height={height}
				data-pswp-opener
				data-pswp-width={width}
				href={src}
				target={'_blank'}
			>
				<NextImage
					alt={alt}
					fill
					objectFit={'cover'}
					priority
					src={src}
					unoptimized
				/>

				<Box
					c={'white'}
					className={'zoom'}
					opacity={'.7'}
					sx={{
						display: 'flex',
						width: '100%',
						height: '100%',
						pointerEvents: 'none',
						position: 'absolute',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 1,
						opacity: 1,
						transition: 'opacity .3s ease'
					}}
				>
					<IconZoomIn size={64} />
				</Box>
			</a>

			<Box sx={{ position: 'absolute', right: 16, top: 16, zIndex: 1 }}>
				<CopyButton timeout={2000} value={src}>
					{({ copied, copy }) => (
						<Tooltip
							color={'brand.4'}
							label={'Скопировать ссылку на изображение'}
							withArrow
						>
							<ActionIcon
								color={copied ? 'teal' : 'white'}
								onClick={copy}
								variant={'transparent'}
							>
								{copied ? <IconCheck size={32} /> : <IconCopy size={32} />}
							</ActionIcon>
						</Tooltip>
					)}
				</CopyButton>
			</Box>
		</Paper>
	)
});

const ImageGallery = memo(({ id = uniqueId('gallery-'), items }: ImageGalleryProps) => {
	useEffect(() => {
		let lightBox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
			gallery: `#${id}`,
			children: '[data-pswp-opener]',
			bgOpacity: 0.8,
			padding: {
				top: 36.5,
				bottom: 36.5,
				left: 0,
				right: 0
			},
			arrowNextSVG: `
                <svg width="38" height="68" viewBox="0 0 38 68" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0_2206_5)">
						<path d="M38 68H36.5C22.833 68 10.667 56.667 0 34C10.667 11.34 22.833 0.007 36.5 0L38 0.0100021L38 68Z" fill="white"/>
						<g clip-path="url(#clip1_2206_5)">
							<path d="M20.3529 40.789C20.3994 40.8356 20.4546 40.8725 20.5153 40.8977C20.576 40.9229 20.6412 40.9359 20.7069 40.9359C20.7727 40.9359 20.8378 40.9229 20.8986 40.8977C20.9593 40.8725 21.0145 40.8356 21.0609 40.789L27.4249 34.425C27.5187 34.3311 27.5713 34.2038 27.5712 34.0712C27.5711 33.9385 27.5183 33.8113 27.4244 33.7175C27.3305 33.6238 27.2033 33.5711 27.0706 33.5712C26.9379 33.5713 26.8107 33.6241 26.7169 33.718L20.3529 40.082C20.2592 40.1758 20.2065 40.3029 20.2065 40.4355C20.2065 40.5681 20.2592 40.6952 20.3529 40.789Z" fill="#3e2512"/>
							<path d="M27.4251 34.425C27.4716 34.3786 27.5086 34.3234 27.5338 34.2626C27.559 34.2019 27.572 34.1368 27.572 34.071C27.572 34.0052 27.559 33.9401 27.5338 33.8794C27.5086 33.8186 27.4716 33.7634 27.4251 33.717L21.0601 27.353C20.9662 27.2593 20.8389 27.2066 20.7062 27.2067C20.5735 27.2068 20.4463 27.2596 20.3526 27.3535C20.2588 27.4474 20.2062 27.5747 20.2063 27.7074C20.2064 27.84 20.2592 27.9673 20.3531 28.061L26.7171 34.425C26.8108 34.5187 26.938 34.5714 27.0706 34.5714C27.2032 34.5714 27.3303 34.5187 27.4241 34.425H27.4251Z" fill="#3e2512"/>
						</g>
					</g>
					<defs>
						<clipPath id="clip0_2206_5">
							<rect width="38" height="68" fill="white" transform="matrix(-1 0 0 -1 38 68)"/>
						</clipPath>
						<clipPath id="clip1_2206_5">
							<rect width="8" height="14" fill="white" transform="translate(20 27)"/>
						</clipPath>
					</defs>
				</svg>
            `,
			arrowPrevSVG: `
                <svg width="38" height="68" viewBox="0 0 38 68" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clip-path="url(#clip0_2206_13)">
						<path d="M0 0L1.5 0C15.167 0 27.333 11.333 38 34C27.333 56.66 15.167 67.993 1.5 68L0 67.99L0 0Z" fill="white"/>
						<g clip-path="url(#clip1_2206_13)">
							<path d="M17.6471 27.211C17.6006 27.1644 17.5454 27.1275 17.4847 27.1023C17.424 27.0771 17.3588 27.0641 17.2931 27.0641C17.2273 27.0641 17.1622 27.0771 17.1014 27.1023C17.0407 27.1275 16.9855 27.1644 16.9391 27.211L10.5751 33.575C10.4813 33.6689 10.4287 33.7962 10.4288 33.9288C10.4289 34.0615 10.4817 34.1887 10.5756 34.2825C10.6695 34.3762 10.7967 34.4289 10.9294 34.4288C11.0621 34.4287 11.1893 34.3759 11.2831 34.282L17.6471 27.918C17.7408 27.8242 17.7935 27.6971 17.7935 27.5645C17.7935 27.4319 17.7408 27.3048 17.6471 27.211Z" fill="#3e2512"/>
							<path d="M10.5749 33.575C10.5284 33.6214 10.4914 33.6766 10.4662 33.7374C10.441 33.7981 10.428 33.8632 10.428 33.929C10.428 33.9948 10.441 34.0599 10.4662 34.1206C10.4914 34.1814 10.5284 34.2366 10.5749 34.283L16.9399 40.647C17.0338 40.7407 17.1611 40.7934 17.2938 40.7933C17.4265 40.7932 17.5537 40.7404 17.6474 40.6465C17.7412 40.5526 17.7938 40.4253 17.7937 40.2926C17.7936 40.16 17.7408 40.0327 17.6469 39.939L11.2829 33.575C11.1892 33.4813 11.062 33.4286 10.9294 33.4286C10.7968 33.4286 10.6697 33.4813 10.5759 33.575H10.5749Z" fill="#3e2512"/>
						</g>
					</g>
					<defs>
						<clipPath id="clip0_2206_13">
							<rect width="38" height="68" fill="white"/>
						</clipPath>
						<clipPath id="clip1_2206_13">
							<rect width="8" height="14" fill="white" transform="matrix(-1 0 0 -1 18 41)"/>
						</clipPath>
					</defs>
				</svg>
            `,
			pswpModule: () => import('photoswipe'),
		});

		try {
			new ObjectPosition(lightBox);

			lightBox.init();
		} catch (e) {
			console.error(e);
		}

		return () => {
			if (lightBox) {
				lightBox.destroy();

				lightBox = null;
			}
		};
	}, [id]);

	return (
		<SimpleGrid
			cols={{
				base: 1,
				sm: 2,
				md: 3,
				lg: 4
			}}
			id={id}
		>
			{
				items.map(({ url, alt }) => {
					return (
						<Picture
							alt={alt}
							key={url}
							src={url} />
					);
				})
			}
		</SimpleGrid>
	);
});

export default memo(ImageGallery);

if (process.env.NODE_ENV === 'development') {
	ImageGallery.displayName = 'ImageGallery';
}
