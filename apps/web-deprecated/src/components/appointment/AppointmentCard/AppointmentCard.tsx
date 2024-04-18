import React, { useMemo } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, Checkbox, Chip, Grid } from "@mui/material";
import { FC, memo } from "react";
import { AppointmentCardProps } from "./types";
import stringToColor from "../../../utils/stringToColor";
import { Link } from "react-router-dom";

const AppointmentCard: FC<AppointmentCardProps> = (props) => {
    const { complaint, clientName, date, masterName, price, id, procedures } =
        props;

    const clientAvatarColor = useMemo(
        () => stringToColor(clientName),
        [clientName]
    );

    const masterAvatarColor = useMemo(
        () => stringToColor(masterName),
        [masterName]
    );

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar
                        sx={{
                            bgcolor: clientAvatarColor,
                            textDecoration: "none",
                            color: (theme) =>
                                theme.palette.getContrastText(
                                    clientAvatarColor
                                ),
                        }}
                        component={Link}
                        to="/appointment/1"
                        aria-label="recipe"
                    >
                        {clientName[0]}
                    </Avatar>
                }
                action={
                    <>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton
                            component={Link}
                            to={`/appointment-update/${id}`}
                            aria-label="edit"
                        >
                            <EditIcon />
                        </IconButton>
                        <Checkbox id="aaa" />
                    </>
                }
                title={
                    <Box
                        component={Link}
                        to="/appointment/1"
                        sx={{
                            textDecoration: "none",
                        }}
                    >
                        {clientName}
                    </Box>
                }
                subheader={date}
            />
            <Box sx={{ marginLeft: 2, marginRight: 2 }}>
                {procedures.map((procedure) => (
                    <Chip
                        key={procedure}
                        sx={{ marginRight: 0.5 }}
                        size="small"
                        label={procedure}
                        variant="outlined"
                    />
                ))}
            </Box>
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {complaint}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid container alignItems="center" width="auto">
                        <Chip
                            sx={{
                                "& .MuiChip-avatar": {
                                    color: (theme) =>
                                        theme.palette.getContrastText(
                                            masterAvatarColor
                                        ),
                                },
                                marginRight: 1,
                            }}
                            onClick={() => console.log(1)}
                            avatar={
                                <Avatar
                                    sx={{
                                        bgcolor: masterAvatarColor,
                                    }}
                                >
                                    {masterName[0]}
                                </Avatar>
                            }
                            label={masterName}
                        />
                        <Typography
                            variant="body1"
                            color="text.secondary"
                        >{`₴${price}`}</Typography>
                    </Grid>
                    <Button
                        component={Link}
                        to={`/appointment/${id}`}
                        color="secondary"
                    >
                        Подробнее
                    </Button>
                </Grid>
            </CardActions>
        </Card>
    );
};

export default memo(AppointmentCard);
