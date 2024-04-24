import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Appointment = {
  __typename?: 'Appointment';
  client: Client;
  comments?: Maybe<Scalars['String']['output']>;
  complaints: Scalars['String']['output'];
  date: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  master: Master;
  price: Scalars['Float']['output'];
  procedures?: Maybe<Array<Procedure>>;
  results: Scalars['String']['output'];
  withCoating: Scalars['Boolean']['output'];
};

export type AppointmentInput = {
  client: Scalars['ID']['input'];
  comments?: InputMaybe<Scalars['String']['input']>;
  complaints: Scalars['String']['input'];
  date: Scalars['Float']['input'];
  id?: InputMaybe<Scalars['Float']['input']>;
  master: Scalars['ID']['input'];
  price: Scalars['Float']['input'];
  procedures: Array<Scalars['ID']['input']>;
  results: Scalars['String']['input'];
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type Client = {
  __typename?: 'Client';
  channel: Channel;
  firstName: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  instagramName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  middleName: Scalars['String']['output'];
  phones: Array<Phone>;
};

export type ClientInput = {
  channel: Scalars['ID']['input'];
  firstName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Float']['input']>;
  instagramName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  middleName: Scalars['String']['input'];
  phones: Array<Scalars['String']['input']>;
};

export type Master = {
  __typename?: 'Master';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  procedures?: Maybe<Array<Procedure>>;
};

export type MasterInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
  procedureIds: Array<Scalars['Float']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAppointment: Appointment;
  createClient: Client;
  createMaster: Master;
  createProcedure: Procedure;
  deleteAppointment: Scalars['Boolean']['output'];
  deleteClient: Scalars['Boolean']['output'];
  deleteMaster: Scalars['Boolean']['output'];
  deleteProcedure: Scalars['Boolean']['output'];
  updateAppointment: Appointment;
  updateClient: Client;
  updateMaster: Master;
  updateProcedure: Procedure;
};


export type MutationCreateAppointmentArgs = {
  inputAppointment: AppointmentInput;
};


export type MutationCreateClientArgs = {
  inputClient: ClientInput;
};


export type MutationCreateMasterArgs = {
  inputMaster: MasterInput;
};


export type MutationCreateProcedureArgs = {
  inputProcedure: ProcedureInput;
};


export type MutationDeleteAppointmentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteClientArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMasterArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProcedureArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAppointmentArgs = {
  inputAppointment: AppointmentInput;
};


export type MutationUpdateClientArgs = {
  inputClient: ClientInput;
};


export type MutationUpdateMasterArgs = {
  inputMaster: MasterInput;
};


export type MutationUpdateProcedureArgs = {
  inputProcedure: ProcedureInput;
};

export type Phone = {
  __typename?: 'Phone';
  client?: Maybe<Scalars['ID']['output']>;
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type Procedure = {
  __typename?: 'Procedure';
  id: Scalars['ID']['output'];
  masters?: Maybe<Array<Master>>;
  name: Scalars['String']['output'];
};

export type ProcedureInput = {
  id?: InputMaybe<Scalars['Float']['input']>;
  masterIds: Array<Scalars['Float']['input']>;
  name: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  appointment: Appointment;
  appointments: Array<Appointment>;
  channel: Channel;
  channels: Array<Channel>;
  client: Client;
  clients: Array<Client>;
  master: Master;
  masters: Array<Master>;
  procedure: Procedure;
  procedureByMaster: Array<Procedure>;
  procedures: Array<Procedure>;
};


export type QueryAppointmentArgs = {
  id: Scalars['ID']['input'];
};


export type QueryChannelArgs = {
  id: Scalars['ID']['input'];
};


export type QueryClientArgs = {
  id: Scalars['ID']['input'];
};


export type QueryMasterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProcedureArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProcedureByMasterArgs = {
  masterId: Scalars['ID']['input'];
};

export type CoreAppointmentFieldsFragment = { __typename?: 'Appointment', id: string, complaints: string, date: number, results: string, price: number, comments?: string | null };

export type CoreChannelFieldsFragment = { __typename?: 'Channel', id: string, name: string };

export type CoreClientFieldsFragment = { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, phones: Array<{ __typename?: 'Phone', id: string, value: string }>, channel: { __typename?: 'Channel', id: string, name: string } };

export type CoreMasterFieldsFragment = { __typename?: 'Master', id: string, name: string };

export type CorePhoneFieldsFragment = { __typename?: 'Phone', id: string, value: string };

export type CoreProcedureFieldsFragment = { __typename?: 'Procedure', id: string, name: string };

export type CreateAppointmentMutationVariables = Exact<{
  inputAppointment: AppointmentInput;
}>;


export type CreateAppointmentMutation = { __typename?: 'Mutation', createAppointment: { __typename?: 'Appointment', id: string, complaints: string, date: number, results: string, price: number, comments?: string | null, client: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, channel: { __typename?: 'Channel', id: string, name: string }, phones: Array<{ __typename?: 'Phone', id: string, value: string }> }, master: { __typename?: 'Master', id: string, name: string }, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null } };

