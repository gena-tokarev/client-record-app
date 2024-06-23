import { GridColDef } from "@mui/x-data-grid";

export const getSelectOptions = <
  T extends { id: string | number },
  R extends Record<string, unknown> & { id: string | number },
  C extends GridColDef<R>,
>(
  data: T[],
  getLabel: (item: T) => string | number,
  isMultiple = false,
) => {
  const getId = (value: T | T["id"]) =>
    typeof value === "object" && value.id ? value.id : value;

  const findItem = (value: T | T["id"]) =>
    typeof value === "object"
      ? value
      : data.find(({ id }) => id === value) ?? data[0];

  const valueGetter = (value: T | T["id"] | T[] | T["id"][]) => {
    if (isMultiple) {
      if (Array.isArray(value)) {
        return value.map(getId);
      }
      return [];
    } else {
      return getId(value as T | T["id"]);
    }
  };

  // Only for a multiple select
  const valueFormatter = (value: T | T["id"] | T[] | T["id"][]) => {
    const newItems = Array.isArray(value) ? value.map(findItem) : [];
    return newItems.map((item) => getLabel?.(item));
  };

  const valueSetter = (
    value: T | T["id"] | T[] | T["id"][],
    row: R,
    column: C,
  ) => {
    if (isMultiple) {
      const newItems = Array.isArray(value) ? value.map(findItem) : [];
      return { ...row, [column.field]: newItems };
    } else {
      const newItem = findItem(value as T | T["id"]);
      return { ...row, [column.field]: newItem };
    }
  };

  const valueOptions = data.map((item) => {
    return {
      value: item.id,
      label: getLabel?.(item),
    };
  });

  if (isMultiple) {
    return {
      valueFormatter,
      valueGetter,
      valueSetter,
      valueOptions,
    };
  }

  return {
    valueGetter,
    valueSetter,
    valueOptions,
  };
};
