import { Paper } from '@mantine/core';
import Image from 'next/image';

// import type { StaticImageData } from "next/image"

type Cover = {
	title: string;
	image: {
		src: string
	}
	// TODO: image: StaticImageData
};

const Cover = ({ title, image }: Cover) => {
	if (!image?.src) {
		return null
	}

	return (
		<Paper
			sx={(_, fn) => ({
				[fn.largerThan('lg')]: {
					height: 450,
					overflow: 'hidden'
				}
			})}
		>
			<Image
				alt={title}
				height={500}
				priority
				src={image.src}
				style={{
					width: '100%',
					height: '100%',
					objectFit: 'cover',
				}}
				unoptimized
				width={500}
			/>
		</Paper>
	);
}

export default Cover;

if (process.env.NODE_ENV === 'development') {
	Cover.displayName = 'Cover';
}
