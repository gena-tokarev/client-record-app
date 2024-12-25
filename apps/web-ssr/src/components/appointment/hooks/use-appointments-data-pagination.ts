import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { INITIAL_PAGINATION_MODEL } from "../constants";
import { GridPaginationModel } from "@mui/x-data-grid";
import { AppointmensDataContext } from "../providers/appointments-data-provider";

export const useAppointmentsDataPagination = () => {
  const [paginationModel, setPaginationModel] = useState({
    ...INITIAL_PAGINATION_MODEL,
    page: 0,
  });

  const mapPageToNextCursor = useRef<{ [page: number]: number }>({});

  const handlePaginationModelChange = useCallback(
    (newPaginationModel: GridPaginationModel) => {
      if (
        newPaginationModel.page === 0 ||
        mapPageToNextCursor.current[newPaginationModel.page - 1]
      ) {
        setPaginationModel(newPaginationModel);
      }
    },
    [],
  );

  const cursor = mapPageToNextCursor.current[paginationModel.page - 1];

  const { setVariables, data, loading } = useContext(AppointmensDataContext);

  useEffect(() => {
    setVariables({
      paginationModel: {
        pageSize: paginationModel.pageSize,
        cursor,
      },
    });
  }, [setVariables, cursor, paginationModel]);

  useEffect(() => {
    if (!loading && data.cursor) {
      mapPageToNextCursor.current[paginationModel.page] = data.cursor;
    }
  }, [data, paginationModel, loading]);

  return {
    onPaginationModelChange: handlePaginationModelChange,
    paginationModel,
  };
};
