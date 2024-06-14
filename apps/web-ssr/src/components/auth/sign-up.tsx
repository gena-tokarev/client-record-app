"use client";

import { useForm } from "react-hook-form";
import AuthCard from "./auth-card";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { memo, useCallback, useContext } from "react";
import AuthContext from "@/components/providers/auth/auth-context";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignUpValidator } from "@/components/auth/validators/sign-up.validator";

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
      submitLabel="Sign Up"
      onSubmit={handleSubmit}
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
                    <Input type="email" placeholder="Email" {...field} />
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
              <>
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            );
          }}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => {
            return (
              <>
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confrm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            );
          }}
        />
      </>
    </AuthCard>
  );
};

export default memo(SignUp);
