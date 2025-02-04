import merge from "deepmerge";

const chunkify = <T>(array: Array<T>, chunkSize = 1): Array<Array<T>> => {
	const size = Math.ceil(array.length / chunkSize);

	const chunks = array.reduce((result, item, idx) => {
		const index = idx % chunkSize;

		if (result[index]) {
			const middle = [...result[index]];

			middle.push(item);

			result[index] = middle;
		}

		return result;
	}, new Array(size).fill([], 0, size)) as Array<Array<T>>;

	return chunks.filter(chunk => !!chunk.length)
};

const getFullGeo = (data: Array<any>) => {
	if (!data) {
		return {};
	}

	return data.reduce?.((result, { geoJSON, title_full, main_image, settings }) => {
		if (geoJSON) {
			const features = geoJSON.features.map((feature: { geometry: any; properties: any }) => {
				const { properties, geometry, ...rest } = feature;

				if (geometry.type === "Point") {
					return {
						geometry,
						...rest,
						properties: {
							...properties,
							title: title_full,
							image: main_image?.src ?? "",
							settings
						},
					};
				}

				return feature;
			});

			result = merge.all([result, { ...geoJSON, features }]);
		}

		return result;
	}, {});
};

export { chunkify, getFullGeo };

