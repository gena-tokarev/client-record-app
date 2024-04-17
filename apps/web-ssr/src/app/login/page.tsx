"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCallback } from "react";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { UserSignUpRequestDto } from "@client-record/shared/src/dto/user-sign-up.request.dto";

const LoginPageClient = () => {
  const form = useForm<UserSignUpRequestDto>({
    resolver: classValidatorResolver(UserSignUpRequestDto),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = useCallback((values: UserSignUpRequestDto) => {
    fetch(`${process.env.API_HOST}/auth/register`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json",
      },
    });
  }, []);

  const handleGoogle = useCallback(() => {
    window.open(
      `${process.env.API_HOST}/auth/google?frontend_redirect_uri=${encodeURIComponent(process.env.OAUTH_REDIRECT_URL)}`,
      "_self",
    );
  }, []);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => {
              return (
                <>
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
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
                      <Input placeholder="Password" {...field} />
                    </FormControl>
                    <FormDescription>This is your password.</FormDescription>
                    <FormMessage />
                  </FormItem>
                </>
              );
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <Button type="button" onClick={handleGoogle}>
        Google
      </Button>
    </>
  );
};

export default LoginPageClient;
