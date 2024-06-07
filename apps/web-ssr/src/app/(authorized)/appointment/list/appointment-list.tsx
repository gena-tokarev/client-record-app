"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AppointmentsDocument,
  AppointmentsQuery,
  useAppointmentsQuery,
  useOnAppointmentUpdatedSubscription,
  useOnAppointmentsUpdatedSubscription,
} from "@/graphql/generated/graphql";
import { useApolloClient } from "@apollo/client";
import { FC, useEffect, useState } from "react";
// import { graphqlApiClient } from "@/services/graphql-api-service";
// import { useQuery } from "@tanstack/react-query";

export const AppointmentList: FC<{ initialData: AppointmentsQuery }> = ({
  initialData,
}) => {
  // const { data } = useQuery({
  //   queryKey: ["appointments"],
  //   queryFn: () => graphqlApiClient.Appointments(),
  // });

  const [data, setData] = useState(initialData?.appointments);

  const graphqlClient = useApolloClient();

  // useEffect(() => {
  //   graphqlClient.cache.writeQuery({
  //     query: AppointmentsDocument,
  //     data,
  //   });
  // }, [graphqlClient, data]);

  // const { data } = useAppointmentsQuery();

  const {
    data: newAppointmentsData,
    error,
    loading,
  } = useOnAppointmentUpdatedSubscription();

  const newAppointment = newAppointmentsData?.onAppointmentUpdated;

  useEffect(() => {
    if (newAppointment) {
      setData((prevData) => {
        const isNew = !prevData.some(
          (appointment) => appointment.id === newAppointment.id,
        );
        if (isNew) {
          return [...prevData, newAppointment];
        }
        return prevData;
      });
    }
  }, [newAppointment]);

  return (
    <Card className="m-8">
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Master</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Complaints</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Procedures</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.master.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{appointment.status.value}</Badge>
                </TableCell>
                <TableCell>{appointment.complaints}</TableCell>
                <TableCell>{appointment.price}</TableCell>
                <TableCell>{appointment.client.fullName}</TableCell>
                <TableCell>
                  {appointment.procedures?.map((procedure) => (
                    <div key={procedure.id}>{procedure.name}</div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
