"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { SidebarContext } from "../providers/sidebar-provider";
import { SidebarToggle } from "./sidebar-toggle";

const LINKS = [{ id: 1, label: "Appointments", href: "/appointments" }];

export const Sidebar = () => {
  const { open, toogle } = useContext(SidebarContext);

  return (
    <>
      <div
        className={`${!open ? "-translate-x-full" : ""} transform transition-transform duration-300 ease-in-out bg-background fixed top-0 bottom-0 left-0 z-[100]`}
      >
        <div className="h-14 flex items-center pl-4">
          <SidebarToggle />
        </div>
        <nav className="px-2 text-sm font-medium lg:px-4">
          {LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Home className="h-4 w-4" />
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div
        onClick={toogle}
        className={`${open ? "bg-muted/40 visible" : "bg-muted/0 invisible"} z-[99] transition-all duration-300 ease-in-out fixed top-0 left-0 right-0 bottom-0`}
      />
    </>
  );
};
