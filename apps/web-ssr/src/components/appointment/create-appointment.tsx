"use client";

import { useCreateAppointmentMutation } from "@/graphql/generated/graphql";
import {
  CreateAppointmentDto,
  createAppointmentSchema,
} from "@client-record/shared/src/modules/appointment/schemas/appointment.schema";
import { useCallback } from "react";
import { AppointmentForm } from "./appointment-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DateTime } from "luxon";

export const CreateAppointment = () => {
  const [createAppointment, { data, loading }] = useCreateAppointmentMutation();

  const form = useForm<CreateAppointmentDto>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      date: DateTime.now().toISO(),
      complaints: "",
      price: 0,
      client: "",
      master: "",
      procedures: [],
      status: "",
      comments: "",
    },
  });

  const handleSubmit = useCallback(
    (appointment: CreateAppointmentDto) => {
      createAppointment({ variables: { inputAppointment: appointment } });
    },
    [createAppointment],
  );

  return (
    <AppointmentForm
      form={form}
      onSubmit={handleSubmit}
      mode="create"
      isSubmitting={loading}
    />
  );
};
