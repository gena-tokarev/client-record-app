"use client";

import * as React from "react";
import { type ThemeProviderProps } from "next-themes/dist/types";
import AuthProvider from "./auth-provider";

export function AuthProviderClient({ children }: ThemeProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
