import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

const UnauthorizedLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ flex: 1, overflow: "hidden" }}>{children}</Box>
    </Box>
  );
};

export default UnauthorizedLayout;
