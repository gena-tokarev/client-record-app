import { useCallback } from "react";
import {
  AppointmentsOutput,
  Query,
  useDeleteAppointmentMutation,
} from "@/graphql/generated/graphql";
import { ApolloCache } from "@apollo/client";
import { AsStoreObject } from "@apollo/client/utilities";

export const useAppointmentDelete = () => {
  const [deleteAppointment] = useDeleteAppointmentMutation({
    update: (cache: ApolloCache<Query>, { data }) => {
      if (!data) return;

      const deletedAppointmentId = data.deleteAppointment;

      cache.modify<Query>({
        fields: {
          appointments(existingAppointmentRefs, { readField }) {
            const appointmentsQuery =
              existingAppointmentRefs as unknown as AsStoreObject<AppointmentsOutput>;

            return {
              ...appointmentsQuery,
              count: appointmentsQuery.count - 1,
              data: appointmentsQuery.data.filter(
                (appointmentRef) =>
                  readField<string>("id", appointmentRef) !==
                  deletedAppointmentId,
              ),
            };
          },
        },
      });
    },

    optimisticResponse: ({ id }) => ({
      deleteAppointment: id,
    }),

    refetchQueries: "active",
  });

  const handleDeleteAppointment = useCallback(
    (id: string) => {
      deleteAppointment({
        variables: { id },
        optimisticResponse: () => {
          return {
            deleteAppointment: id,
          };
        },
      });
    },
    [deleteAppointment],
  );

  return {
    onDeleteAppointment: handleDeleteAppointment,
  };
};
