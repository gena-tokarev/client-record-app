import { Header } from "@/components/header";
import SidebarProvider from "@/components/providers/sidebar-provider";
import { Sidebar } from "@/components/sidebar";
import { FC, PropsWithChildren } from "react";

const AuthorizedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AuthorizedLayout;
