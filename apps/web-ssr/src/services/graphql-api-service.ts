import { getSdk } from "@/graphql/generated/graphql";
import { graphqlClient } from "@/clients/graphql-client";

export const graphqlApiClient = getSdk(graphqlClient);
