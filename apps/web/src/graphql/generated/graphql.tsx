import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Appointment = {
  __typename?: 'Appointment';
  client: Client;
  comments?: Maybe<Scalars['String']>;
  complaints: Scalars['String'];
  date: Scalars['Float'];
  id: Scalars['ID'];
  master: Master;
  price: Scalars['Float'];
  procedures?: Maybe<Array<Procedure>>;
  results: Scalars['String'];
  withCoating: Scalars['Boolean'];
};

export type AppointmentInput = {
  client: Scalars['ID'];
  comments?: InputMaybe<Scalars['String']>;
  complaints: Scalars['String'];
  date: Scalars['Float'];
  id?: InputMaybe<Scalars['Float']>;
  master: Scalars['ID'];
  price: Scalars['Float'];
  procedures: Array<Scalars['ID']>;
  results: Scalars['String'];
  withCoating: Scalars['Boolean'];
};

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Client = {
  __typename?: 'Client';
  channel: Channel;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  instagramName: Scalars['String'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  phones: Array<Phone>;
};

export type ClientInput = {
  channel: Scalars['ID'];
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['Float']>;
  instagramName: Scalars['String'];
  lastName: Scalars['String'];
  middleName: Scalars['String'];
  phones: Array<Scalars['String']>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Master = {
  __typename?: 'Master';
  id: Scalars['ID'];
  name: Scalars['String'];
  procedures?: Maybe<Array<Procedure>>;
};

export type MasterInput = {
  id?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  procedureIds: Array<Scalars['Float']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createAppointment: Appointment;
  createClient: Client;
  createMaster: Master;
  createProcedure: Procedure;
  deleteAppointment: Scalars['Boolean'];
  deleteClient: Scalars['Boolean'];
  deleteMaster: Scalars['Boolean'];
  deleteProcedure: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  updateAppointment: Appointment;
  updateClient: Master;
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
  id: Scalars['ID'];
};


export type MutationDeleteClientArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMasterArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteProcedureArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['ID'];
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
  client?: Maybe<Scalars['ID']>;
  id: Scalars['ID'];
  value: Scalars['String'];
};

export type Procedure = {
  __typename?: 'Procedure';
  id: Scalars['ID'];
  masters?: Maybe<Array<Master>>;
  name: Scalars['String'];
};

export type ProcedureInput = {
  id?: InputMaybe<Scalars['Float']>;
  masterIds: Array<Scalars['Float']>;
  name: Scalars['String'];
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
  me?: Maybe<User>;
  procedure: Procedure;
  procedureByMaster: Array<Procedure>;
  procedures: Array<Procedure>;
};


export type QueryAppointmentArgs = {
  id: Scalars['ID'];
};


export type QueryChannelArgs = {
  id: Scalars['ID'];
};


export type QueryClientArgs = {
  id: Scalars['ID'];
};


export type QueryMasterArgs = {
  id: Scalars['ID'];
};


export type QueryProcedureArgs = {
  id: Scalars['ID'];
};


export type QueryProcedureByMasterArgs = {
  masterId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['ID'];
};

export type CoreAppointmentFieldsFragment = { __typename?: 'Appointment', id: string, complaints: string, date: number, results: string, withCoating: boolean, price: number, comments?: string | null | undefined };

export type CoreChannelFieldsFragment = { __typename?: 'Channel', id: string, name: string };

export type CoreClientFieldsFragment = { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, phones: Array<{ __typename?: 'Phone', id: string, value: string }>, channel: { __typename?: 'Channel', id: string, name: string } };

export type CoreMasterFieldsFragment = { __typename?: 'Master', id: string, name: string };

export type CorePhoneFieldsFragment = { __typename?: 'Phone', id: string, value: string };

export type CoreProcedureFieldsFragment = { __typename?: 'Procedure', id: string, name: string };

export type CreateAppointmentMutationVariables = Exact<{
  inputAppointment: AppointmentInput;
}>;


export type CreateAppointmentMutation = { __typename?: 'Mutation', createAppointment: { __typename?: 'Appointment', id: string, complaints: string, date: number, results: string, withCoating: boolean, price: number, comments?: string | null | undefined, client: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, channel: { __typename?: 'Channel', id: string, name: string }, phones: Array<{ __typename?: 'Phone', id: string, value: string }> }, master: { __typename?: 'Master', id: string, name: string }, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null | undefined } };

export type CreateClientMutationVariables = Exact<{
  inputClient: ClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, channel: { __typename?: 'Channel', id: string, name: string }, phones: Array<{ __typename?: 'Phone', id: string, value: string }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', id: string, email: string } } };

export type UpdateAppointmentMutationVariables = Exact<{
  inputAppointment: AppointmentInput;
}>;


export type UpdateAppointmentMutation = { __typename?: 'Mutation', updateAppointment: { __typename?: 'Appointment', id: string, complaints: string, date: number, results: string, withCoating: boolean, price: number, comments?: string | null | undefined, client: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, channel: { __typename?: 'Channel', id: string, name: string }, phones: Array<{ __typename?: 'Phone', id: string, value: string }> }, master: { __typename?: 'Master', id: string, name: string }, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null | undefined } };

