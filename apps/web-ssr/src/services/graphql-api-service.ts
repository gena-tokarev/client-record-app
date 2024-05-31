import { getSdk } from "@/graphql/generated/graphql";
import { graphqlClient } from "@/graphql/graphql-client.server";

export const graphqlApiClient = getSdk(graphqlClient);
