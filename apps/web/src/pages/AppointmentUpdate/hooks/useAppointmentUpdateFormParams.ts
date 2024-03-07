import {
    AppointmentInput,
    useAppointmentLazyQuery,
    useUpdateAppointmentMutation,
} from "graphql/generated/graphql";
import { useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

const useAppointmentUpdateFormParams = () => {
    const [
        appointmentMutation,
        { loading: mutationLoading, error: mutationError },
    ] = useUpdateAppointmentMutation();

    const { id } = useParams();

    const [
        fetch,
        { loading: queryLoading, error: queryError, data: queryData },
    ] = useAppointmentLazyQuery({
        variables: {
            appointmentId: id as string,
        },
    });

    useEffect(() => {
        if (id) {
            void fetch();
        }
    }, [fetch, id]);

    const handleSubmit = useCallback(async (values: AppointmentInput) => {
        await appointmentMutation({
            variables: {
                inputAppointment: values,
            },
        });
    }, []);

    const initialValues: AppointmentInput = useMemo(
        () => ({
            id: id ? parseInt(id) : -1,
            complaints: queryData?.appointment?.complaints ?? "",
            results: queryData?.appointment?.results ?? "",
            master: queryData?.appointment?.master?.id ?? "",
            client: queryData?.appointment?.client?.id ?? "",
            price: queryData?.appointment?.price ?? 0,
            procedures:
                queryData?.appointment?.procedures?.map(({ id }) => id) ?? [],
            withCoating: queryData?.appointment?.withCoating ?? false,
            date: queryData?.appointment?.date ?? 1,
            comments: queryData?.appointment?.comments ?? "",
        }),
        [queryData, id]
    );

    return {
        handleSubmit,
        initialValues,
        loading: mutationLoading || queryLoading,
        error: mutationError || queryError,
    };
};

export default useAppointmentUpdateFormParams;
