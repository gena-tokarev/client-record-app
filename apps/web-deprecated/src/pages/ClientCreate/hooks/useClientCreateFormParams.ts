import { useCallback, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import {
    AppointmentsDocument,
    AppointmentsQuery,
    ClientInput,
    useCreateClientMutation,
} from "graphql/generated/graphql";

const useClientCreateFormParams = () => {
    const { updateQuery } = useQuery(AppointmentsDocument);
    const [
        appointmentMutation,
        { loading: mutationLoading, error: mutationError, data: mutationData },
    ] = useCreateClientMutation();

    useEffect(() => {
        if (!mutationData) return;
        updateQuery((prevAppointments: AppointmentsQuery) => {
            return {
                appointments: [
                    ...prevAppointments.appointments,
                    mutationData.createClient,
                ],
            };
        });
    }, [mutationData, updateQuery]);

    const handleSubmit = useCallback(async (values: ClientInput) => {
        await appointmentMutation({
            variables: {
                inputClient: values,
            },
        });
    }, []);

    const initialValues: ClientInput = useMemo(
        () => ({
            channel: "",
            firstName: "",
            instagramName: "",
            lastName: "",
            middleName: "",
            phones: [""],
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

export default useClientCreateFormParams;
