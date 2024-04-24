import React from "react";
import { AuthContextValue } from "./types";

const AuthContext = React.createContext<AuthContextValue>({
  handleSignUp: () => void 0,
  handleLocal: () => void 0,
  handleGoogle: () => void 0,
  logout: () => void 0,
  isLoading: false,
});

export default AuthContext;
