"use client";
// ^ this file needs the "use client" pragma

import { ApolloLink, split } from "@apollo/client";
import {
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { getCookieClient } from "@/lib/get-cookie/get-cookie.client";
import { getAuthLink } from "./get-auth-link";
import { onError } from "@apollo/client/link/error";
import { BatchHttpLink } from "@apollo/client/link/batch-http";

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.API_HOST_GRAPHQL_ROUTE_SUBSCRIPTIONS,
  }),
);

export const authLink = (authToken?: string) =>
  getAuthLink(authToken ?? getCookieClient("access_token"));

const batchHttpLink = new BatchHttpLink({
  uri: process.env.API_HOST_GRAPHQL_ROUTE,
  batchMax: 5,
  batchInterval: 20,
  fetchOptions: { cache: "no-store" },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const err of graphQLErrors) {
      switch (err.extensions?.code) {
        case "UNAUTHENTICATED":
          if (typeof window !== "undefined") {
            window.location.href = process.env.NEXT_APP_LOGIN_PATH;
          } else {
            return;
          }
          break;
        default:
          console.log(`[GraphQL error]: ${err.message}`);
      }
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const splitLink = (authToken?: string) =>
  split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    ApolloLink.from([authLink(authToken), errorLink, batchHttpLink]),
  );

// have a function to create a client for you
export const makeClient = (authToken?: string) => () => {
  return new NextSSRApolloClient({
    // use the `NextSSRInMemoryCache`, not the normal `InMemoryCache`
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            // in a SSR environment, if you use multipart features like
            // @defer, you need to decide how to handle these.
            // This strips all interfaces with a `@defer` directive from your queries.
            new SSRMultipartLink({
              stripDefer: true,
            }),
            splitLink(authToken),
          ])
        : splitLink(authToken),
  });
};
