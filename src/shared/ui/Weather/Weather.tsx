import { useState } from 'react';
import { client } from '@/shared/graphql/client';
// @ts-ignore
import { CITY_WEATHER_BY_SLUG } from '@/shared/graphql/queries/cities/queries.graphql';
import { Flex, Group, Loader, Text } from '@mantine/core';
import { useRequest } from 'ahooks';

type Variables = {
	slug: string;
};

const getData = (variables: Variables) => {
	return client.query({
		query: CITY_WEATHER_BY_SLUG,
		variables,
	});
};

const Weather = ({ weather, slug }: any) => {
	const [current, setCurrent] = useState(weather?.current);

	const { loading } = useRequest(getData, {
		defaultParams: [{ slug }],
		onSuccess: ({ data }) => {
			const weather = data?.cities?.[0]?.weather?.current;

			if (weather) {
				setCurrent(weather);
			}
		},
		onError: (error) => {
			console.error('Weather', { error });
		},
		cacheKey: 'loadWeather',
	});

	if (!current) {
		return null;
	}

	const temp = Math.ceil(current?.temp);
	const icon = current?.weather?.[0]?.icon;
	const title = current?.weather[0]?.description;

	return (
		<Group gap={8}>
			{
				loading && (
					<Loader size={50} type={'dots'} />
				)
			}

			{
				!loading && (
					<>
						{
							icon && (
								<Flex>
									<img
										alt={title}
										height={50}
										src={`//openweathermap.org/img/wn/${icon}@2x.png`}
										style={{ filter: 'drop-shadow(0 0 5px #000)' }}
									/>
								</Flex>
							)
						}

						{
							temp && (
								<Text
									c={'brand.4'}
									fw={600}
									fz={20}
									lh={'20px'}
								>
									{temp}&deg;
								</Text>
							)
						}
					</>
				)
			}
		</Group>
	);
}

export default Weather;

if (process.env.NODE_ENV === 'development') {
	Weather.displayName = 'Weather';
}
