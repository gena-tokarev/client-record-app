"use client";

import {
  Appointment,
  useUpdateAppointmentMutation,
} from "@/graphql/generated/graphql";
import {
  UpdateAppointmentDto,
  updateAppointmentSchema,
} from "@client-record/shared/src/modules/appointment/schemas/appointment.schema";
import { FC, useCallback, useEffect } from "react";
import { AppointmentForm } from "./appointment-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type UpdateAppointmentProps = {
  appointment: Appointment;
};

export const UpdateAppointment: FC<UpdateAppointmentProps> = ({
  appointment,
}) => {
  const [updateAppointment, { data, loading }] = useUpdateAppointmentMutation();

  const form = useForm<UpdateAppointmentDto>({
    resolver: zodResolver(updateAppointmentSchema),
    defaultValues: {
      id: appointment.id,
      date: appointment.date,
      complaints: appointment.complaints,
      price: appointment.price,
      client: appointment.client.id,
      master: appointment.master.id,
      procedures:
        appointment.procedures?.map((procedure) => procedure.id) ?? [],
      status: appointment.status.id,
      comments: appointment.comments ?? "",
    },
  });

  const handleSubmit = useCallback(
    (appointment: UpdateAppointmentDto) => {
      updateAppointment({
        variables: { inputAppointment: appointment },
      });
    },
    [updateAppointment],
  );

  return (
    <AppointmentForm
      form={form}
      onSubmit={handleSubmit}
      mode="update"
      isSubmitting={loading}
    />
  );
};
