import { useQuery } from "@apollo/client";
import {
    AppointmentInput,
    AppointmentsDocument,
    AppointmentsQuery,
    useCreateAppointmentMutation,
} from "graphql/generated/graphql";
import { useCallback, useEffect, useMemo } from "react";

const useAppointmentCreateFormParams = () => {
    const { updateQuery } = useQuery(AppointmentsDocument);
    const [
        appointmentMutation,
        { loading: mutationLoading, error: mutationError, data: mutationData },
    ] = useCreateAppointmentMutation();

    useEffect(() => {
        if (!mutationData) return;
        updateQuery((prevAppointments: AppointmentsQuery) => {
            return {
                appointments: [
                    ...prevAppointments.appointments,
                    mutationData.createAppointment,
                ],
            };
        });
    }, [mutationData, updateQuery]);

    const handleSubmit = useCallback(async (values: AppointmentInput) => {
        await appointmentMutation({
            variables: {
                inputAppointment: values,
            },
        });
    }, []);

    const initialValues: AppointmentInput = useMemo(
        () => ({
            complaints: "",
            results: "",
            master: "",
            client: "",
            price: 0,
            procedures: [],
            withCoating: false,
            date: Date.now(),
            comments: "",
        }),
        []
    );

    return {
        handleSubmit,
        initialValues,
        loading: mutationLoading,
        error: mutationError,
    };
};

export default useAppointmentCreateFormParams;
