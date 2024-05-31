"use client";

import { makeClient } from "@/graphql/graphql-client.client";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support/ssr";

// you need to create a component to wrap your app in
export function GraphqlProvider({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
