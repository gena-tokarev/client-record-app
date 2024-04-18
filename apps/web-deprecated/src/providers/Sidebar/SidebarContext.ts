import React from "react";
import { SidebarContextValue } from "./types";

const SidebarContext = React.createContext<SidebarContextValue>({
    open: () => void 0,
    isOpen: false,
    onClose: () => void 0,
});

export default SidebarContext;
