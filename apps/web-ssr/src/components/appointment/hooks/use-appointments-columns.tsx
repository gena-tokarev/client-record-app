import { useMemo } from "react";
import { Appointment } from "@/graphql/generated/graphql";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { getSelectOptions } from "../../grid/utils/get-select-options";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppointmentsOptionsData } from "./use-appointments-options-data";
import { GridSelectMultiple } from "@/components/grid/grid-select-multiple";
import { useAppointmentDelete } from "./use-appointment-delete";

export const useAppointmentsColumns = () => {
  const { appointmentStatuses, clients, masters, procedures } =
    useAppointmentsOptionsData();

  const { onDeleteAppointment } = useAppointmentDelete();

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
                onDeleteAppointment(params.id as string);
              }}
            />,
          ];
        },
      },
    ],
    [clients, masters, procedures, appointmentStatuses, onDeleteAppointment],
  );

  return columns;
};
