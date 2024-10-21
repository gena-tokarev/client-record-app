import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProviderClient } from "@/components/providers/localization";
import { AuthProviderClient } from "@/components/providers/Auth/auth-provider.client";

export const metadata: Metadata = {
  title: "Client Record",
  description: "Client Record app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-muted/40 font-sans antialiased")}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <LocalizationProviderClient>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AuthProviderClient>{children}</AuthProviderClient>
            </ThemeProvider>
          </LocalizationProviderClient>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
