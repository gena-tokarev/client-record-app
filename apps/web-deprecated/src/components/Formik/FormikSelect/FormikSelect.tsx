import React, { memo, useMemo } from "react";
import {
    Box,
    Checkbox,
    Chip,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
} from "@mui/material";
import { useField } from "formik";
import { FormikSelectProps } from "./types";

function FormikSelect(props: FormikSelectProps) {
    const { name, label, fullWidth, options, ...restProps } = props;
    const [field] = useField<(string | number)[]>(name);

    const id = `select-${name}`;

    const InputComponent = useMemo(
        () => <OutlinedInput label={label} />,
        [label]
    );

    return (
        <FormControl fullWidth={fullWidth}>
            <InputLabel id={id}>{label}</InputLabel>
            <Select
                labelId={id}
                input={InputComponent}
                renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => {
                            const currentOption = options?.find(
                                ({ id }) => id === value
                            );
                            return (
                                <Chip size="small" key={value} label={currentOption?.name} />
                            );
                        })}
                    </Box>
                )}
                {...field}
                {...restProps}
            >
                {options?.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        <Checkbox checked={field?.value?.includes(option.id)} />
                        <ListItemText primary={option.name} />
                    </MenuItem>
                )) ?? <div />}
            </Select>
        </FormControl>
    );
}

export default memo(FormikSelect);
