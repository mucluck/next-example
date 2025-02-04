const config = Object.freeze({
	token: process.env.NEXT_PUBLIC_HASURA_GUEST_TOKEN || '',
	baseURL: process.env.NEXT_PUBLIC_HASURA_BASE_URL || '',
	apiURL: process.env.NEXT_PUBLIC_HASURA_API_URL || '',
	canonical: process.env.NEXT_PUBLIC_CANONICAL || '',
	cyrillic: process.env.NEXT_PUBLIC_CYRILLIC || '',
	mapBoxAccessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''
});

export default config;
