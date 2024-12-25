import { PreloadQuery } from "@/graphql/graphql-client.server";
import { AppointmentsDocument } from "@/graphql/generated/graphql";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { Appointments } from "@/components/appointment/appointments";
import { INITIAL_PAGINATION_MODEL } from "@/components/appointment/constants";

const AppointmentsPage = async () => {
  return (
    <PreloadQuery
      query={AppointmentsDocument}
      variables={{
        appointmentsInput: {
          paginationModel: INITIAL_PAGINATION_MODEL,
        },
      }}
      // context={{
      //   fetchOptions: {
      //     next: { revalidate: 2 },
      //   },
      // }}
    >
      <Suspense fallback={<Loader />}>
        <Appointments />
      </Suspense>
    </PreloadQuery>
  );
};

export default AppointmentsPage;
