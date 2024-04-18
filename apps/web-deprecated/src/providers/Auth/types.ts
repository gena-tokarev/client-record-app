import { ApolloError } from "@apollo/client";

export interface AuthContextValue {
    login: (email: string, password: string) => void;
    logout: () => void;
    isAuth: boolean;
    loading: boolean;
    error?: ApolloError;
}
