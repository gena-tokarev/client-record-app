"use client";

import { AccountDropdown } from "../account-dropdown";
import { CreateNew } from "../create-new";
import { SidebarToggle } from "../sidebar/sidebar-toggle";

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="pl-4 pr-8 flex h-14 items-center">
        <SidebarToggle />
        <div className="flex-1"></div>
        <div className="flex items-center">
          <CreateNew />
          <div className="ml-4">
            <AccountDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};
