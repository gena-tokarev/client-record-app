import { PreloadQuery } from "@/graphql/graphql-client.server";
import { AppointmentsDocument } from "@/graphql/generated/graphql";
import { AppointmentList } from "@/components/appointment/appointment-list";
import { Suspense } from "react";
import Loader from "@/components/loader";

const AppointmentsPage = async () => {
  return (
    <PreloadQuery
      query={AppointmentsDocument}
      // context={{
      //   fetchOptions: {
      //     next: { revalidate: 2 },
      //   },
      // }}
    >
      <Suspense fallback={<Loader />}>
        <AppointmentList />
      </Suspense>
    </PreloadQuery>
  );
};

export default AppointmentsPage;
