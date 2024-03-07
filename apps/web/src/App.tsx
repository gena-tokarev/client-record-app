import React from "react";
import Login from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import MainLayout from "./components/MainLayout";
import Appointments from "./pages/Appointments";
import AppointmentCreate from "./pages/AppointmentCreate";
import Appointment from "./pages/Appointment";
import AppointmentUpdate from "./pages/AppointmentUpdate";
import ClientCreate from "./pages/ClientCreate";

function App() {
    return (
        <MainLayout>
            <Routes>
                <Route index element={<Navigate to="/appointments" />} />
                <Route path="login" element={<Login />} />
                <Route
                    path="appointments"
                    element={
                        <RequireAuth>
                            <Appointments />
                        </RequireAuth>
                    }
                />
                <Route
                    path="appointment/:id"
                    element={
                        <RequireAuth>
                            <Appointment />
                        </RequireAuth>
                    }
                />
                <Route
                    path="appointment-create"
                    element={
                        <RequireAuth>
                            <AppointmentCreate />
                        </RequireAuth>
                    }
                />
                <Route
                    path="appointment-update/:id"
                    element={
                        <RequireAuth>
                            <AppointmentUpdate />
                        </RequireAuth>
                    }
                />
                <Route
                    path="client-create"
                    element={
                        <RequireAuth>
                            <ClientCreate />
                        </RequireAuth>
                    }
                />
            </Routes>
        </MainLayout>
    );
}

export default App;
