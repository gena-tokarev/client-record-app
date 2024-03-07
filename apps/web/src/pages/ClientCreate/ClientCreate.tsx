import React from "react";
import useClientCreateFormParams from "./hooks/useClientCreateFormParams";
import ClientFormFields from "../../components/client/ClientFormFields";
import { Form, Formik } from "formik";
import AppLoader from "../../components/AppLoader";

const ClientCreate = () => {
    const { loading, error, initialValues, handleSubmit } =
        useClientCreateFormParams();

    return (
        <Formik onSubmit={handleSubmit} initialValues={initialValues}>
            <>
                <AppLoader open={loading && !error} />
                <Form>
                    <ClientFormFields />
                </Form>
            </>
        </Formik>
    );
};

export default ClientCreate;
