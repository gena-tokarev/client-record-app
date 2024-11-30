import {
  useAppointmentsSuspenseQuery,
  useAppointmentStatusesSuspenseQuery,
  useClientsSuspenseQuery,
  useMastersSuspenseQuery,
  useProceduresSuspenseQuery,
} from "@/graphql/generated/graphql";

export const useAppointmentListData = () => {
  const { data: appointments } = useAppointmentsSuspenseQuery();
  const { data: clients } = useClientsSuspenseQuery();
  const { data: masters } = useMastersSuspenseQuery();
  const { data: procedures } = useProceduresSuspenseQuery();
  const { data: appointmentStatuses } = useAppointmentStatusesSuspenseQuery();

  return {
    appointments: appointments?.appointments.data,
    appointmentsCount: appointments?.appointments.count,
    appointmentsCursor: appointments?.appointments.cursor,
    appointmentStatuses: appointmentStatuses?.appointmentStatuses,
    clients: clients?.clients,
    masters: masters?.masters,
    procedures: procedures?.procedures,
  };
};
