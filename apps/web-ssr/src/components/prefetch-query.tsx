import getQueryClient from "@/clients/get-query-client";
import {
  FetchQueryOptions,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";

const PrefetchQuery: FC<
  PropsWithChildren<{
    fetchQueryOptions: FetchQueryOptions;
  }>
> = async ({ children, fetchQueryOptions }) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(fetchQueryOptions);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
};

export default PrefetchQuery;
