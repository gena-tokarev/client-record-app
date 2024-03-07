import Divider from "@mui/material/Divider";
import React from "react";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Link } from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <ListItem component={Link} button to="/appointments">
                    <ListItemIcon>
                        <EventAvailableIcon />
                    </ListItemIcon>
                    <ListItemText primary="Записи" />
                </ListItem>
            </List>
        </div>
    );
};

export default Menu;
