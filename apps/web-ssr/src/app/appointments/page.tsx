"use client";

import AuthContext from "@/components/providers/Auth/auth-context";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

const AppointmentsPageClient = () => {
  const { logout } = useContext(AuthContext);

  return <Button onClick={logout}>Logout</Button>;
};

export default AppointmentsPageClient;
