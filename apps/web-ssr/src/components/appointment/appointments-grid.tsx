import { useCallback, useContext, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Loader from "../loader";
import { PAGE_SIZE } from "./constants";
import { useAppointmentsColumns } from "./hooks/use-appointments-columns";
import { useAppointmentsDataPagination } from "./hooks/use-appointments-data-pagination";
import { AppointmensDataContext } from "./providers/appointments-data-provider";
import { useAppointmentsDataFiltering } from "./hooks/use-appointments-data-filtering";

const pageSizeOptions = [PAGE_SIZE];

export const AppointmentsGrid = () => {
  const [initialized, setInitialized] = useState(false);

  const handleStateChange = useCallback(() => {
    setInitialized(true);
  }, []);

  const columns = useAppointmentsColumns();

  const { onPaginationModelChange, paginationModel } =
    useAppointmentsDataPagination();
  const { onFilterModelChange } = useAppointmentsDataFiltering();

  const { data, loading } = useContext(AppointmensDataContext);

  return (
    <Box
      sx={{
        height: "calc(100vh - 61px)",
        padding: 3,
      }}
    >
      {!initialized && <Loader />}
      <DataGrid
        loading={loading}
        disableRowSelectionOnClick
        autosizeOnMount
        rows={data.data}
        columns={columns}
        showCellVerticalBorder
        showColumnVerticalBorder
        pageSizeOptions={pageSizeOptions}
        checkboxSelection
        onStateChange={handleStateChange}
        rowCount={data.count}
        onPaginationModelChange={onPaginationModelChange}
        paginationModel={paginationModel}
        onFilterModelChange={onFilterModelChange}
        paginationMode="server"
        filterMode="server"
        // sortingMode="server"
      />
    </Box>
  );
};
