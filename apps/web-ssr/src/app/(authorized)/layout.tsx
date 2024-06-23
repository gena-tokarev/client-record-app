import { Header } from "@/components/header";
import SidebarProvider from "@/components/providers/sidebar-provider";
import { Sidebar } from "@/components/sidebar";
import { GraphqlProvider } from "@/components/providers/graphql-provider.client";
import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { getCookieServer } from "@/lib/get-cookie/get-cookie.server";

const AuthorizedLayout: FC<PropsWithChildren> = async ({ children }) => {
  const authToken = await getCookieServer("access_token");

  return (
    <GraphqlProvider authToken={authToken}>
      <SidebarProvider>
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Header />
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <Sidebar />
            {children}
          </Box>
        </Box>
      </SidebarProvider>
    </GraphqlProvider>
  );
};

export default AuthorizedLayout;
