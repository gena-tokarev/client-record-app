"use client";

import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider/LocalizationProvider";
import { FC, PropsWithChildren } from "react";

export const LocalizationProviderClient: FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      {children}
    </LocalizationProvider>
  );
};
