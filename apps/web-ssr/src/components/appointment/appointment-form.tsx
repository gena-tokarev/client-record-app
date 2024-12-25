"use client";

import { DateTime } from "luxon";
import {
  useAppointmentStatusesQuery,
  useClientsQuery,
  useMastersQuery,
  useProceduresQuery,
} from "@/graphql/generated/graphql";
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
} from "@client-record/shared/src/modules/appointment/schemas/appointment.schema";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextFieldValueAsNumber } from "@/components/form/text-field-value-as-number";
import { Controller, SubmitHandler, UseFormReturn } from "react-hook-form";

type AppointmentFormProps<T extends "create" | "update"> = {
  form: UseFormReturn<
    T extends "create" ? CreateAppointmentDto : UpdateAppointmentDto,
    any,
    undefined
  >;
  onSubmit: SubmitHandler<
    T extends "create" ? CreateAppointmentDto : UpdateAppointmentDto
  >;
  isSubmitting?: boolean;
  mode: T;
};

export function AppointmentForm<T extends "create" | "update">(
  props: AppointmentFormProps<T>,
) {
  const { form: receivedForm, onSubmit, isSubmitting } = props;

  const form = receivedForm as UseFormReturn<
    CreateAppointmentDto | UpdateAppointmentDto,
    any,
    undefined
  >;

  const { data: dataClients } = useClientsQuery();
  const { data: dataMasters } = useMastersQuery();
  const { data: dataProcedures } = useProceduresQuery();
  const { data: dataAppointmentStatuses } = useAppointmentStatusesQuery();

  return (
    <Paper elevation={2} sx={{ m: 2, p: 4 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>
        {props.mode === "create" ? "Create appointment" : "Update appointment"}
      </Typography>
      <Box
        component="form"
        onSubmit={form.handleSubmit(
          onSubmit as SubmitHandler<
            CreateAppointmentDto | UpdateAppointmentDto
          >,
        )}
      >
        <Controller
          name="date"
          control={form.control}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              onChange={(value) => field.onChange(value?.toISO())}
              value={DateTime.fromISO(field.value ?? "")}
              // fullWidth
              label="Date"
              // error={!!form.formState.errors.date}
              // helperText={form.formState.errors.date?.message}
            />
          )}
        />
        <Controller
          name="complaints"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              minRows={2}
              label="Complaints"
              type="text"
              fullWidth
              margin="normal"
              error={!!form.formState.errors.complaints}
              helperText={form.formState.errors.complaints?.message}
            />
          )}
        />
        <Controller
          name="price"
          control={form.control}
          render={({ field }) => (
            <TextFieldValueAsNumber
              {...field}
              label="Price"
              type="number"
              fullWidth
              margin="normal"
              error={!!form.formState.errors.price}
              helperText={form.formState.errors.price?.message}
            />
          )}
        />
        <Controller
          name="client"
          control={form.control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel id="client-label">Client</InputLabel>
              <Select
                labelId="client-label"
                {...field}
                label="Client"
                error={!!form.formState.errors.client}
              >
                {dataClients?.clients.map((client) => (
                  <MenuItem key={client.id} value={client.id}>
                    {client.fullName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="master"
          control={form.control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel id="master-label">Master</InputLabel>
              <Select
                labelId="master-label"
                {...field}
                label="Master"
                error={!!form.formState.errors.master}
              >
                {dataMasters?.masters.map((master) => (
                  <MenuItem key={master.id} value={master.id}>
                    {master.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="procedures"
          control={form.control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel id="procedures-label">Procedures</InputLabel>
              <Select
                multiple
                labelId="procedures-label"
                {...field}
                label="Procedures"
                error={!!form.formState.errors.procedures}
              >
                {dataProcedures?.procedures.map((procedure) => (
                  <MenuItem key={procedure.id} value={procedure.id}>
                    {procedure.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                {...field}
                label="Status"
                error={!!form.formState.errors.status}
              >
                {dataAppointmentStatuses?.appointmentStatuses.map(
                  (appointmentStatus) => (
                    <MenuItem
                      key={appointmentStatus.id}
                      value={appointmentStatus.id}
                    >
                      {appointmentStatus.value}
                    </MenuItem>
                  ),
                )}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="comments"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              multiline
              minRows={2}
              label="Comments"
              type="text"
              fullWidth
              margin="normal"
              error={!!form.formState.errors.comments}
              helperText={form.formState.errors.comments?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </Box>
    </Paper>
  );
}
