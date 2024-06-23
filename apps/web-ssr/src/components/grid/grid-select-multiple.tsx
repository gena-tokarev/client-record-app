import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { GridRenderEditCellParams } from "@mui/x-data-grid";
import { useCallback, useEffect, useRef, useState } from "react";

export function GridSelectMultiple(params: GridRenderEditCellParams) {
  const [open, setOpen] = useState(false);
  const { id, value, field, colDef, api, row } = params;
  const inputRef = useRef<HTMLInputElement>(null);
  const valueOptions = "valueOptions" in colDef ? colDef.valueOptions : null;

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
      {valueOptions &&
        (typeof valueOptions === "function"
          ? valueOptions({ field, id, row })
          : valueOptions
        ).map((option) => {
          let value = option;
          let label = option;

          if (typeof option === "object") {
            value = option.value;
            label = option.label;
          }

          return (
            <MenuItem key={value as string} value={value as string}>
              {label as string}
            </MenuItem>
          );
        })}
    </Select>
  );
}