export type CreateClientMutationVariables = Exact<{
  inputClient: ClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, channel: { __typename?: 'Channel', id: string, name: string }, phones: Array<{ __typename?: 'Phone', id: string, value: string }> } };

export type UpdateAppointmentMutationVariables = Exact<{
  inputAppointment: AppointmentInput;
}>;


export type UpdateAppointmentMutation = { __typename?: 'Mutation', updateAppointment: { __typename?: 'Appointment', id: string, complaints: string, date: number, results: string, price: number, comments?: string | null, client: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, channel: { __typename?: 'Channel', id: string, name: string }, phones: Array<{ __typename?: 'Phone', id: string, value: string }> }, master: { __typename?: 'Master', id: string, name: string }, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null } };

export type AppointmentQueryVariables = Exact<{
  appointmentId: Scalars['ID']['input'];
}>;


export type AppointmentQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id: string, complaints: string, date: number, results: string, price: number, comments?: string | null, client: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, phones: Array<{ __typename?: 'Phone', id: string, value: string }>, channel: { __typename?: 'Channel', id: string, name: string } }, master: { __typename?: 'Master', id: string, name: string }, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null } };

export type AppointmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppointmentsQuery = { __typename?: 'Query', appointments: Array<{ __typename?: 'Appointment', id: string, complaints: string, date: number, results: string, price: number, comments?: string | null, client: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, phones: Array<{ __typename?: 'Phone', id: string, value: string }>, channel: { __typename?: 'Channel', id: string, name: string } }, master: { __typename?: 'Master', id: string, name: string }, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null }> };

export type ChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChannelsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: string, name: string }> };

export type ClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, phones: Array<{ __typename?: 'Phone', id: string, value: string }>, channel: { __typename?: 'Channel', id: string, name: string } }> };

export type MastersQueryVariables = Exact<{ [key: string]: never; }>;


export type MastersQuery = { __typename?: 'Query', masters: Array<{ __typename?: 'Master', id: string, name: string, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null }> };

export type ProcedureByMasterQueryVariables = Exact<{
  masterId: Scalars['ID']['input'];
}>;


export type ProcedureByMasterQuery = { __typename?: 'Query', procedureByMaster: Array<{ __typename?: 'Procedure', id: string, name: string }> };

export type ProceduresQueryVariables = Exact<{ [key: string]: never; }>;


export type ProceduresQuery = { __typename?: 'Query', procedures: Array<{ __typename?: 'Procedure', id: string, name: string, masters?: Array<{ __typename?: 'Master', id: string, name: string }> | null }> };

export const CoreAppointmentFieldsFragmentDoc = gql`
    fragment CoreAppointmentFields on Appointment {
  id
  complaints
  date
  results
  price
  comments
}
    `;
export const CorePhoneFieldsFragmentDoc = gql`
    fragment CorePhoneFields on Phone {
  id
  value
}
    `;
export const CoreChannelFieldsFragmentDoc = gql`
    fragment CoreChannelFields on Channel {
  id
  name
}
    `;
export const CoreClientFieldsFragmentDoc = gql`
    fragment CoreClientFields on Client {
  id
  firstName
  lastName
  middleName
  instagramName
  phones {
    ...CorePhoneFields
  }
  channel {
    ...CoreChannelFields
  }
}
    ${CorePhoneFieldsFragmentDoc}
${CoreChannelFieldsFragmentDoc}`;
export const CoreMasterFieldsFragmentDoc = gql`
    fragment CoreMasterFields on Master {
  id
  name
}
    `;
export const CoreProcedureFieldsFragmentDoc = gql`
    fragment CoreProcedureFields on Procedure {
  id
  name
}
    `;
