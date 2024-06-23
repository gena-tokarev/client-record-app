"use client";

import SignIn from "@/components/auth/sign-in";
import SignUp from "@/components/auth/sign-up";
import { Card, CardContent, Tab, Tabs } from "@mui/material";
import { SyntheticEvent, useCallback, useState } from "react";

export const Auth = () => {
  const [value, setValue] = useState(0);

  const handleChange = useCallback(
    (event: SyntheticEvent, newValue: number) => {
      setValue(newValue);
    },
    [],
  );

  return (
    <>
      <Card>
        <Tabs
          value={value}
          onChange={handleChange}
          defaultValue="signin"
          variant="fullWidth"
        >
          <Tab value={0} label="Sign in" sx={{ flex: 1 }} />
          <Tab value={1} label="Sign up" sx={{ flex: 1 }} />
        </Tabs>
        <CardContent>
          {value === 0 && <SignIn />}
          {value === 1 && <SignUp />}
        </CardContent>
      </Card>
    </>
  );
};
