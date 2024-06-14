import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { GridRenderEditCellParams } from "@mui/x-data-grid";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

export function GridSelectMultiple<O extends { id: string | number }>({
  options,
  getOptionLabel,
  getOptionValue,
  ...params
}: GridRenderEditCellParams & {
  options: O[];
  getOptionValue: (option: O) => string | number;
  getOptionLabel: (option: O) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const { id, value, field } = params;
  const api = params.api;
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: SelectChangeEvent<{ value: unknown }>) => {
      const newValue = event.target.value;
      api.setEditCellValue({ id, field, value: newValue }, event);
    },
    [api, field, id],
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    params.api.stopCellEditMode({ id: params.id, field: params.field });
    setOpen(false);
  }, [params]);

  useEffect(() => {
    inputRef.current?.focus();
    handleOpen();
  }, [inputRef, handleOpen]);

  return (
    <Select
      multiple
      value={value || []}
      onChange={handleChange}
      open={open}
      onClose={handleClose}
      onOpen={handleOpen}
      inputProps={{
        ref: inputRef,
      }}
      sx={{ width: "100%" }}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={getOptionValue(option)}>
          {getOptionLabel(option)}
        </MenuItem>
      ))}
    </Select>
  );
}
