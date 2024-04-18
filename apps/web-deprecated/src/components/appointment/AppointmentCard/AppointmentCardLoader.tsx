import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { Skeleton } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

const AppointmentCardLoader = () => {
    return (
        <Card>
            <CardHeader
                avatar={<Skeleton variant="circular" width={40} height={40} />}
                title={
                    <Skeleton
                        height="0.875rem"
                        width="70%"
                        style={{ marginBottom: 6 }}
                    />
                }
                subheader={<Skeleton height="0.875rem" width="60%" />}
            />
            <CardContent>
                <Skeleton
                    height={18}
                    width="100%"
                    style={{ marginBottom: 6 }}
                />
                <Skeleton
                    height={18}
                    width="100%"
                    style={{ marginBottom: 6 }}
                />
                <Skeleton
                    height={18}
                    width="100%"
                    style={{ marginBottom: 6 }}
                />
                <Skeleton height={18} width="100%" />
            </CardContent>
            <CardActions disableSpacing>
                <Skeleton variant="rectangular" width={0} height={24} />
            </CardActions>
        </Card>
    );
};

export default AppointmentCardLoader;
