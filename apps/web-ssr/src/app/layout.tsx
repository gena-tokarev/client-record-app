import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProviderClient } from "@/components/providers/auth/auth-provider.client";
import { QueryProviderClient } from "@/components/providers/query-provider.client";
import { GraphqlProvider } from "@/components/providers/graphql-provider.client";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProviderClient } from "@/components/providers/localization";

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
      <body
        className={cn(
          "min-h-screen bg-muted/40 font-sans antialiased",
        )}
      >
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <LocalizationProviderClient>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <GraphqlProvider>
                <QueryProviderClient>
                  <AuthProviderClient>
                    <div className="min-h-screen flex flex-col">{children}</div>
                  </AuthProviderClient>
                </QueryProviderClient>
              </GraphqlProvider>
            </ThemeProvider>
          </LocalizationProviderClient>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
