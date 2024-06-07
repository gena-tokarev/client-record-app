import { useContext } from "react";
import { SidebarContext } from "../providers/sidebar-provider";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";

export const SidebarToggle = () => {
  const { toogle } = useContext(SidebarContext);

  return (
    <IconButton
      size="large"
      aria-label="main menu"
      aria-controls="menu"
      aria-haspopup="true"
      onClick={toogle}
      color="inherit"
    >
      <MenuIcon />
    </IconButton>
  );
};
