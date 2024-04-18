import React, { useCallback } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

const AddNewButton = () => {
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
            <Button
                onClick={handleOpen}
                aria-label="add"
                size="medium"
                startIcon={<AddIcon />}
            >
                Создать
            </Button>
            <Menu
                anchorEl={anchorEl}
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
                open={!!anchorEl}
                onClose={handleClose}
            >
                <MenuItem component={Link} to="/appointment-create">
                    Запись
                </MenuItem>
                <MenuItem component={Link} to="/client-create">
                    Клиента
                </MenuItem>
            </Menu>
        </div>
    );
};

export default AddNewButton;
