import React, { memo } from "react";
import { Checkbox } from "@mui/material";
import { useField } from "formik";
import { FormikCheckboxProps } from "./types";

const FormikCheckbox = (props: FormikCheckboxProps) => {
    const { name } = props;
    const [field] = useField(name);

    return <Checkbox {...field} {...props} />;
};

export default memo(FormikCheckbox);
