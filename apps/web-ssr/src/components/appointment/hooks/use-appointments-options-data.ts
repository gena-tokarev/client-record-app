import {
  useAppointmentStatusesSuspenseQuery,
  useClientsSuspenseQuery,
  useMastersSuspenseQuery,
  useProceduresSuspenseQuery,
} from "@/graphql/generated/graphql";

export const useAppointmentsOptionsData = () => {
  const { data: clients } = useClientsSuspenseQuery();
  const { data: masters } = useMastersSuspenseQuery();
  const { data: procedures } = useProceduresSuspenseQuery();
  const { data: appointmentStatuses } = useAppointmentStatusesSuspenseQuery();

  return {
    appointmentStatuses: appointmentStatuses?.appointmentStatuses,
    clients: clients?.clients,
    masters: masters?.masters,
    procedures: procedures?.procedures,
  };
};
