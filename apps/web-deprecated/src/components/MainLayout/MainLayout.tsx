import React, { FC, ReactNode } from "react";
import Header from "../Header";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import { Box, Container } from "@mui/material";

interface Props {
    children?: ReactNode;
}

const MainLayout: FC<Props> = ({ children }) => {
    return (
        <Box sx={{ display: "flex" }}>
            <Header />
            <SidebarMenu />
            <Box
                sx={{
                    width: { sm: "calc(100% - 240px)" },
                    paddingTop: { sm: "94px", xs: "76px" },
                    position: "relative",
                    flex: 1,
                }}
            >
                <Container maxWidth={false}>{children}</Container>
            </Box>
        </Box>
    );
};

export default MainLayout;
