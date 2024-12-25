import { fetchQuery } from "@/graphql/graphql-client.server";
import {
  AppointmentDocument,
  AppointmentQuery,
} from "@/graphql/generated/graphql";
import { UpdateAppointment } from "@/components/appointment/update-appointment";

const UpdateAppointmentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const data = await fetchQuery<AppointmentQuery>({
    query: AppointmentDocument,
    variables: { appointmentId: (await params).id },
  });

  const appointment = data?.appointment;

  if (!appointment) {
    return null;
  }

  return <UpdateAppointment appointment={appointment} />;
};

export default UpdateAppointmentPage;
