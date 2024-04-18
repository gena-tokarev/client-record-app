import React, { useMemo } from "react";
import AppointmentCard from "../../components/appointment/AppointmentCard";
import AppointmentCardLoader from "../../components/appointment/AppointmentCard/AppointmentCardLoader";
import { Alert, Grid } from "@mui/material";
import AppointmentGridItem from "./components/AppointmentGridItem";
import { useAppointmentsQuery } from "graphql/generated/graphql";
import appointmentToViewData from "../../utils/appointmentToViewData";

const Appointments = () => {
    const { data, loading, error } = useAppointmentsQuery();
    const appointments = useMemo(
        () =>
            data?.appointments.map((appointment) =>
                appointmentToViewData(appointment)
            ),
        [data]
    );

    if (error) {
        return (
            <Alert sx={{ display: "inline-flex" }} severity="error">
                Произошла ошибка загрузки данных!
            </Alert>
        );
    }

    return (
        <Grid display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
            {loading
                ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                      <AppointmentGridItem key={item}>
                          <AppointmentCardLoader />
                      </AppointmentGridItem>
                  ))
                : appointments?.map((appointment) => (
                      <AppointmentGridItem key={appointment.id}>
                          <AppointmentCard
                              clientName={appointment.clientName}
                              masterName={appointment.masterName}
                              date={appointment.date}
                              complaint={appointment.complaints}
                              price={appointment.price}
                              id={appointment.id}
                              procedures={
                                  appointment?.procedures?.map(
                                      ({ name }) => name
                                  ) ?? []
                              }
                          />
                      </AppointmentGridItem>
                  )) ?? null}
        </Grid>
    );
};

export default Appointments;
//
// import { FC, useCallback, useEffect, useMemo } from "react";
// import withMutationForm from "../../HOCs/withMutationForm";
// import { useQuery } from "@apollo/client";
// import {
//     AppointmentsDocument,
//     AppointmentsQuery,
//     useCreateAppointmentMutation,
// } from "../../Graphql/generated/graphql";
// import { Button } from "@mui/material";
// import { AppointmentFormFormikValues } from "../../HOCs/appointmentForm/types";
//
// const useCreateAppointmentFormSubmit = () => {
//     const { updateQuery } = useQuery(AppointmentsDocument);
//     const [appointmentMutation, { loading, error, data }] =
//         useCreateAppointmentMutation();
//
//     useEffect(() => {
//         if (!data) return;
//         updateQuery((prevAppointments: AppointmentsQuery) => {
//             return {
//                 appointments: [
//                     ...prevAppointments.appointments,
//                     data.createAppointment,
//                 ],
//             };
//         });
//     }, [data, updateQuery]);
//
//     const handleSubmit = useCallback(
//         async (formValues: AppointmentFormFormikValues) => {
//             await appointmentMutation({
//                 variables: { inputAppointment: formValues },
//             });
//         },
//         [appointmentMutation]
//     );
//
//     return handleSubmit;
// };
//
// const useCreateAppointmentInitialProps = () => {
//     return useMemo(
//         () => ({
//             complaints: "",
//             results: "",
//             master: "",
//             client: "",
//             price: 0,
//             procedures: [],
//             withCoating: false,
//             date: Date.now(),
//             comments: "",
//         }),
//         []
//     );
// };
//
// const Appointments: FC = (props) => {
//     return <Button type="submit">222</Button>;
// };
//
// export default withMutationForm<AppointmentFormFormikValues>({
//     getOnSubmit: useCreateAppointmentFormSubmit,
//     getInitialValues: useCreateAppointmentInitialProps,
// })(Appointments);
