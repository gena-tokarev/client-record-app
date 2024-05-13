import { GraphQLClient, RequestOptions } from 'graphql-request';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
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
  results?: Maybe<Array<AppointmentResult>>;
  status: AppointmentStatus;
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
  results: Array<Scalars['ID']['input']>;
  status: Array<Scalars['ID']['input']>;
};

export type AppointmentResult = {
  __typename?: 'AppointmentResult';
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type AppointmentStatus = {
  __typename?: 'AppointmentStatus';
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
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

export const CoreAppointmentFieldsFragmentDoc = gql`
    fragment CoreAppointmentFields on Appointment {
  id
  complaints
  date
  price
  comments
}
    `;
export const CoreAppointmentResultFieldsFragmentDoc = gql`
    fragment CoreAppointmentResultFields on AppointmentResult {
  id
  value
}
    `;
export const CoreAppointmentStatusFieldsFragmentDoc = gql`
    fragment CoreAppointmentStatusFields on AppointmentStatus {
  id
  value
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
  fullName
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
    status {
      ...CoreAppointmentStatusFields
    }
    results {
      ...CoreAppointmentResultFields
    }
  }
}
    ${CoreAppointmentFieldsFragmentDoc}
${CoreClientFieldsFragmentDoc}
${CoreMasterFieldsFragmentDoc}
${CoreProcedureFieldsFragmentDoc}
${CoreAppointmentStatusFieldsFragmentDoc}
${CoreAppointmentResultFieldsFragmentDoc}`;
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
    status {
      ...CoreAppointmentStatusFields
    }
    results {
      ...CoreAppointmentResultFields
    }
  }
}
    ${CoreAppointmentFieldsFragmentDoc}
