import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  process.env.API_HOST_GRAPHQL_ROUTE,
);
