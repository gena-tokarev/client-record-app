import React, { memo, useCallback } from "react";
import { useField, useFormikContext } from "formik";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { TextField } from "@mui/material";
import { FormikDateTimePickerProps } from "./types";

const FormikDateTimePicker = (props: FormikDateTimePickerProps) => {
    const { name, fullWidth, ...restProps } = props;
    const [field] = useField<Date | null>(name);
    const { setFieldValue } = useFormikContext();

    const handleChange = useCallback(
        (value: Date | null) => {
            setFieldValue(name, value?.valueOf());
        },
        [name, setFieldValue]
    );

    return (
        <DateTimePicker
            {...field}
            value={field.value ? new Date(field.value) : ""}
            {...restProps}
            renderInput={(props) => (
                <TextField {...props} fullWidth={!!fullWidth} />
            )}
            onChange={handleChange}
        />
    );
};

export default memo(FormikDateTimePicker);
