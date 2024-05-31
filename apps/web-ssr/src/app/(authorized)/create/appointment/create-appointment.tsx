"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useClientsQuery, useMastersQuery } from "@/graphql/generated/graphql";
import { CreateAppointmentDto } from "@client-record/shared/src/dto/appointment/create-appointment.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useForm } from "react-hook-form";

export const CreateAppointment = () => {
  const { data, loading, error } = useClientsQuery();
  const { data1, loading1, error1 } = useMastersQuery();

  const form = useForm<CreateAppointmentDto>({
    resolver: classValidatorResolver(CreateAppointmentDto),
    defaultValues: {
      date: 0,
      complaints: "",
      price: 0,
      client: "",
      master: "",
      procedures: [],
      status: "",
    },
  });

  const handleSubmit = () => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => {
            return (
              <>
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder="Date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            );
          }}
        />
        <FormField
          control={form.control}
          name="complaints"
          render={({ field }) => {
            return (
              <>
                <FormItem>
                  <FormLabel>Complaints</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Complaints" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            );
          }}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => {
            return (
              <>
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            );
          }}
        />
        <FormField
          control={form.control}
          name="client"
          render={({ field }) => {
            return (
              <>
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Clients</SelectLabel>
                          {data?.clients.map((client) => (
                            <SelectItem key={client.id} value={client.id}>
                              {client.fullName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </>
            );
          }}
        />
      </form>
    </Form>
  );
};
