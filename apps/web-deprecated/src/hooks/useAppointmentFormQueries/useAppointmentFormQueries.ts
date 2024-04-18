import {
    AppointmentInput,
    useClientsQuery,
    useMastersQuery,
    useProcedureByMasterQuery,
} from "graphql/generated/graphql";
import { useFormikContext } from "formik";

function useAppointmentFormQueries() {
    const { values } = useFormikContext<AppointmentInput>();

    const {
        data: clientsData,
        error: clientsError,
        loading: clientsLoading,
    } = useClientsQuery();

    const {
        data: mastersData,
        error: mastersError,
        loading: mastersLoading,
    } = useMastersQuery();

    const {
        data: proceduresData,
        error: proceduresError,
        loading: proceduresLoading,
    } = useProcedureByMasterQuery({
        variables: {
            masterId: values.master,
        },
        skip: !values.master,
    });

    return {
        clientsData,
        clientsError,
        clientsLoading,
        mastersData,
        mastersError,
        mastersLoading,
        proceduresData,
        proceduresError,
        proceduresLoading,
    };
}

export default useAppointmentFormQueries;
