"use client";

import { useContext } from "react";
import { SidebarContext } from "../providers/sidebar-provider";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import EventNoteIcon from "@mui/icons-material/EventNote";

const LINKS = [
  {
    id: 1,
    label: "Appointments",
    href: "/appointment/list",
    icon: EventNoteIcon,
  },
];

export const Sidebar = () => {
  const { open, toogle } = useContext(SidebarContext);

  return (
    <Drawer open={open} onClose={toogle}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toogle}>
        <List>
          {LINKS.map((link) => (
            <ListItem key={link.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <link.icon />
                </ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
