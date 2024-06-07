import { TextField, TextFieldProps } from "@mui/material";
import { FC, useCallback } from "react";

type TextFieldValueAsNumberProps = TextFieldProps & {
  onChange: (value: number) => void;
};

export const TextFieldValueAsNumber: FC<TextFieldValueAsNumberProps> = (
  props,
) => {
  const handleChange = useCallback(
    (...args: Parameters<Required<TextFieldProps>["onChange"]>) => {
      const event = args[0];
      props.onChange?.((event.target as HTMLInputElement).valueAsNumber);
    },
    [props],
  );

  return <TextField {...props} onChange={handleChange} />;
};
