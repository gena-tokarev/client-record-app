import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./providers/Auth";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import SidebarProvider from "./providers/Sidebar";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterLuxon";

const client = new ApolloClient({
    uri: process.env.REACT_APP_APOLLO_CLIENT_URI,
    cache: new InMemoryCache(),
});

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <AuthProvider>
                        <ThemeProvider theme={darkTheme}>
                            <CssBaseline enableColorScheme />
                            <SidebarProvider>
                                <App />
                            </SidebarProvider>
                        </ThemeProvider>
                    </AuthProvider>
                </LocalizationProvider>
            </BrowserRouter>
        </ApolloProvider>
    </StrictMode>
);
