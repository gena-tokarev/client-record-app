import { Header } from "@/components/header";
import SidebarProvider from "@/components/providers/sidebar-provider";
import { Sidebar } from "@/components/sidebar";
import { GraphqlProvider } from "@/components/providers/graphql-provider.client";
import { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";

const AuthorizedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <GraphqlProvider>
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
