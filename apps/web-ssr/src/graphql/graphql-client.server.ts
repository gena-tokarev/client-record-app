import {
  ApolloClient,
  ApolloError,
  ApolloLink,
  DocumentNode,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support";
import { getCookieServer } from "@/lib/get-cookie/get-cookie.server";
import { redirect } from "next/navigation";
import { getAuthLink } from "./get-auth-link";

export const { getClient, PreloadQuery } = registerApolloClient(async () => {
  const token = await getCookieServer("access_token");

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([
      getAuthLink(token),
      new HttpLink({
        // this needs to be an absolute url, as relative urls cannot be used in SSR
        uri: process.env.API_HOST_GRAPHQL_ROUTE,
        // you can disable result caching here if you want to
        // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
        // fetchOptions: { cache: "no-store" },
      }),
    ]),
  });
});

interface FetchQueryOptions {
  query: DocumentNode;
  variables?: Record<string, any>;
}

export async function fetchQuery<TData>({
  query,
  variables = {},
}: FetchQueryOptions): Promise<TData | null> {
  const client = await getClient();

  try {
    const response = await client.query<TData>({ query, variables });
    return response?.data;
  } catch (errorResponse: unknown) {
    if (errorResponse instanceof ApolloError) {
      const graphQLErrors = errorResponse.graphQLErrors;
      for (const error of graphQLErrors) {
        switch (error.extensions?.code) {
          case "UNAUTHENTICATED":
            redirect(process.env.NEXT_APP_LOGIN_PATH);
          default:
            console.log(`[GraphQL error]: ${error.message}`);
        }
      }
    }
  }

  return null;
}
