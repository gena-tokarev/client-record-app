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
      <Tabs
        value={value}
        onChange={handleChange}
        defaultValue="signin"
        className="w-[400px]"
        sx={{ with: "400px" }}
      >
        <Tab value={0} label="Sign in" />
        <Tab value={1} label="Sign up" />
      </Tabs>
      <Card>
        <CardContent>
          {value === 0 && <SignIn />}
          {value === 1 && <SignUp />}
        </CardContent>
      </Card>
    </>
  );
};
