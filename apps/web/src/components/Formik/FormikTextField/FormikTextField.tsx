import React, { memo } from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
import { FormikTextFieldProps } from "./types";

const FormikTextField = (props: FormikTextFieldProps) => {
    const { name } = props;
    const [field] = useField(name);

    return <TextField {...field} {...props} />;
};

export default memo(FormikTextField);
