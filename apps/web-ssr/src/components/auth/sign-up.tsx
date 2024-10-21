"use client";

import { Controller, useForm } from "react-hook-form";
import AuthCard from "./auth-card";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { memo, useCallback, useContext } from "react";
import { SignUpValidator } from "@/components/auth/validators/sign-up.validator";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import AuthContext from "../providers/Auth/auth-context";

const SignUp = () => {
  const form = useForm<SignUpValidator>({
    resolver: classValidatorResolver(SignUpValidator),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSignUp } = useContext(AuthContext);

  const handleSubmit = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...submitData } = form.getValues();
    handleSignUp(submitData);
  }, [form, handleSignUp]);

  return (
    <AuthCard<SignUpValidator>
      form={form}
      title="Register a new account"
      description="Enter your data below"
      onSubmit={handleSubmit}
      submitButton={(isLoading: boolean) => (
        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          startIcon={<HowToRegIcon />}
          loading={isLoading}
        >
          Sign Up
        </LoadingButton>
      )}
    >
      <>
        <Controller
          name="username"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Email"
              type="text"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
            />
          )}
        />
        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              fullWidth
              margin="normal"
            />
          )}
        />
      </>
    </AuthCard>
  );
};

export default memo(SignUp);
