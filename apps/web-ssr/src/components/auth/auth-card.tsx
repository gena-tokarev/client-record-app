"use client";

import GoogleIcon from "@mui/icons-material/Google";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PropsWithChildren, ReactNode, useContext } from "react";
import AuthContext from "@/components/providers/auth/auth-context";
import { FieldValues, UseFormReturn } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Typography } from "@mui/material";

interface AuthCardProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  title: string;
  description: string;
  submitButton: (isLoading: boolean) => ReactNode;
}

const AuthCard = <T extends FieldValues>(
  props: PropsWithChildren<AuthCardProps<T>>,
) => {
  const { title, description, submitButton, onSubmit, form, children } = props;
  const { handleGoogle, isLoading } = useContext(AuthContext);

  return (
    <>
      <CardHeader className="text-center">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
          {children}
          <Box sx={{ marginTop: 3 }}>{submitButton(isLoading)}</Box>
        </Box>
        <LoadingButton
          sx={{ marginTop: 2 }}
          variant="outlined"
          fullWidth
          onClick={handleGoogle}
          type="button"
          loading={isLoading}
          startIcon={<GoogleIcon />}
        >
          Google
        </LoadingButton>
      </CardContent>
    </>
  );
};

export default AuthCard;
