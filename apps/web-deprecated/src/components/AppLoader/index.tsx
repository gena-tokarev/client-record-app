import React, { FC } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

const AppLoader: FC<{ open?: boolean }> = ({ open }) => {
    return (
        <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={!!open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default AppLoader;
