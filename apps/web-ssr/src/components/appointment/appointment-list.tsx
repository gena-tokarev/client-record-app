"use client";

import {
  Appointment,
  Query,
  useAppointmentStatusesSuspenseQuery,
  useAppointmentsQuery,
  useClientsSuspenseQuery,
  useDeleteAppointmentMutation,
  useMastersSuspenseQuery,
  useOnAppointmentDeletedSubscription,
  useOnAppointmentUpdatedSubscription,
  useProceduresSuspenseQuery,
} from "@/graphql/generated/graphql";
import { useCallback, useMemo, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { GridSelectMultiple } from "../grid/grid-select-multiple";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import Loader from "../loader";
import { ApolloCache } from "@apollo/client";
import { getSelectOptions } from "../grid/utils/get-select-options";

export const AppointmentList = () => {
  const { data: initialData, loading } = useAppointmentsQuery();

  const { data: dataClients } = useClientsSuspenseQuery();
  const { data: dataMasters } = useMastersSuspenseQuery();
  const { data: dataProcedures } = useProceduresSuspenseQuery();
  const { data: dataStatuses } = useAppointmentStatusesSuspenseQuery();

  const [deleteAppointment] = useDeleteAppointmentMutation({
    update: (cache: ApolloCache<Query>, { data }) => {
      if (!data) return;

      const deletedAppointmentId = data.deleteAppointment;

      cache.modify<Query>({
        fields: {
          appointments(existingAppointmentRefs, { readField }) {
            return existingAppointmentRefs.filter(
              (appointmentRef) =>
                readField<string>("id", appointmentRef) !==
                deletedAppointmentId,
            );
          },
        },
      });
    },
  });
  const { data: deletedAppointment } = useOnAppointmentDeletedSubscription();
  const { data: newAppointmentsData } = useOnAppointmentUpdatedSubscription();

  const deletedAppointmentId =
    deletedAppointment?.onAppointmentDeleted?.id ?? null;
  const newAppointment = newAppointmentsData?.onAppointmentUpdated;

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

  // useEffect(() => {
  //   if (newAppointment) {
  //     setData((prevData) => {
  //       const isNew = !prevData.some(
  //         (appointment) => appointment.id === newAppointment.id,
  //       );
  //       if (isNew) {
  //         return [...prevData, newAppointment];
  //       }
  //       return prevData;
  //     });
  //   }
  // }, [newAppointment]);

  // useEffect(() => {
  //   if (deletedAppointmentId) {
  //     setData((prevData) => {
  //       return prevData.filter(
  //         (appointment) => appointment.id !== deletedAppointmentId,
  //       );
  //     });
  //   }
  // }, [deletedAppointmentId]);

  const columns = useMemo<GridColDef<Appointment>[]>(
    () => [
      { field: "id", headerName: "ID" },
      { field: "date", headerName: "Date", editable: true },
      { field: "price", headerName: "Price", editable: true },
      {
        field: "client",
        headerName: "Client",
        editable: true,
        type: "singleSelect",
        ...getSelectOptions(dataClients?.clients, (client) => client.fullName),
      },
      {
        field: "master",
        headerName: "Master",
        editable: true,
        type: "singleSelect",
        ...getSelectOptions(dataMasters?.masters, (master) => master.name),
      },
      {
        field: "procedures",
        headerName: "Procedures",
        editable: true,
        ...getSelectOptions(
          dataProcedures?.procedures,
          (procedure) => procedure.name,
          true,
        ),
        renderEditCell: (params) => (
          <GridSelectMultiple
            options={dataProcedures?.procedures ?? []}
            {...params}
          />
        ),
      },
      {
        field: "status",
        headerName: "Status",
        editable: true,
        type: "singleSelect",
        ...getSelectOptions(
          dataStatuses?.appointmentStatuses,
          (status) => status.value,
        ),
      },
      {
        field: "complaints",
        headerName: "Complaints",
        editable: true,
        flex: 1,
      },
      { field: "comments", headerName: "Comments", editable: true, flex: 1 },
      {
        field: "actions",
        type: "actions",
        getActions: (params: GridRowParams) => {
          return [
            <Link key={1} href={`/appointment/update/${params.id}`}>
              <GridActionsCellItem icon={<EditIcon />} label="Edit" />
            </Link>,
            <GridActionsCellItem
              key={2}
              icon={<DeleteIcon />}
              label="Delete"
              onClick={() => {
                handleDeleteAppointment(params.id as string);
              }}
            />,
          ];
        },
      },
    ],
    [
      dataClients,
      dataMasters,
      dataProcedures,
      dataStatuses,
      handleDeleteAppointment,
    ],
  );

  const [initialized, setInitialized] = useState(false);

  const handleStateChange = useCallback(() => {
    setInitialized(true);
  }, []);

  return (
    <Box
      sx={{
        height: "calc(100vh - 61px)",
        padding: 3,
      }}
    >
      {!initialized && <Loader />}
      <DataGrid
        loading={
          !dataClients ||
          !initialData?.appointments ||
          !dataMasters ||
          !dataProcedures ||
          !dataStatuses ||
          loading
        }
        disableRowSelectionOnClick
        autosizeOnMount
        rows={initialData?.appointments}
        columns={columns}
        showCellVerticalBorder
        showColumnVerticalBorder
        pageSizeOptions={[10, 20, 30, 50, 100]}
        checkboxSelection
        onStateChange={handleStateChange}
      />
    </Box>
  );
};
