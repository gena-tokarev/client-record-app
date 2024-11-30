import {
  AppointmentsDocument,
  AppointmentsQuery,
  useOnAppointmentDeletedSubscription,
  useOnAppointmentUpdatedSubscription,
} from "@/graphql/generated/graphql";

export const useAppointmentListSubscriptions = () => {
  useOnAppointmentDeletedSubscription({
    onData: ({ client, data }) => {
      const deletedId = data.data?.onAppointmentDeleted?.id;

      const appointmentsQuery = client.readQuery<AppointmentsQuery>({
        query: AppointmentsDocument,
      });

      if (appointmentsQuery && deletedId) {
        const newItems = appointmentsQuery.appointments.data.filter(
          (item) => item.id !== deletedId,
        );

        client.writeQuery({
          query: AppointmentsDocument,
          data: {
            ...appointmentsQuery.appointments,
            data: newItems,
          },
        });
      }
    },
  });

  useOnAppointmentUpdatedSubscription({
    onData: ({ client, data }) => {
      const updatedId = data.data?.onAppointmentUpdated?.id;

      const appointmentsQuery = client.readQuery<AppointmentsQuery>({
        query: AppointmentsDocument,
      });

      if (appointmentsQuery && updatedId) {
        const newItems = appointmentsQuery.appointments.data.map((item) =>
          item.id === updatedId ? updatedId : item,
        );

        client.writeQuery({
          query: AppointmentsDocument,
          data: { ...appointmentsQuery, data: newItems },
        });
      }
    },
  });
};
