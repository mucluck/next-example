import { useRequest } from "ahooks";

import { client } from "@/shared/graphql/client";

// @ts-ignore
import { RATE } from "@/shared/graphql/queries/rate/queries.graphql";
// @ts-ignore
import { RATE_UPDATE } from "@/shared/graphql/queries/rate/mutations.graphql";

const getRate = (variables: { userId: number, newsId: number }) => {
	return client.query({
		query: RATE,
		variables,
	});
};

const updateRate = (variables: { rating: number, userId: number, newsId: number }) => {
	return client.query({
		query: RATE_UPDATE,
		variables,
	});
};

const useRate = (options: any = {}) => {
	return useRequest(getRate, options);
}

const useRateUpdate = (options: any) => {
	return useRequest(updateRate, options);
}

export { updateRate, useRate, useRateUpdate };
