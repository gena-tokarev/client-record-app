import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { useContext } from "react";
import { SidebarContext } from "../providers/sidebar-provider";

export const SidebarToggle = () => {
  const { toogle } = useContext(SidebarContext);

  return (
    <Button variant="ghost" size="icon" onClick={toogle}>
      <Menu />
    </Button>
  );
};
