import React, { FC } from "react";
import { Button } from "@mui/material";
import { Form, Formik } from "formik";
import useLoginPage from "./hooks/useLoginPage";
import FormikTextField from "../../components/Formik/FormikTextField";

const Login: FC = () => {
    const { formConfig } = useLoginPage();

    return (
        <Formik {...formConfig}>
            <Form>
                <FormikTextField name="email" type="email" label="email" />
                <FormikTextField
                    name="password"
                    type="password"
                    label="password"
                />
                <Button type="submit">Submit</Button>
            </Form>
        </Formik>
    );
};

export default Login;
