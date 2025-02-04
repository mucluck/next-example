const scriptLoader = (src: string | null = null, onLoad: () => void = () => Function, onError: () => void = () => Function) => {
	if (src) {
		const script = document.createElement("script");
		const node = document.getElementsByTagName("head")[0];

		script.type = "text/javascript";
		script.async = true;
		script.src = src;
		script.onload = onLoad;
		script.onerror = onError;

		node.appendChild(script);

		return script;
	}

	console.error(`Invalid resource address: ${src}`);

	return null;
}

export { scriptLoader }
