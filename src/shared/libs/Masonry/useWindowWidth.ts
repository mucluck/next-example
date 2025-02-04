import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

const useWindowWidth = (isResponsive: boolean = true): number => {
	const [windowWidth, setWindowSize] = useState(320);

	const resize = () => {
		setWindowSize(window.innerWidth);
	};
	const handleResize = useCallback(resize, []);

	useLayoutEffect(resize, []);

	useEffect(() => {
		if (isResponsive) {
			window.addEventListener('resize', handleResize);
		} else {
			window.removeEventListener('resize', handleResize);
		}

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [isResponsive, handleResize]);

	return windowWidth;
};

export default useWindowWidth;
