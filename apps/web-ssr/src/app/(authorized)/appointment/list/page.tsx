import { PreloadQuery } from "@/graphql/graphql-client.server";
import { AppointmentsDocument } from "@/graphql/generated/graphql";
import { Suspense } from "react";
import Loader from "@/components/loader";
import { Appointments } from "@/components/appointment/appointments";

const AppointmentsPage = async () => {
  return (
    <PreloadQuery
      query={AppointmentsDocument}
      variables={{
        appointmentsInput: {
          pageSize: 5,
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
