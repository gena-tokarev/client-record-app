"use client";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { AccountDropdown } from "../account-dropdown";
import { SidebarToggle } from "../sidebar/sidebar-toggle";
import { CreateNew } from "../create-new";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <SidebarToggle />
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        ></Typography>
        <CreateNew />
        <AccountDropdown />
      </Toolbar>
    </AppBar>
  );
};
