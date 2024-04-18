import React, { FC, useCallback, useContext } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import AuthContext from "providers/Auth/AuthContext";

const AccountButton: FC = () => {
    const { logout } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleOpen = useCallback(
        (event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget);
        },
        []
    );

    return (
        <div>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                open={!!anchorEl}
                anchorEl={anchorEl}
                onClose={handleClose}
                id="menu-appbar"
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={logout}>Log Out</MenuItem>
            </Menu>
        </div>
    );
};

export default AccountButton;
