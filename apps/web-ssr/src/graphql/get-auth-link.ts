import { setContext } from "@apollo/client/link/context";

export const getAuthLink = (token?: string) =>
  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
