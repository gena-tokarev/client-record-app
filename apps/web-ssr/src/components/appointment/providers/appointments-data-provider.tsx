import {
  AppointmentsInput,
  AppointmentsOutput,
  useAppointmentsQuery,
  useAppointmentsSuspenseQuery,
} from "@/graphql/generated/graphql";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";
import { INITIAL_PAGINATION_MODEL } from "../constants";
import { ApolloError } from "@apollo/client";

const defaultVariables = {
  paginationModel: INITIAL_PAGINATION_MODEL,
};

type AppointmensDataContextType = {
  setVariables: (variables: AppointmentsInput) => void;
  loading: boolean;
  error?: ApolloError;
  data: AppointmentsOutput;
};

export const AppointmensDataContext = createContext<AppointmensDataContextType>(
  {
    setVariables: () => void 0,
    loading: false,
    data: {
      data: [],
      count: 0,
    },
  },
);

export const AppointmensDataProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [variables, setVariables] =
    useState<Partial<AppointmentsInput>>(defaultVariables);

  const variablesRef = useRef<Partial<AppointmentsInput>>(defaultVariables);

  const updateVariables = useCallback((newVariables: AppointmentsInput) => {
    variablesRef.current = {
      ...variablesRef.current,
      ...newVariables,
    };

    setVariables(variablesRef.current);
  }, []);

  const { data: initialData } = useAppointmentsSuspenseQuery({
    variables: {
      appointmentsInput: defaultVariables,
    },
  });

  const { data, loading, error, previousData } = useAppointmentsQuery({
    variables: {
      appointmentsInput: variables,
    },
  });

  return (
    <AppointmensDataContext.Provider
      value={{
        loading,
        error,
        data:
          data?.appointments ??
          previousData?.appointments ??
          initialData.appointments,
        setVariables: updateVariables,
      }}
    >
      {children}
    </AppointmensDataContext.Provider>
  );
};
