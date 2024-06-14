"use client";

import {
  Appointment,
  Procedure,
  useAppointmentStatusesQuery,
  useClientsQuery,
  useMastersQuery,
  useOnAppointmentUpdatedSubscription,
  useProceduresQuery,
} from "@/graphql/generated/graphql";
import { FC, useEffect, useMemo, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { TransformedObject, transformItem } from "./utils";
import { GridSelectMultiple } from "../grid/grid-select-multiple";
import { Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";

type TransformedAppointment = TransformedObject<Appointment>;

export const AppointmentList: FC<{
  initialData: TransformedAppointment[];
}> = ({ initialData }) => {
  const [data, setData] = useState(initialData);

  const { data: dataClients } = useClientsQuery();
  const { data: dataMasters } = useMastersQuery();
  const { data: dataProcedures } = useProceduresQuery();
  const { data: dataStatuses } = useAppointmentStatusesQuery();

  const {
    data: newAppointmentsData,
    error,
    loading,
  } = useOnAppointmentUpdatedSubscription();

  const newAppointment = newAppointmentsData?.onAppointmentUpdated;

  useEffect(() => {
    if (newAppointment) {
      setData((prevData) => {
        const isNew = !prevData.some(
          (appointment) => appointment.id === newAppointment.id,
        );
        if (isNew) {
          return [...prevData, transformItem(newAppointment)];
        }
        return prevData;
      });
    }
  }, [newAppointment]);

  const columns = useMemo<GridColDef<TransformedAppointment>[]>(
    () => [
      { field: "id", headerName: "ID" },
      { field: "date", headerName: "Date", editable: true },
      { field: "price", headerName: "Price", editable: true },
      {
        field: "client",
        headerName: "Client",
        editable: true,
        type: "singleSelect",
        valueOptions: dataClients?.clients.map((client) => {
          return {
            value: client.id,
            label: client.fullName,
          };
        }),
      },
      {
        field: "master",
        headerName: "Master",
        editable: true,
        type: "singleSelect",
        valueOptions: dataMasters?.masters.map((master) => {
          return {
            value: master.id,
            label: master.name,
          };
        }),
      },
      {
        field: "procedures",
        headerName: "Procedures",
        editable: true,
        valueFormatter: (value: Procedure["id"][]) => {
          return value.map((valueProcedure) => {
            const foundProcedure = dataProcedures?.procedures.find(
              (procedure) => procedure.id === valueProcedure,
            );

            if (foundProcedure) {
              return foundProcedure.name;
            }
          });
        },
        renderEditCell: (params) => (
          <GridSelectMultiple
            options={dataProcedures?.procedures ?? []}
            getOptionValue={(option: Procedure) => option.id}
            getOptionLabel={(option: Procedure) => option.name}
            {...params}
          />
        ),
      },
      {
        field: "status",
        headerName: "Status",
        editable: true,
        type: "singleSelect",
        valueOptions: dataStatuses?.appointmentStatuses.map((status) => {
          return {
            value: status.id,
            label: status.value,
          };
        }),
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
          ];
        },
      },
    ],
    [dataClients, dataMasters, dataProcedures, dataStatuses],
  );

  if (!dataClients || !data) return null;

  return (
    <Box
      sx={{
        height: "calc(100vh - 61px)",
        padding: 3,
      }}
    >
      <DataGrid
        autosizeOnMount
        rows={data}
        columns={columns}
        showCellVerticalBorder
        showColumnVerticalBorder
        pageSizeOptions={[10, 20, 30, 50, 100]}
        checkboxSelection
      />
    </Box>
  );
};
