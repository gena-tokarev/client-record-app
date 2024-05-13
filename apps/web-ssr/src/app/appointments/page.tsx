import PrefetchQuery from "@/components/prefetch-query";
import { graphqlApiClient } from "@/services/graphql-api-service";
import { PageClient } from "./page.client";

const AppointmentsPageClient = () => {
  return (
    <PrefetchQuery
      fetchQueryOptions={{
        queryKey: ["appointments"],
        queryFn: () => graphqlApiClient.Appointments(),
      }}
    >
      <PageClient />
    </PrefetchQuery>
  );
};

export default AppointmentsPageClient;
