import { GridFilterModel } from "@mui/x-data-grid";
import { useCallback, useContext } from "react";
import { AppointmensDataContext } from "../providers/appointments-data-provider";

export const useAppointmentsDataFiltering = () => {
  const { setVariables } = useContext(AppointmensDataContext);

  const handleFilterModelChange = useCallback(
    (model: GridFilterModel) => {
      setVariables({
        filterModel: model.items,
      });
    },
    [setVariables],
  );

  return {
    onFilterModelChange: handleFilterModelChange,
  };
};
