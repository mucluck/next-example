import type { GetStaticProps, GetStaticPaths } from "next";
import { Container } from "@mantine/core";

import { PhotoDetails } from "@/entities/Photo/ui";

import {
	// @ts-ignore
	BOOKS_PATHS,
	// @ts-ignore
	BOOKS_BY_SLUG,
} from "@/shared/graphql/queries/books/queries.graphql";
import { client } from "@/shared/graphql/client";

const BookPage = ({ data }: any) => {
	return (
		<Container>
			<PhotoDetails data={data} />
		</Container>
	);
};

export default BookPage;

if (process.env.NODE_ENV === "development") {
	BookPage.displayName = "BookPage";
}

export const getStaticPaths: GetStaticPaths = async () => {
	const {
		data: { books },
	} = await client.query({
		query: BOOKS_PATHS,
	});

	const booksPaths = books.map(({ slug }: { slug: string }) => {
		return {
			params: {
				slug,
			},
		};
	});

	return {
		paths: booksPaths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<{ layout: Record<string, unknown> }> = async ({ params }) => {
	if (!params?.slug) {
		console.error("Error while fetching books");

		return {
			notFound: true,
		};
	}

	const {
		data: { books },
	} = await client.query({
		query: BOOKS_BY_SLUG,
		variables: { slug: params?.slug },
	});

	const book = books[0] ?? {};
	const title = book?.title_full ?? "";

	return {
		props: {
			data: book,
			layout: {
				title,
				breadcrumbs: [
					{
						href: "/",
						title: "Главная",
					},
					{
						href: "/media",
						title: "Медиатека",
					},
					{
						title: "Книги",
						href: "/media/books",
					},
					{
						title,
					},
				],
			},
		},
	};
};
