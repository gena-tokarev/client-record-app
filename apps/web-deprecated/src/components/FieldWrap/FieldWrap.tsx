import React, { FC, ReactNode } from "react";
import { Grid } from "@mui/material";

interface Props {
    children?: ReactNode;
}

const FieldWrap: FC<Props> = ({ children }) => {
    return (
        <Grid
            sx={{
                gridColumn: {
                    xs: "span 12",
                    md: "span 6",
                    lg: "span 4",
                    xl: "span 3",
                },
            }}
        >
            {children}
        </Grid>
    );
};

export default FieldWrap;
