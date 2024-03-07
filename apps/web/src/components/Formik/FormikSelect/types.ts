import { SelectProps } from "@mui/material";

export type FormikSelectProps = {
    name: string;
    label: string;
    options: { id: string | number; name: string }[];
} & SelectProps<(string | number)[]>;
