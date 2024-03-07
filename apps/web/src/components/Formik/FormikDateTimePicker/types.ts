import { DateTimePickerProps } from "@mui/lab";

export type FormikDateTimePickerProps = {
    name: string;
    fullWidth?: boolean;
} & Omit<DateTimePickerProps<Date>, "onChange" | "renderInput" | "value">;
