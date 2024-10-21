"use client";

import { Controller, useForm } from "react-hook-form";
import AuthCard from "./auth-card";
import { UserSignInRequestDto } from "@client-record/shared/src/schemas/user-sign-in.request.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { memo, useContext } from "react";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginIcon from "@mui/icons-material/Login";
import AuthContext from "../providers/Auth/auth-context";

const SignIn = () => {
  const form = useForm<UserSignInRequestDto>({
    resolver: classValidatorResolver(UserSignInRequestDto),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { handleLocal } = useContext(AuthContext);

  return (
    <AuthCard<UserSignInRequestDto>
      form={form}
      title="Log into your account"
      description="Enter your credentials below"
      onSubmit={handleLocal}
      submitButton={(isLoading: boolean) => (
        <LoadingButton
          variant="contained"
          fullWidth
          type="submit"
          startIcon={<LoginIcon />}
          loading={isLoading}
        >
          Sign In
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
      </>
    </AuthCard>
  );
};

export default memo(SignIn);
