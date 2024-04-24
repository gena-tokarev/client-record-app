"use client";

import { useForm } from "react-hook-form";
import AuthCard from "./auth-card";
import { UserSignInRequestDto } from "@client-record/shared/src/dto/user-sign-in.request.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { memo, useContext } from "react";
import AuthContext from "@/components/providers/Auth/auth-context";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
      submitLabel="Sign In"
      onSubmit={handleLocal}
    >
      <>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            return (
              <>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </>
    </AuthCard>
  );
};

export default memo(SignIn);