export const CreateAppointmentDocument = gql`
    mutation CreateAppointment($inputAppointment: AppointmentInput!) {
  createAppointment(inputAppointment: $inputAppointment) {
    ...CoreAppointmentFields
    client {
      ...CoreClientFields
      channel {
        ...CoreChannelFields
      }
    }
    master {
      ...CoreMasterFields
    }
    procedures {
      ...CoreProcedureFields
    }
  }
}
    ${CoreAppointmentFieldsFragmentDoc}
${CoreClientFieldsFragmentDoc}
${CoreChannelFieldsFragmentDoc}
${CoreMasterFieldsFragmentDoc}
${CoreProcedureFieldsFragmentDoc}`;
export type CreateAppointmentMutationFn = Apollo.MutationFunction<CreateAppointmentMutation, CreateAppointmentMutationVariables>;

/**
 * __useCreateAppointmentMutation__
 *
 * To run a mutation, you first call `useCreateAppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAppointmentMutation, { data, loading, error }] = useCreateAppointmentMutation({
 *   variables: {
 *      inputAppointment: // value for 'inputAppointment'
 *   },
 * });
 */
export function useCreateAppointmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateAppointmentMutation, CreateAppointmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAppointmentMutation, CreateAppointmentMutationVariables>(CreateAppointmentDocument, options);
      }
export type CreateAppointmentMutationHookResult = ReturnType<typeof useCreateAppointmentMutation>;
export type CreateAppointmentMutationResult = Apollo.MutationResult<CreateAppointmentMutation>;
export type CreateAppointmentMutationOptions = Apollo.BaseMutationOptions<CreateAppointmentMutation, CreateAppointmentMutationVariables>;
export const CreateClientDocument = gql`
    mutation CreateClient($inputClient: ClientInput!) {
  createClient(inputClient: $inputClient) {
    ...CoreClientFields
    channel {
      ...CoreChannelFields
    }
  }
}
    ${CoreClientFieldsFragmentDoc}
${CoreChannelFieldsFragmentDoc}`;
export type CreateClientMutationFn = Apollo.MutationFunction<CreateClientMutation, CreateClientMutationVariables>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      inputClient: // value for 'inputClient'
 *   },
 * });
 */
export function useCreateClientMutation(baseOptions?: Apollo.MutationHookOptions<CreateClientMutation, CreateClientMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateClientMutation, CreateClientMutationVariables>(CreateClientDocument, options);
      }
export type CreateClientMutationHookResult = ReturnType<typeof useCreateClientMutation>;
export type CreateClientMutationResult = Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<CreateClientMutation, CreateClientMutationVariables>;
export const UpdateAppointmentDocument = gql`
    mutation UpdateAppointment($inputAppointment: AppointmentInput!) {
  updateAppointment(inputAppointment: $inputAppointment) {
    ...CoreAppointmentFields
    client {
      ...CoreClientFields
      channel {
        ...CoreChannelFields
      }
    }
    master {
      ...CoreMasterFields
    }
    procedures {
      ...CoreProcedureFields
    }
  }
}
    ${CoreAppointmentFieldsFragmentDoc}
${CoreClientFieldsFragmentDoc}
${CoreChannelFieldsFragmentDoc}
${CoreMasterFieldsFragmentDoc}
${CoreProcedureFieldsFragmentDoc}`;
export type UpdateAppointmentMutationFn = Apollo.MutationFunction<UpdateAppointmentMutation, UpdateAppointmentMutationVariables>;

/**
 * __useUpdateAppointmentMutation__
 *
 * To run a mutation, you first call `useUpdateAppointmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAppointmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAppointmentMutation, { data, loading, error }] = useUpdateAppointmentMutation({
 *   variables: {
 *      inputAppointment: // value for 'inputAppointment'
 *   },
 * });
 */
export function useUpdateAppointmentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAppointmentMutation, UpdateAppointmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAppointmentMutation, UpdateAppointmentMutationVariables>(UpdateAppointmentDocument, options);
      }
export type UpdateAppointmentMutationHookResult = ReturnType<typeof useUpdateAppointmentMutation>;
export type UpdateAppointmentMutationResult = Apollo.MutationResult<UpdateAppointmentMutation>;
export type UpdateAppointmentMutationOptions = Apollo.BaseMutationOptions<UpdateAppointmentMutation, UpdateAppointmentMutationVariables>;
export const AppointmentDocument = gql`
    query Appointment($appointmentId: ID!) {
  appointment(id: $appointmentId) {
    ...CoreAppointmentFields
    client {
      ...CoreClientFields
    }
    master {
      ...CoreMasterFields
    }
    procedures {
      ...CoreProcedureFields
    }
  }
}
    ${CoreAppointmentFieldsFragmentDoc}
${CoreClientFieldsFragmentDoc}
${CoreMasterFieldsFragmentDoc}
${CoreProcedureFieldsFragmentDoc}`;

