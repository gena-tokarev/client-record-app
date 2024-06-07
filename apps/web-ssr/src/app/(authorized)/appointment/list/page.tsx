import { AppointmentList } from "./appointment-list";
import { fetchQuery } from "@/graphql/graphql-client.server";
import {
  AppointmentsDocument,
  AppointmentsQuery,
} from "@/graphql/generated/graphql";

const AppointmentsPage = async () => {
  // const data = await fetchQuery<AppointmentsQuery>({
  //   query: AppointmentsDocument,
  // });

  const data = await fetchQuery<AppointmentsQuery>({
    query: AppointmentsDocument,
  });

  if (!data) {
    return null;
  }

  return <AppointmentList initialData={data} />;
  // return (
  //   <PrefetchQuery
  //     fetchQueryOptions={{
  //       queryKey: ["appointments"],
  //       queryFn: () => graphqlApiClient.Appointments(),
  //     }}
  //   >
  //     <PageClient />
  //   </PrefetchQuery>
  // );
};

export default AppointmentsPage;