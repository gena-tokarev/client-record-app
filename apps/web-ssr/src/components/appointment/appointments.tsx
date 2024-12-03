"use client";

import { AppointmentsGrid } from "./appointments-grid";
import { AppointmensDataProvider } from "./providers/appointments-data-provider";

export const Appointments = () => {
  return (
    <AppointmensDataProvider>
      <AppointmentsGrid />
    </AppointmensDataProvider>
  );
};