${CoreClientFieldsFragmentDoc}
${CoreMasterFieldsFragmentDoc}
${CoreProcedureFieldsFragmentDoc}
${CoreAppointmentStatusFieldsFragmentDoc}
${CoreAppointmentResultFieldsFragmentDoc}`;
export const ChannelsDocument = gql`
    query Channels {
  channels {
    ...CoreChannelFields
  }
}
    ${CoreChannelFieldsFragmentDoc}`;
export const ClientsDocument = gql`
    query Clients {
  clients {
    ...CoreClientFields
  }
}
    ${CoreClientFieldsFragmentDoc}`;
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
export const ProcedureByMasterDocument = gql`
    query ProcedureByMaster($masterId: ID!) {
  procedureByMaster(masterId: $masterId) {
    ...CoreProcedureFields
  }
}
    ${CoreProcedureFieldsFragmentDoc}`;
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

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    CreateAppointment(variables: CreateAppointmentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateAppointmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateAppointmentMutation>(CreateAppointmentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateAppointment', 'mutation', variables);
    },
    CreateClient(variables: CreateClientMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<CreateClientMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<CreateClientMutation>(CreateClientDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'CreateClient', 'mutation', variables);
    },
    UpdateAppointment(variables: UpdateAppointmentMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<UpdateAppointmentMutation> {
      return withWrapper((wrappedRequestHeaders) => client.request<UpdateAppointmentMutation>(UpdateAppointmentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'UpdateAppointment', 'mutation', variables);
    },
    Appointment(variables: AppointmentQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AppointmentQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AppointmentQuery>(AppointmentDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Appointment', 'query', variables);
    },
    Appointments(variables?: AppointmentsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<AppointmentsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<AppointmentsQuery>(AppointmentsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Appointments', 'query', variables);
    },
    Channels(variables?: ChannelsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ChannelsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ChannelsQuery>(ChannelsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Channels', 'query', variables);
    },
    Clients(variables?: ClientsQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ClientsQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ClientsQuery>(ClientsDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Clients', 'query', variables);
    },
    Masters(variables?: MastersQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<MastersQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<MastersQuery>(MastersDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Masters', 'query', variables);
    },
    ProcedureByMaster(variables: ProcedureByMasterQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProcedureByMasterQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProcedureByMasterQuery>(ProcedureByMasterDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'ProcedureByMaster', 'query', variables);
    },
    Procedures(variables?: ProceduresQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<ProceduresQuery> {
      return withWrapper((wrappedRequestHeaders) => client.request<ProceduresQuery>(ProceduresDocument, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'Procedures', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
export type CoreAppointmentFieldsFragment = { __typename?: 'Appointment', id: string, complaints: string, date: number, price: number, comments?: string | null };

export type CoreAppointmentResultFieldsFragment = { __typename?: 'AppointmentResult', id: string, value: string };

export type CoreAppointmentStatusFieldsFragment = { __typename?: 'AppointmentStatus', id: string, value: string };

export type CoreChannelFieldsFragment = { __typename?: 'Channel', id: string, name: string };

export type CoreClientFieldsFragment = { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, fullName: string, phones: Array<{ __typename?: 'Phone', id: string, value: string }>, channel: { __typename?: 'Channel', id: string, name: string } };

export type CoreMasterFieldsFragment = { __typename?: 'Master', id: string, name: string };

export type CorePhoneFieldsFragment = { __typename?: 'Phone', id: string, value: string };

export type CoreProcedureFieldsFragment = { __typename?: 'Procedure', id: string, name: string };

export type CreateAppointmentMutationVariables = Exact<{
  inputAppointment: AppointmentInput;
}>;


export type CreateAppointmentMutation = { __typename?: 'Mutation', createAppointment: { __typename?: 'Appointment', id: string, complaints: string, date: number, price: number, comments?: string | null, client: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, fullName: string, channel: { __typename?: 'Channel', id: string, name: string }, phones: Array<{ __typename?: 'Phone', id: string, value: string }> }, master: { __typename?: 'Master', id: string, name: string }, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null } };

export type CreateClientMutationVariables = Exact<{
  inputClient: ClientInput;
}>;


export type CreateClientMutation = { __typename?: 'Mutation', createClient: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, fullName: string, channel: { __typename?: 'Channel', id: string, name: string }, phones: Array<{ __typename?: 'Phone', id: string, value: string }> } };

export type UpdateAppointmentMutationVariables = Exact<{
  inputAppointment: AppointmentInput;
}>;


export type UpdateAppointmentMutation = { __typename?: 'Mutation', updateAppointment: { __typename?: 'Appointment', id: string, complaints: string, date: number, price: number, comments?: string | null, client: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, fullName: string, channel: { __typename?: 'Channel', id: string, name: string }, phones: Array<{ __typename?: 'Phone', id: string, value: string }> }, master: { __typename?: 'Master', id: string, name: string }, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null } };

export type AppointmentQueryVariables = Exact<{
  appointmentId: Scalars['ID']['input'];
}>;


export type AppointmentQuery = { __typename?: 'Query', appointment: { __typename?: 'Appointment', id: string, complaints: string, date: number, price: number, comments?: string | null, client: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, fullName: string, phones: Array<{ __typename?: 'Phone', id: string, value: string }>, channel: { __typename?: 'Channel', id: string, name: string } }, master: { __typename?: 'Master', id: string, name: string }, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null, status: { __typename?: 'AppointmentStatus', id: string, value: string }, results?: Array<{ __typename?: 'AppointmentResult', id: string, value: string }> | null } };

export type AppointmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type AppointmentsQuery = { __typename?: 'Query', appointments: Array<{ __typename?: 'Appointment', id: string, complaints: string, date: number, price: number, comments?: string | null, client: { __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, fullName: string, phones: Array<{ __typename?: 'Phone', id: string, value: string }>, channel: { __typename?: 'Channel', id: string, name: string } }, master: { __typename?: 'Master', id: string, name: string }, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null, status: { __typename?: 'AppointmentStatus', id: string, value: string }, results?: Array<{ __typename?: 'AppointmentResult', id: string, value: string }> | null }> };

export type ChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type ChannelsQuery = { __typename?: 'Query', channels: Array<{ __typename?: 'Channel', id: string, name: string }> };

export type ClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientsQuery = { __typename?: 'Query', clients: Array<{ __typename?: 'Client', id: string, firstName: string, lastName: string, middleName: string, instagramName: string, fullName: string, phones: Array<{ __typename?: 'Phone', id: string, value: string }>, channel: { __typename?: 'Channel', id: string, name: string } }> };

export type MastersQueryVariables = Exact<{ [key: string]: never; }>;


export type MastersQuery = { __typename?: 'Query', masters: Array<{ __typename?: 'Master', id: string, name: string, procedures?: Array<{ __typename?: 'Procedure', id: string, name: string }> | null }> };

export type ProcedureByMasterQueryVariables = Exact<{
  masterId: Scalars['ID']['input'];
}>;


export type ProcedureByMasterQuery = { __typename?: 'Query', procedureByMaster: Array<{ __typename?: 'Procedure', id: string, name: string }> };

export type ProceduresQueryVariables = Exact<{ [key: string]: never; }>;


export type ProceduresQuery = { __typename?: 'Query', procedures: Array<{ __typename?: 'Procedure', id: string, name: string, masters?: Array<{ __typename?: 'Master', id: string, name: string }> | null }> };