/**
 * __useAppointmentQuery__
 *
 * To run a query within a React component, call `useAppointmentQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppointmentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppointmentQuery({
 *   variables: {
 *      appointmentId: // value for 'appointmentId'
 *   },
 * });
 */
export function useAppointmentQuery(baseOptions: Apollo.QueryHookOptions<AppointmentQuery, AppointmentQueryVariables> & ({ variables: AppointmentQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppointmentQuery, AppointmentQueryVariables>(AppointmentDocument, options);
      }
export function useAppointmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppointmentQuery, AppointmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppointmentQuery, AppointmentQueryVariables>(AppointmentDocument, options);
        }
export function useAppointmentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AppointmentQuery, AppointmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AppointmentQuery, AppointmentQueryVariables>(AppointmentDocument, options);
        }
export type AppointmentQueryHookResult = ReturnType<typeof useAppointmentQuery>;
export type AppointmentLazyQueryHookResult = ReturnType<typeof useAppointmentLazyQuery>;
export type AppointmentSuspenseQueryHookResult = ReturnType<typeof useAppointmentSuspenseQuery>;
export type AppointmentQueryResult = Apollo.QueryResult<AppointmentQuery, AppointmentQueryVariables>;
export const AppointmentsDocument = gql`
    query Appointments {
  appointments {
    ...CoreAppointmentFields
    client {
      ...CoreClientFields
    }
    master {
      ...CoreMasterFields
    }
    procedures {
      ...CoreProcedureFields
    }
  }
}
    ${CoreAppointmentFieldsFragmentDoc}
${CoreClientFieldsFragmentDoc}
${CoreMasterFieldsFragmentDoc}
${CoreProcedureFieldsFragmentDoc}`;

/**
 * __useAppointmentsQuery__
 *
 * To run a query within a React component, call `useAppointmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppointmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppointmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppointmentsQuery(baseOptions?: Apollo.QueryHookOptions<AppointmentsQuery, AppointmentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppointmentsQuery, AppointmentsQueryVariables>(AppointmentsDocument, options);
      }
export function useAppointmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppointmentsQuery, AppointmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppointmentsQuery, AppointmentsQueryVariables>(AppointmentsDocument, options);
        }
export function useAppointmentsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AppointmentsQuery, AppointmentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AppointmentsQuery, AppointmentsQueryVariables>(AppointmentsDocument, options);
        }
export type AppointmentsQueryHookResult = ReturnType<typeof useAppointmentsQuery>;
export type AppointmentsLazyQueryHookResult = ReturnType<typeof useAppointmentsLazyQuery>;
export type AppointmentsSuspenseQueryHookResult = ReturnType<typeof useAppointmentsSuspenseQuery>;
export type AppointmentsQueryResult = Apollo.QueryResult<AppointmentsQuery, AppointmentsQueryVariables>;
export const ChannelsDocument = gql`
    query Channels {
  channels {
    ...CoreChannelFields
  }
}
    ${CoreChannelFieldsFragmentDoc}`;

/**
 * __useChannelsQuery__
 *
 * To run a query within a React component, call `useChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useChannelsQuery(baseOptions?: Apollo.QueryHookOptions<ChannelsQuery, ChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, options);
      }
export function useChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelsQuery, ChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, options);
        }
export function useChannelsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ChannelsQuery, ChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument, options);
        }
export type ChannelsQueryHookResult = ReturnType<typeof useChannelsQuery>;
export type ChannelsLazyQueryHookResult = ReturnType<typeof useChannelsLazyQuery>;
export type ChannelsSuspenseQueryHookResult = ReturnType<typeof useChannelsSuspenseQuery>;
export type ChannelsQueryResult = Apollo.QueryResult<ChannelsQuery, ChannelsQueryVariables>;
export const ClientsDocument = gql`
    query Clients {
  clients {
    ...CoreClientFields
  }
}
    ${CoreClientFieldsFragmentDoc}`;

/**
 * __useClientsQuery__
 *
 * To run a query within a React component, call `useClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClientsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClientsQuery(baseOptions?: Apollo.QueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
      }
export function useClientsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
        }
export function useClientsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ClientsQuery, ClientsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ClientsQuery, ClientsQueryVariables>(ClientsDocument, options);
        }
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
export type ClientsSuspenseQueryHookResult = ReturnType<typeof useClientsSuspenseQuery>;
export type ClientsQueryResult = Apollo.QueryResult<ClientsQuery, ClientsQueryVariables>;
export const MastersDocument = gql`
    query Masters {
  masters {
    ...CoreMasterFields
    procedures {
      ...CoreProcedureFields
    }
  }
}
    ${CoreMasterFieldsFragmentDoc}
${CoreProcedureFieldsFragmentDoc}`;

/**
 * __useMastersQuery__
 *
 * To run a query within a React component, call `useMastersQuery` and pass it any options that fit your needs.
 * When your component renders, `useMastersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMastersQuery({
 *   variables: {
 *   },
 * });
 */
