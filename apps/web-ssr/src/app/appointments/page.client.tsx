"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { graphqlApiClient } from "@/services/graphql-api-service";
import { useQuery } from "@tanstack/react-query";

export const PageClient = () => {
  const { data } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => graphqlApiClient.Appointments(),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Master</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Complaints</TableHead>
          <TableHead>Results</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Procedures</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.master.name}</TableCell>
            <TableCell>
              <Badge variant="outline">{appointment.status.value}</Badge>
            </TableCell>
            <TableCell>{appointment.complaints}</TableCell>
            <TableCell>
              {appointment.results?.map((result) => (
                <Badge key={result.id} variant="outline">
                  {result.value}
                </Badge>
              ))}
            </TableCell>
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
  );
};