export type AppointmentQueryVariables = Exact<{
  appointmentId: Scalars['ID'];
}>;


export type AppointmentQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id: string, complaints: string, date: number, results: string, withCoating: boolean, price: number, comments?: string | null | undefined, client: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, phones: Array<{ __typename?: 'Phone', id: string, value: string }>, channel: { __typename?: 'Channel', id: string, name: string } }, master: { __typename?: 'Master', id: string, name: string }, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null | undefined } };

export type AppointmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppointmentsQuery = { __typename?: 'Query', appointments: Array<{ __typename?: 'Appointment', id: string, complaints: string, date: number, results: string, withCoating: boolean, price: number, comments?: string | null | undefined, client: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, phones: Array<{ __typename?: 'Phone', id: string, value: string }>, channel: { __typename?: 'Channel', id: string, name: string } }, master: { __typename?: 'Master', id: string, name: string }, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null | undefined }> };

export type ChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChannelsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: string, name: string }> };

export type ClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, phones: Array<{ __typename?: 'Phone', id: string, value: string }>, channel: { __typename?: 'Channel', id: string, name: string } }> };

export type MastersQueryVariables = Exact<{ [key: string]: never; }>;


export type MastersQuery = { __typename?: 'Query', masters: Array<{ __typename?: 'Master', id: string, name: string, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null | undefined }> };

export type ProcedureByMasterQueryVariables = Exact<{
  masterId: Scalars['ID'];
}>;


export type ProcedureByMasterQuery = { __typename?: 'Query', procedureByMaster: Array<{ __typename?: 'Procedure', id: string, name: string }> };

export type ProceduresQueryVariables = Exact<{ [key: string]: never; }>;


export type ProceduresQuery = { __typename?: 'Query', procedures: Array<{ __typename?: 'Procedure', id: string, name: string, masters?: Array<{ __typename?: 'Master', id: string, name: string }> | null | undefined }> };

export const CoreAppointmentFieldsFragmentDoc = gql`
    fragment CoreAppointmentFields on Appointment {
  id
  complaints
  date
  results
  withCoating
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
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
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
export function useAppointmentQuery(baseOptions: Apollo.QueryHookOptions<AppointmentQuery, AppointmentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppointmentQuery, AppointmentQueryVariables>(AppointmentDocument, options);
      }
export function useAppointmentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppointmentQuery, AppointmentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppointmentQuery, AppointmentQueryVariables>(AppointmentDocument, options);
        }
export type AppointmentQueryHookResult = ReturnType<typeof useAppointmentQuery>;
export type AppointmentLazyQueryHookResult = ReturnType<typeof useAppointmentLazyQuery>;
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
export type AppointmentsQueryHookResult = ReturnType<typeof useAppointmentsQuery>;
export type AppointmentsLazyQueryHookResult = ReturnType<typeof useAppointmentsLazyQuery>;
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
export type ChannelsQueryHookResult = ReturnType<typeof useChannelsQuery>;
export type ChannelsLazyQueryHookResult = ReturnType<typeof useChannelsLazyQuery>;
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
export type ClientsQueryHookResult = ReturnType<typeof useClientsQuery>;
export type ClientsLazyQueryHookResult = ReturnType<typeof useClientsLazyQuery>;
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
export type MastersQueryHookResult = ReturnType<typeof useMastersQuery>;
export type MastersLazyQueryHookResult = ReturnType<typeof useMastersLazyQuery>;
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
export function useProcedureByMasterQuery(baseOptions: Apollo.QueryHookOptions<ProcedureByMasterQuery, ProcedureByMasterQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProcedureByMasterQuery, ProcedureByMasterQueryVariables>(ProcedureByMasterDocument, options);
      }
export function useProcedureByMasterLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProcedureByMasterQuery, ProcedureByMasterQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProcedureByMasterQuery, ProcedureByMasterQueryVariables>(ProcedureByMasterDocument, options);
        }
export type ProcedureByMasterQueryHookResult = ReturnType<typeof useProcedureByMasterQuery>;
export type ProcedureByMasterLazyQueryHookResult = ReturnType<typeof useProcedureByMasterLazyQuery>;
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
export type ProceduresQueryHookResult = ReturnType<typeof useProceduresQuery>;
export type ProceduresLazyQueryHookResult = ReturnType<typeof useProceduresLazyQuery>;
export type ProceduresQueryResult = Apollo.QueryResult<ProceduresQuery, ProceduresQueryVariables>;