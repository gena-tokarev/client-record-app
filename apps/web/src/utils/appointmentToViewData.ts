import { Appointment } from "graphql/generated/graphql";
import dateTimeFormatter from "./dateTimeFormatter";

const appointmentToViewData = (appointment: Appointment) => {
    return {
        ...appointment,
        clientName: `${appointment.client.firstName} ${appointment.client.lastName}`,
        masterName: appointment.master.name,
        date: dateTimeFormatter.format(new Date(appointment.date)),
    };
};

export default appointmentToViewData;
