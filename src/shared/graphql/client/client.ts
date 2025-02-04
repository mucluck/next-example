import config from '@/shared/config';
import type { DefaultOptions } from '@apollo/client';
import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const headers = {
	'Authorization': `Bearer ${config.token}`
};

const WSLink = new GraphQLWsLink(
	createClient({
		url: `wss://${config.baseURL}`,
		connectionParams() {
			return {
				headers,
			};
		},
	}),
);

const HTTPLink = new HttpLink({
	headers,
	uri: `https://${config.baseURL}`,
});

const link = split(
	({ query }) => {
		const definition = getMainDefinition(query);

		return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
	},
	WSLink,
	HTTPLink,
);

const defaultOptions: DefaultOptions = {
	watchQuery: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'ignore',
	},
	query: {
		fetchPolicy: 'no-cache',
		errorPolicy: 'all',
	},
};

const client = new ApolloClient({
	link,
	cache: new InMemoryCache({ resultCaching: false }),
	defaultOptions,
});

export default client;
