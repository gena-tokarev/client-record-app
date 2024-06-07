"use client";

import { Box, Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import { useCallback, MouseEvent, useState } from "react";

export const CreateNew = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box>
      <Button onClick={handleMenu}>Create new</Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link
          href="/appointment/create"
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <MenuItem>Appointment</MenuItem>
        </Link>
      </Menu>
    </Box>
  );
};
