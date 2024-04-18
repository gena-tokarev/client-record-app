import AppointmentFormFields from "../../components/appointment/AppointmentFormFields";
import useAppointmentUpdateFormParams from "./hooks/useAppointmentUpdateFormParams";
import { Form, Formik } from "formik";
import AppLoader from "../../components/AppLoader";

const AppointmentUpdate = () => {
    const { loading, error, initialValues, handleSubmit } =
        useAppointmentUpdateFormParams();

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={handleSubmit}
        >
            <Form>
                <AppLoader open={loading && !error} />
                <AppointmentFormFields />
            </Form>
        </Formik>
    );
};

export default AppointmentUpdate;
