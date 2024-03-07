import React, { FC, useContext } from "react";
import { Box, Drawer } from "@mui/material";
import { SidebarMenuProps } from "./types";
import Menu from "./components/Menu";
import SidebarContext from "../../providers/Sidebar/SidebarContext";

const DRAWER_WIDTH = 240;

const container = document?.body ?? null;

const SidebarMenu: FC<SidebarMenuProps> = () => {
    const { isOpen, onClose } = useContext(SidebarContext);

    return (
        <Box
            component="nav"
            sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={isOpen}
                onClose={onClose}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: DRAWER_WIDTH,
                    },
                }}
            >
                <Menu />
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: DRAWER_WIDTH,
                    },
                }}
                open
            >
                <Menu />
            </Drawer>
        </Box>
    );
};

export default SidebarMenu;
