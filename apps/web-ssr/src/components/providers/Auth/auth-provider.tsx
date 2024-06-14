"use client";

import React, { FC, ReactNode, useCallback, useState } from "react";
import { UserSignUpRequestDto } from "@client-record/shared/src/schemas/user-sign-up.request.dto";
import { useRouter } from "next/navigation";
import { UserSignInRequestDto } from "@client-record/shared/src/schemas/user-sign-in.request.dto";
import AuthContext from "./auth-context";

interface Props {
  children?: ReactNode;
}

const AuthProvider: FC<Props> = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignUp = useCallback(
    async (values: UserSignUpRequestDto) => {
      await fetch(`${process.env.API_HOST}/auth/register`, {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });

      router.replace(process.env.NEXT_APP_HOST);
    },
    [router],
  );

  const handleLocal = useCallback(async (values: UserSignInRequestDto) => {
    await fetch(`${process.env.API_HOST}/auth/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    window.location.href = process.env.NEXT_APP_HOST;
    // router.replace(process.env.NEXT_APP_HOST);
    // const timestamp = new Date().getTime(); // Получение текущего времени
    // router.replace(`${process.env.NEXT_APP_HOST}`);
  }, []);

  const handleGoogle = useCallback(() => {
    window.open(
      `${process.env.API_HOST}/auth/google?frontend_redirect_uri=${encodeURIComponent(process.env.NEXT_APP_HOST)}`,
      "_self",
    );
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    await fetch(`${process.env.API_HOST}/auth/logout`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
    });

    router.push(process.env.NEXT_APP_HOST);
    setIsLoading(false);
  }, [router]);

  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        handleLocal,
        handleGoogle,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
