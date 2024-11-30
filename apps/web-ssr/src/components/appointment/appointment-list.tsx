"use client";

import {
  Appointment,
  AppointmentsOutput,
  Query,
  useDeleteAppointmentMutation,
} from "@/graphql/generated/graphql";
import { useCallback, useMemo, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
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
import { useAppointmentListSubscriptions } from "./hooks/useAppointmentListSubsctiptions";
import { useAppointmentListData } from "./hooks/useAppointmentListData";
import { AsStoreObject } from "@apollo/client/utilities";

const PAGE_SIZE = 5;

const SERVER_OPTIONS = {
  useCursorPagination: true,
  paginationModel: {
    page: 0,
    pageSize: PAGE_SIZE,
  },
};

export const AppointmentList = () => {
  const {
    appointments,
    appointmentsCount,
    appointmentStatuses,
    clients,
    masters,
    procedures,
  } = useAppointmentListData();

  useAppointmentListSubscriptions();

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
              total: appointmentsQuery.count - 1,
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
        ...getSelectOptions(clients, (client) => client.fullName),
      },
      {
        field: "master",
        headerName: "Master",
        editable: true,
        type: "singleSelect",
        ...getSelectOptions(masters, (master) => master.name),
      },
      {
        field: "procedures",
        headerName: "Procedures",
        editable: true,
        ...getSelectOptions(procedures, (procedure) => procedure.name, true),
        renderEditCell: (params) => (
          <GridSelectMultiple options={procedures ?? []} {...params} />
        ),
      },
      {
        field: "status",
        headerName: "Status",
        editable: true,
        type: "singleSelect",
        ...getSelectOptions(appointmentStatuses, (status) => status.value),
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
      clients,
      masters,
      procedures,
      appointmentStatuses,
      handleDeleteAppointment,
    ],
  );

  const [initialized, setInitialized] = useState(false);

  const handleStateChange = useCallback(() => {
    setInitialized(true);
  }, []);

  const handlePaginationModelChange = (
    newPaginationModel: GridPaginationModel,
  ) => {
    if (newPaginationModel.page > 0) {
      
    }
  };

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
          !clients ||
          !appointments ||
          !masters ||
          !procedures ||
          !appointmentStatuses
        }
        disableRowSelectionOnClick
        autosizeOnMount
        rows={appointments}
        columns={columns}
        showCellVerticalBorder
        showColumnVerticalBorder
        pageSizeOptions={[10, 20, 30, 50, 100]}
        checkboxSelection
        onStateChange={handleStateChange}
        paginationMode="server"
        rowCount={appointmentsCount}
        onPaginationModelChange={handlePaginationModelChange}
        {...SERVER_OPTIONS}
      />
    </Box>
  );
};
