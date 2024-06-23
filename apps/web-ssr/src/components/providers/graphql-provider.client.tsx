"use client";

import { makeClient } from "@/graphql/graphql-client.client";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";
import { disableFragmentWarnings } from "@apollo/client";

disableFragmentWarnings();

type GraphqlProviderProps = {
  authToken?: string;
} & React.PropsWithChildren;

// you need to create a component to wrap your app in
export function GraphqlProvider({ children, authToken }: GraphqlProviderProps) {
  return (
    <ApolloNextAppProvider makeClient={makeClient(authToken)}>
      {children}
    </ApolloNextAppProvider>
  );
}
