import { fetchQuery } from "@/graphql/graphql-client.server";
import {
  AppointmentsDocument,
  AppointmentsQuery,
} from "@/graphql/generated/graphql";
import { AppointmentList } from "@/components/appointment/appointment-list";
import { transformData } from "@/components/appointment/utils";

const AppointmentsPage = async () => {
  const data = await fetchQuery<AppointmentsQuery>({
    query: AppointmentsDocument,
  });

  if (!data) {
    return null;
  }

  const transformedData = transformData(data.appointments);

  return <AppointmentList initialData={transformedData} />;
};

export default AppointmentsPage;
