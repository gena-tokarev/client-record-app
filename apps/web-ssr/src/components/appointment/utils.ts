interface AnyObject {
  [key: string]: any;
}

export type TransformedObject<T extends AnyObject> = {
  [K in keyof T]: T[K] extends { id: infer U }
    ? U
    : T[K] extends Array<infer U>
      ? U extends { id: infer V }
        ? V[]
        : U[]
      : T[K];
};

export const transformData = <T extends AnyObject>(
  data: T[],
): TransformedObject<T>[] => {
  return data.map((item) => transformItem(item));
};

export const transformItem = <T extends AnyObject>(
  item: T,
): TransformedObject<T> => {
  const result = {} as TransformedObject<T>;

  for (const key in item) {
    if (item.hasOwnProperty(key)) {
      if (item[key] && typeof item[key] === "object") {
        if (Array.isArray(item[key])) {
          result[key] = item[key].map((subItem: any) =>
            typeof subItem === "object" ? subItem.id : subItem,
          ) as any;
        } else {
          result[key] = item[key].id;
        }
      } else {
        result[key] = item[key];
      }
    }
  }
  return result;
};
