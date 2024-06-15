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
import { Box } from "@mui/material";

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
        <div className="mx-auto flex w-full flex-col justify-center space-y-6">
          <Box component="form" onSubmit={form.handleSubmit(onSubmit)}>
            {children}
            {submitButton(isLoading)}
          </Box>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <LoadingButton
            variant="outlined"
            fullWidth
            onClick={handleGoogle}
            type="button"
            loading={isLoading}
            startIcon={<GoogleIcon />}
          >
            Google
          </LoadingButton>
        </div>
      </CardContent>
    </>
  );
};

export default AuthCard;
