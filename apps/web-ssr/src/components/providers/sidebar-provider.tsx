"use client";

import React, { FC, ReactNode, useCallback, useState } from "react";

interface SidebarContextValue {
  open: boolean;
  toogle: () => void;
}

export const SidebarContext = React.createContext<SidebarContextValue>({
  open: true,
  toogle: () => void 0,
});

interface Props {
  children?: ReactNode;
}

const SidebarProvider: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = useCallback(() => {
    const newState = !open;
    setOpen(newState);
  }, [open]);

  return (
    <SidebarContext.Provider
      value={{
        open,
        toogle: handleToggle,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