export function useMastersQuery(baseOptions?: Apollo.QueryHookOptions<MastersQuery, MastersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MastersQuery, MastersQueryVariables>(MastersDocument, options);
      }
export function useMastersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MastersQuery, MastersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MastersQuery, MastersQueryVariables>(MastersDocument, options);
        }
export function useMastersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MastersQuery, MastersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MastersQuery, MastersQueryVariables>(MastersDocument, options);
        }
export type MastersQueryHookResult = ReturnType<typeof useMastersQuery>;
export type MastersLazyQueryHookResult = ReturnType<typeof useMastersLazyQuery>;
export type MastersSuspenseQueryHookResult = ReturnType<typeof useMastersSuspenseQuery>;
export type MastersQueryResult = Apollo.QueryResult<MastersQuery, MastersQueryVariables>;
export const ProcedureByMasterDocument = gql`
    query ProcedureByMaster($masterId: ID!) {
  procedureByMaster(masterId: $masterId) {
    ...CoreProcedureFields
  }
}
    ${CoreProcedureFieldsFragmentDoc}`;

/**
 * __useProcedureByMasterQuery__
 *
 * To run a query within a React component, call `useProcedureByMasterQuery` and pass it any options that fit your needs.
 * When your component renders, `useProcedureByMasterQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProcedureByMasterQuery({
 *   variables: {
 *      masterId: // value for 'masterId'
 *   },
 * });
 */
export function useProcedureByMasterQuery(baseOptions: Apollo.QueryHookOptions<ProcedureByMasterQuery, ProcedureByMasterQueryVariables> & ({ variables: ProcedureByMasterQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProcedureByMasterQuery, ProcedureByMasterQueryVariables>(ProcedureByMasterDocument, options);
      }
export function useProcedureByMasterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProcedureByMasterQuery, ProcedureByMasterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProcedureByMasterQuery, ProcedureByMasterQueryVariables>(ProcedureByMasterDocument, options);
        }
export function useProcedureByMasterSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProcedureByMasterQuery, ProcedureByMasterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProcedureByMasterQuery, ProcedureByMasterQueryVariables>(ProcedureByMasterDocument, options);
        }
export type ProcedureByMasterQueryHookResult = ReturnType<typeof useProcedureByMasterQuery>;
export type ProcedureByMasterLazyQueryHookResult = ReturnType<typeof useProcedureByMasterLazyQuery>;
export type ProcedureByMasterSuspenseQueryHookResult = ReturnType<typeof useProcedureByMasterSuspenseQuery>;
export type ProcedureByMasterQueryResult = Apollo.QueryResult<ProcedureByMasterQuery, ProcedureByMasterQueryVariables>;
export const ProceduresDocument = gql`
    query Procedures {
  procedures {
    ...CoreProcedureFields
    masters {
      ...CoreMasterFields
    }
  }
}
    ${CoreProcedureFieldsFragmentDoc}
${CoreMasterFieldsFragmentDoc}`;

/**
 * __useProceduresQuery__
 *
 * To run a query within a React component, call `useProceduresQuery` and pass it any options that fit your needs.
 * When your component renders, `useProceduresQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProceduresQuery({
 *   variables: {
 *   },
 * });
 */
export function useProceduresQuery(baseOptions?: Apollo.QueryHookOptions<ProceduresQuery, ProceduresQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProceduresQuery, ProceduresQueryVariables>(ProceduresDocument, options);
      }
export function useProceduresLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProceduresQuery, ProceduresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProceduresQuery, ProceduresQueryVariables>(ProceduresDocument, options);
        }
export function useProceduresSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProceduresQuery, ProceduresQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProceduresQuery, ProceduresQueryVariables>(ProceduresDocument, options);
        }
export type ProceduresQueryHookResult = ReturnType<typeof useProceduresQuery>;
export type ProceduresLazyQueryHookResult = ReturnType<typeof useProceduresLazyQuery>;
export type ProceduresSuspenseQueryHookResult = ReturnType<typeof useProceduresSuspenseQuery>;
export type ProceduresQueryResult = Apollo.QueryResult<ProceduresQuery, ProceduresQueryVariables>;