declare module '*.graphql' {
	import type { DocumentNode } from 'graphql';

	export const Schema: { [key: string]: DocumentNode };

	export const CATHEDRALS_BY_SLUG: DocumentNode;
	export const CATHEDRALS_PATHS: DocumentNode;

	// export interface Schema { [NameNode]: DocumentNode }
}
