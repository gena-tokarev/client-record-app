import AppointmentFormFields from "../../components/appointment/AppointmentFormFields";
import useAppointmentCreateFormParams from "./hooks/useAppointmentCreateFormParams";
import { Form, Formik } from "formik";
import AppLoader from "../../components/AppLoader";

const AppointmentCreate = () => {
    const { loading, error, initialValues, handleSubmit } =
        useAppointmentCreateFormParams();

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

export default AppointmentCreate;
