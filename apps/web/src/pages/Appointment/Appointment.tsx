import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useAppointmentLazyQuery } from "graphql/generated/graphql";
import AppLoader from "../../components/AppLoader";
import { useParams } from "react-router-dom";
import dateTimeFormatter from "../../utils/dateTimeFormatter";

const Appointment = () => {
    const { id } = useParams();

    const [fetch, { loading, error, data }] = useAppointmentLazyQuery({
        variables: {
            appointmentId: id as string,
        },
    });

    useEffect(() => {
        if (id) {
            void fetch();
        }
    }, [fetch, id]);

    if (loading && !error) {
        return <AppLoader open={true} />;
    }

    return (
        <>
            <Grid display="grid" gap={2}>
                <Box>
                    <Typography>Дата</Typography>
                    <Typography sx={{ marginTop: 1 }} color="text.secondary">
                        {dateTimeFormatter.format(
                            data?.appointment?.date
                                ? new Date(data?.appointment?.date)
                                : 0
                        )}
                    </Typography>
                </Box>
                <Box>
                    <Typography>Мастер</Typography>
                    <Typography sx={{ marginTop: 1 }} color="text.secondary">
                        {data?.appointment?.master?.name}
                    </Typography>
                </Box>
                <Box>
                    <Typography>Клиент</Typography>
                    <Typography sx={{ marginTop: 1 }} color="text.secondary">
                        {`${data?.appointment?.client?.firstName ?? ""} ${
                            data?.appointment?.client?.lastName ?? ""
                        }`}
                    </Typography>
                </Box>
                <Box>
                    <Typography>Процедуры</Typography>
                    <Typography sx={{ marginTop: 1 }} color="text.secondary">
                        {data?.appointment?.procedures
                            ?.map((procedure) => procedure.name)
                            .join(", ")}
                    </Typography>
                </Box>
                <Box>
                    <Typography>Цена</Typography>
                    <Typography sx={{ marginTop: 1 }} color="text.secondary">
                        {`₴${data?.appointment?.price ?? 0}`}
                    </Typography>
                </Box>
                <Box>
                    <Typography>Жалобы</Typography>
                    <Typography sx={{ marginTop: 1 }} color="text.secondary">
                        {data?.appointment?.complaints}
                    </Typography>
                </Box>
                <Box>
                    <Typography>Результат</Typography>
                    <Typography sx={{ marginTop: 1 }} color="text.secondary">
                        {data?.appointment?.results}
                    </Typography>
                </Box>
                <Box>
                    <Typography>Комментарии</Typography>
                    <Typography sx={{ marginTop: 1 }} color="text.secondary">
                        {data?.appointment?.comments}
                    </Typography>
                </Box>
            </Grid>
        </>
    );
};

export default Appointment;
