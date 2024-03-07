import React, { FC, ReactNode, useCallback, useState } from "react";
import SidebarContext from "./SidebarContext";

interface Props {
    children?: ReactNode;
}

const SidebarProvider: FC<Props> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <SidebarContext.Provider
            value={{
                open,
                isOpen,
                onClose,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export default SidebarProvider;
